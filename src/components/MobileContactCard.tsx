import React from 'react';
import { FaStar, FaPhone, FaExpand, FaBars } from 'react-icons/fa';
import {
    ContactListContainer,
    ButtonCardContainer,
    ContactCard,
    PhoneNumberCard
  } from './ContactElements';
import { Contact } from 'pages/ContactList';

  interface MobileContactCardProps {
    contact: Contact; 
    removeFromFavorites: (contact: Contact) => void;
    showMoreId: number;
    toggleShowMore: (showMoreId: number) => void;
  }
  
  const MobileContactCard: React.FC<MobileContactCardProps> = ({ contact, removeFromFavorites, showMoreId, toggleShowMore }) => {
    return (
      <ContactListContainer className='contact-card' key={contact.id}>
        <FaStar style={{color: 'gold'}}/>
        <ContactCard style={{ fontSize: '1.3rem', textAlign:'left'}}>
                <div style={{ paddingLeft: '20px'}}>
                  <b>{contact.first_name} {contact.last_name}</b>
                </div>
                <div>
                  <button
                    style={{backgroundColor: 'transparent', border: 'none', }}
                    onClick={() => toggleShowMore(showMoreId)}>
                    {showMoreId === contact.id ? <FaExpand style={{color: "#329c37"}}/> : <FaBars/>}
                  </button>
                  
                </div>
        </ContactCard>
        {showMoreId === contact.id && (
          <div>
            <PhoneNumberCard>
              {contact.phones.map(phone => (
                <div style={{textAlign: 'left', paddingLeft: '1.2rem'}} key={phone.number}>
                  <FaPhone/>&nbsp; &nbsp;<span>{phone.number}</span>
                </div>
              ))}
            </PhoneNumberCard>
            <ButtonCardContainer>
              <button
                className='btn-favorite'
                onClick={() => removeFromFavorites(contact)}
              > 
                Unfavorited 
              </button>
            </ButtonCardContainer>
        </div>
        )}
      </ContactListContainer>
    );
  };

export default MobileContactCard;
