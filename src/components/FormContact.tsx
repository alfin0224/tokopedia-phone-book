import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ADD_CONTACT } from "../graphql/mutations";
import { FormContainer, Form } from "./ContactElements";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { GET_CONTACT_LIST } from "../graphql/queries";
import { Contact } from "../pages/ContactList";
import Swal from "sweetalert2";

const FormContactPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  const [addContact] = useMutation(ADD_CONTACT);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
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

    if (!/^[a-zA-Z\s]*$/.test(firstName) || !/^[a-zA-Z\s]*$/.test(lastName)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "First name and last name must only contain letters and spaces.",
      });
      console.error(
        "Error: First name and last name must only contain letters and spaces."
      );
      return;
    }

    if (loading) return;
    if (error) {
      console.error("Error fetching existing contacts:", error);
      return;
    }

    const existingContacts = data.contact;

    const isDuplicate = existingContacts.some(
      (contact: Contact) =>
        contact.first_name === firstName && contact.last_name === lastName
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Contact",
        text: "Contact with the same first name and last name already exists.",
      });
      console.error(
        "Error: Contact with the same first name and last name already exists."
      );
      return;
    }

    try {
      const { data } = await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phoneNumbers.map((number) => ({ number })),
        },
      });

      if (data.insert_contact.returning[0].id) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Contact data saved successfully!",
        }).then(() => {
          window.location.href = "/";
        });
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      Swal.fire({
        icon: "error",
        title: "Error Adding Contact",
        text: "An error occurred while adding the contact. Please try again.",
      });
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
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Write the last name in here..."
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                style={{ width: "210px" }}
                required
              />
              {index > 0 && (
                <button
                  style={{ backgroundColor: "#e02424" }}
                  type="button"
                  onClick={() => handleDeletePhoneNumber(index)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          style={{ backgroundColor: "#0abac7" }}
          onClick={handleAddPhoneNumber}
        >
          <FaPlusCircle /> New Input Number
        </button>
        <button type="submit">Save Contact</button>
        <Link to="/">
          <button style={{ backgroundColor: "gray" }}>Back</button>
        </Link>
      </Form>
    </FormContainer>
  );
};

export default FormContactPage;
