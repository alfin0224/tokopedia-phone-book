import React from 'react';
import { FaStar, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  ContactListContainer,
  ButtonCardContainer,
  ContactCard,
} from './ContactElements';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
  contactId: number;
}

  interface DesktopContactCardProps {
    contact: Contact; // Make sure to import the Contact interface
    favoriteContacts: Contact[];
    addToFavorites: (contact: Contact) => void;
    removeFromFavorites: (contact: Contact) => void;
    handleDeleteContact: (contactId: number) => void;
  }
  
  const DesktopContactCard: React.FC<DesktopContactCardProps> = ({
    contact,
    favoriteContacts,
    addToFavorites,
    removeFromFavorites,
    handleDeleteContact
  }) => {
    const isFavorite = favoriteContacts.includes(contact);
  
    return (
      <ContactListContainer className='contact-card' key={contact.id}>
        <FaStar style={{color: 'gold'}}/>
        <ContactCard>
          <b>{contact.first_name} {contact.last_name}</b>
        </ContactCard>
  
        <ContactCard>
          {contact.phones.map(phone => (
            <div style={{textAlign: 'left', paddingLeft: '1.2rem'}} key={phone.number}>
              <FaPhone/>&nbsp; &nbsp;<span>{phone.number}</span>
            </div>
          ))}
        </ContactCard>
        <ButtonCardContainer>
          {isFavorite ? (
            <button
              className='btn-favorite'
              onClick={() => removeFromFavorites(contact)}
            > 
              Unfavorite
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
    );
  };
  

export default DesktopContactCard;
