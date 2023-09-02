import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACT_LIST } from '../graphql/queries';
import { DELETE_CONTACT } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaStar, FaPlusCircle, FaPhone, FaBars, FaExpand } from 'react-icons/fa';
import { 
  DesktopContactContainer,
  MobileContactContainer,
  ContactListWrapper,
  ContactListContainer,
  PaginationContainer,
  ActionButton,
  ButtonCardContainer,
  ContactCard,
  PhoneNumberCard,
  AddContactMobile
 } from '../components/ContactElements';
 import Search from '../components/Search';
import MobileContactCard from '../components/MobileContactCard'; 
import DesktopContactCard from '../components/DesktopContactCard';
import Swal from 'sweetalert2';


export interface Contact {
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
  const [showMoreId, setShowMoreId] = useState<number | null>(null);

  const toggleShowMore = (contactId: number) => {
    setShowMoreId(showMoreId === contactId ? null : contactId);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const allContacts = [...data.contact].sort((a: Contact, b: Contact) => a.first_name.localeCompare(b.first_name));


  const allContactsExceptFavorites = allContacts.filter(
    (contact: Contact) => !favoriteContacts.includes(contact)
  );

  const favoriteContactsToShow = favoriteContacts.filter((contact: Contact) =>
  contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  contact.last_name.toLowerCase().includes(searchQuery.toLowerCase())
);

const allContactsToShow = allContactsExceptFavorites.filter((contact: Contact) =>
  contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  contact.last_name.toLowerCase().includes(searchQuery.toLowerCase())
).slice(startIndex, endIndex);

const allContactsToShowMobile = allContactsExceptFavorites.filter((contact: Contact) =>
  contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  contact.last_name.toLowerCase().includes(searchQuery.toLowerCase())
)

  const uniqueFirstLetters = [...new Set(allContactsToShowMobile.map((contact: Contact) => contact.first_name[0].toUpperCase()))];
  const totalPagesForAllContacts = Math.ceil( allContactsExceptFavorites.length / pageSize );

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
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });
  
      if (result.isConfirmed) {
        await deleteContact({
          variables: { id: contactId },
          refetchQueries: [{ query: GET_CONTACT_LIST }],
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Contact data deleted successfully!',
        });
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error Deleting Contact',
        text: 'An error occurred while deleting the contact. Please try again.',
      });
    }
  };
  

  return (
<div>
  
    <MobileContactContainer>
      <AddContactMobile>
        <div></div>
        <div style={{alignItems: 'right', justifyContent: 'right', textAlign: 'right', marginRight: '-2rem', marginBottom: '-1.5rem'}}>
          <Link to="/add"><button style={{backgroundColor: 'transparent', border: '0px', fontSize: '3rem', color: '#329c37' }}><FaPlusCircle/></button></Link>
        </div>
      </AddContactMobile>
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
        <ContactListWrapper>
          {favoriteContactsToShow.map((contact: Contact) => (
            <MobileContactCard
              contact={contact}
              showMoreId={contact.id}
              toggleShowMore={toggleShowMore}
              removeFromFavorites={removeFromFavorites}
              key={contact.id}
            />
          ))}
        </ContactListWrapper>
      <ContactListWrapper>
      {uniqueFirstLetters.map((letter: any) => (
          <div key={letter} style={{color: 'gray', marginBottom: '-20px', fontSize: '0.7rem'}}>
            <h2>{letter}</h2>
        {allContactsToShowMobile.map((contact: Contact) => (
          contact.first_name[0].toUpperCase() === letter && (
            <ContactListContainer className='contact-card' key={contact.id}>
              <ContactCard style={{ fontSize: '1.1rem', textAlign:'left'}}>
                <div style={{ paddingLeft: '20px'}}>
                  <b>{contact.first_name} {contact.last_name}</b>
                </div>
                <div>
                  <button
                    style={{backgroundColor: 'transparent', border: 'none', }}
                    onClick={() => toggleShowMore(contact.id)}>
                    {showMoreId === contact.id ? <FaExpand style={{color: "#329c37"}}/> : <FaBars/>}
                  </button>
                  
                </div>
              </ContactCard>

              {showMoreId === contact.id && (
                <div>
                <PhoneNumberCard>
                {contact.phones.map(phone => (
                  <div style={{textAlign: 'left', paddingLeft: '1.2rem', marginBottom: '0.6rem'}}>
                  <FaPhone/>&nbsp; &nbsp;<span key={phone.number} >{phone.number}</span>
                  </div>
                ))}
              </PhoneNumberCard>
                <ButtonCardContainer>
                    <button
                      className='btn-favorite'
                      onClick={() => addToFavorites(contact)}
                    > 
                      Add To &nbsp; <FaStar/>
                    </button>
                  <Link to={`/edit/${contact.id}`}><button className='btn-edit'><FaEdit/></button></Link>
                  <button className={'btn-delete'} onClick={() => handleDeleteContact(contact.id)}><FaTrash/></button>
                </ButtonCardContainer>
                </div>
              )}
            </ContactListContainer>
              )
              ))}
              </div>
          ))}
      </ContactListWrapper>
    </MobileContactContainer>
	
    <DesktopContactContainer>
    <Search searchQuery={searchQuery} handleSearch={handleSearch} />
        <ContactListWrapper>
          {favoriteContactsToShow.map((contact: Contact) => (
            <DesktopContactCard
              contact={contact}
              favoriteContacts={favoriteContacts}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              handleDeleteContact={handleDeleteContact}
              key={contact.id}
            />
          ))}
        </ContactListWrapper>
            <ActionButton>
                <Link to="/add"><button><FaPlusCircle/> Add Contact</button></Link>
            </ActionButton>
            <ContactListWrapper>
            
            {allContactsToShow.map((contact: Contact) => (
                <ContactListContainer className='contact-card' key={contact.id}>
                    <ContactCard>
                      <div style={{fontSize: '1.3rem', paddingBottom: '10px', marginBottom: '0.5rem'}}>
                    <b>{contact.first_name} {contact.last_name}</b>
                    </div>
                    {contact.phones.map(phone => (
                        <div style={{fontSize: '1rem', textAlign: 'left', paddingLeft: '1.2rem', marginBottom: '0.5rem'}}>
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
                            Unfavorite &nbsp; <FaStar/>
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
            {Array.from({ length: totalPagesForAllContacts }, (_, index) => (
                <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
                >
                {index + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPagesForAllContacts}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
            </PaginationContainer>
            </DesktopContactContainer>
	</div>
  );
}

export default ContactList;

