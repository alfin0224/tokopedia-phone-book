import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { ADD_CONTACT } from '../graphql/mutations';
import { FormContainer, Form } from './ContactElements'
import { FaPlusCircle, FaTrash } from 'react-icons/fa';


const FormContactPage: React.FC = () => {
  const navigate = useNavigate();

  const [addContact] = useMutation(ADD_CONTACT);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handleDeletePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phoneNumbers.map(number => ({ number })),
        },
      });

      if (data.insert_contact.returning[0].id) {
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <FormContainer>
      <h2>Add New Contact</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Write the first name in here..."
            id="first-name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Write the last name in here..."
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
              style={{width: '210px'}}
              required
            />
            {index > 0 && 
            <button
              style={{backgroundColor: '#e02424'}}
              type="button"
              onClick={() => handleDeletePhoneNumber(index)}
            >
              <FaTrash/>
            </button>
}
            </div>
          ))} 
        </div>
        <button type="button" style={{backgroundColor: '#0abac7'}} onClick={handleAddPhoneNumber}>
            <FaPlusCircle/> New Input Number
          </button>
        <button type="submit">Save Contact</button>
        <Link to="/"><button style={{backgroundColor: 'gray'}}>Back</button></Link>
      </Form>
    </FormContainer>
  );
};

export default FormContactPage;
