import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ContactList from "../../pages/ContactList";
import { GET_CONTACT_LIST } from "../../graphql/queries";

const mockContacts = {
  id: 1,
  contactId: 1,
  first_name: "John",
  last_name: "Doe",
  phones: [{ number: "1234567890" }],
};
const mocks = [
  {
    request: {
      query: GET_CONTACT_LIST,
    },
    result: {
      data: {
        contact: mockContacts,
      },
    },
  },
];

describe("ContactList", () => {
  it("renders loading state", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const errorMessage = "An error occurred";
    const errorMocks = [
      {
        request: {
          query: GET_CONTACT_LIST,
        },
        error: new Error(errorMessage),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );

    const errorElement = await screen.findByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders contact list", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );
  });
});
