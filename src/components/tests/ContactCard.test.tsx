import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ContactList from '../ContactList';
import { GET_CONTACT_LIST } from '../../graphql/queries';

const mocks = [
  {
    request: {
      query: GET_CONTACT_LIST,
    },
    result: {
      data: {
        contact: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            phones: [
              {
                number: '1234567890',
              },
            ],
            contactId: 1,
          },
        ],
      },
    },
  },
];

describe('ContactList component', () => {
  it('renders loading state', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMock = {
      request: {
        query: GET_CONTACT_LIST,
      },
      error: new Error('An error occurred'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });

  it('renders contact list', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    });
  });

  it('handles search input', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );
  
    const searchInput = screen.getByPlaceholderText('Search contacts...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'John' } });
  
    await waitFor(() => {
      expect(searchInput.value).toBe('John');
    });
  });
});
