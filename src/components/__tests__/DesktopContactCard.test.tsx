import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DesktopContactCard from '../DesktopContactCard'; // Ubah path sesuai kebutuhan
import { MemoryRouter } from 'react-router-dom';

describe('DesktopContactCard', () => {
  const mockContact = {
    id: 1,
    contactId: 1,
    first_name: 'John',
    last_name: 'Doe',
    phones: [{ number: '1234567890' }],
  };

  const addToFavoritesMock = jest.fn();
  const removeFromFavoritesMock = jest.fn();
  const handleDeleteContactMock = jest.fn();

  it('renders contact details', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <DesktopContactCard
          contact={mockContact}
          favoriteContacts={[]}
          addToFavorites={addToFavoritesMock}
          removeFromFavorites={removeFromFavoritesMock}
          handleDeleteContact={handleDeleteContactMock}
        />
      </MemoryRouter>
    );

    expect(getByText(`${mockContact.first_name} ${mockContact.last_name}`)).toBeInTheDocument();
  });

  it('calls addToFavorites when Add To Favorites button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <DesktopContactCard
          contact={mockContact}
          favoriteContacts={[]}
          addToFavorites={addToFavoritesMock}
          removeFromFavorites={removeFromFavoritesMock}
          handleDeleteContact={handleDeleteContactMock}
        />
      </MemoryRouter>
    );

    const addToFavoritesButton = getByText('Add To');
    fireEvent.click(addToFavoritesButton);

    expect(addToFavoritesMock).toHaveBeenCalledWith(mockContact);
  });

  it('calls removeFromFavorites when Unfavorite button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <DesktopContactCard
          contact={mockContact}
          favoriteContacts={[mockContact]}
          addToFavorites={addToFavoritesMock}
          removeFromFavorites={removeFromFavoritesMock}
          handleDeleteContact={handleDeleteContactMock}
        />
      </MemoryRouter>
    );

    const unfavoriteButton = getByText('Unfavorite');
    fireEvent.click(unfavoriteButton);

    expect(removeFromFavoritesMock).toHaveBeenCalledWith(mockContact);
  });

  
it('renders contact details', () => {
  const { getByText } = render(
    <MemoryRouter>
      <DesktopContactCard
        contact={mockContact}
        favoriteContacts={[]}
        addToFavorites={addToFavoritesMock}
        removeFromFavorites={removeFromFavoritesMock}
        handleDeleteContact={handleDeleteContactMock}
      />
    </MemoryRouter>
  );

  expect(getByText(`${mockContact.first_name} ${mockContact.last_name}`)).toBeInTheDocument();
  expect(getByText(mockContact.phones[0].number)).toBeInTheDocument();
});
});
