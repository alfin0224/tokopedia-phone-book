// src/pages/EditContactPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACT_DETAIL } from '../graphql/queries'; 
import {  EDIT_CONTACT, EDIT_PHONENUMBER } from '../graphql/mutations'; 
import { FormContainer, Form } from './ContactElements'


const EditContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id: parseInt(id as string) },
  });

  const [editContact] = useMutation(EDIT_CONTACT);
  const [editPhoneNumber] = useMutation(EDIT_PHONENUMBER);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.contact_by_pk) {
      const { first_name, last_name, phones } = data.contact_by_pk;
      setFirstName(first_name);
      setLastName(last_name);
      setPhoneNumbers(phones.map((phone: any) => phone.number));
    }
  }, [data]);


  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editContact({
        variables: {
          id: parseInt(id as string),
          _set: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      for (let i = 0; i < phoneNumbers.length; i++) {
        await editPhoneNumber({
          variables: {
            pk_columns: { contact_id: parseInt(id as string), number: data.contact_by_pk.phones[i].number },
            new_phone_number: phoneNumbers[i],
          },
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <FormContainer>
      <h2>Edit Contact</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Edit first name in here..."
            id="first-name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Edit last name in here..."
            id="last-name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          {phoneNumbers.map((number, index) => (
            <div>
            <input
              key={index}
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="+62 / 62 / 08 / 02" 
              pattern="^(^\+62|62|02|^08)(\d{3,4}-?){2}\d{3,4}$"
              value={number}
              onChange={e => handlePhoneNumberChange(index, e.target.value)}
              required
            />
            </div>
          ))}
        </div>
        <button type="submit">Save Changes</button>
        <Link to="/"><button style={{backgroundColor: 'gray'}}>Back</button></Link>
      </Form>
    </FormContainer>
  );
};

export default EditContactPage;
