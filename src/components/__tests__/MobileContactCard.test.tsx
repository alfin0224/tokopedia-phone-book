import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MobileContactCard from "../MobileContactCard";

const mockContact = {
  id: 1,
  contactId: 1,
  first_name: "John",
  last_name: "Doe",
  phones: [{ number: "1234567890" }],
};

describe("MobileContactCard", () => {
  it("renders contact details and shows expanded content when clicked", () => {
    const removeFromFavoritesMock = jest.fn();
    const toggleShowMoreMock = jest.fn();

    const { getByText, getByTestId } = render(
      <MobileContactCard
        contact={mockContact}
        removeFromFavorites={removeFromFavoritesMock}
        showMoreId={1}
        toggleShowMore={toggleShowMoreMock}
      />
    );

    expect(
      getByText(`${mockContact.first_name} ${mockContact.last_name}`)
    ).toBeInTheDocument();
    expect(getByText("Unfavorited")).toBeInTheDocument();

    const expandButton = getByTestId("expand-button");
    fireEvent.click(expandButton);

    expect(getByText(mockContact.phones[0].number)).toBeInTheDocument();
    expect(getByText("Unfavorited")).toBeInTheDocument();

    expect(toggleShowMoreMock).toHaveBeenCalledWith(1);

    fireEvent.click(expandButton);
  });
});
