import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACT_LIST } from '../graphql/queries';
import { DELETE_CONTACT } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaStar, FaPlusCircle, FaPhone } from 'react-icons/fa';
import { 
  ContactContainer,
  SearchInputContainer,
  ContactListWrapper,
  ContactListContainer,
  PaginationContainer,
  ActionButton,
  ButtonCardContainer,
  ContactCard
 } from './ContactElements'


interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phones: {
      number: string;
    }[];
    contactId: number;
  }

function ContactList() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);
  const pageSize = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedContacts = [...favoriteContacts, ...data.contact.filter((contact: Contact) => !favoriteContacts.includes(contact))];

  const filteredContacts = sortedContacts.filter((contact) =>
    contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactsToShow = filteredContacts.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(data.contact.length / pageSize);

  const addToFavorites = (contact: Contact) => {
    if (!favoriteContacts.includes(contact)) {
      setFavoriteContacts([...favoriteContacts, contact]);
    }
  };

  const removeFromFavorites = (contact: Contact) => {
    setFavoriteContacts(favoriteContacts.filter((c) => c !== contact));
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await deleteContact({
        variables: { id: contactId },
        refetchQueries: [{ query: GET_CONTACT_LIST }],
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <ContactContainer>
      <SearchInputContainer>
      <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        </SearchInputContainer>
        <ActionButton>
          <Link to="/add"><button><FaPlusCircle/> Add Contact</button></Link>
        </ActionButton>
      <ContactListWrapper>
        {contactsToShow.map((contact: Contact) => (
            <ContactListContainer className='contact-card' key={contact.id}>
              <ContactCard>
                <b>{contact.first_name} {contact.last_name}</b>
              </ContactCard>

              <ContactCard>
                {contact.phones.map(phone => (
                  <div style={{textAlign: 'left', paddingLeft: '1.2rem'}}>
                  <FaPhone/>&nbsp; &nbsp;<span key={phone.number} >{phone.number}</span>
                  </div>
                ))}
              </ContactCard>
                <ButtonCardContainer>
                  {favoriteContacts.includes(contact) ? (
                    <button
                      className='btn-favorite'
                      onClick={() => removeFromFavorites(contact)}
                    > 
                      Remove From &nbsp; <FaStar/>
                    </button>
                  ) : (
                    <button
                      className='btn-favorite'
                      onClick={() => addToFavorites(contact)}
                    > 
                      Add To &nbsp; <FaStar/>
                    </button>
                  )}
                  <Link to={`/edit/${contact.id}`}><button className='btn-edit'><FaEdit/></button></Link>
                  <button className={'btn-delete'} onClick={() => handleDeleteContact(contact.id)}><FaTrash/></button>
                </ButtonCardContainer>
            </ContactListContainer>
          ))}
      </ContactListWrapper>

      <PaginationContainer>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </PaginationContainer>
    </ContactContainer>
  );
}

export default ContactList;
