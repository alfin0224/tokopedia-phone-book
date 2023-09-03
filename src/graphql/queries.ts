import { gql } from '@apollo/client';

export const GET_CONTACT_LIST = gql`
  query GetContactList {
    contact {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`

export const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      favorite
    }
  }
`;

export const SEARCH_CONTACTS = gql`
  query SearchContacts($search: String!) {
    contact(where: { _or: [{ first_name: { _ilike: $search } }, { last_name: { _ilike: $search } }] }) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
