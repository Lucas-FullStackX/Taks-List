import gql from "graphql-tag";

export const TAK_LIST_QUERY = gql`
  query taksList {
    taksList {
      items {
        id
        text
        completed
      }
    }
  }
`;

export const CREATE_TAK_MUTATION = gql`
  mutation TakCreate($data: TakCreateInput!) {
    takCreate(data: $data) {
      text
      completed
    }
  }
`;

export const TOGGLE_TAK_MUTATION = gql`
  mutation TakUpdate($data: TakUpdateInput!) {
    takUpdate(data: $data) {
      id
      text
      completed
    }
  }
`;
export const DELETE_TAK_MUTATION = gql`
  mutation TakDelete($id: ID!) {
    takDelete(filter: { id: $id }) {
      success
    }
  }
`;
