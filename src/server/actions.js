import * as taks from "./const";
import { graphql } from "react-apollo";

export const withTaks = graphql(taks.TAK_LIST_QUERY, {
  props: ({ data: { taksList } }) => {
    let taks = [];
    if (taksList) {
      taks = taksList.items;
    }
    return {
      taks,
    };
  },
});

export const withCreateTak = graphql(taks.CREATE_TAK_MUTATION, {
  props: ({ mutate }) => ({
    createTak: ({ text }) => {
      mutate({
        variables: { data: { text, completed: false } },
        refetchQueries: [{ query: taks.TAK_LIST_QUERY }],
      });
    },
  }),
});

export const withToggleTak = graphql(taks.TOGGLE_TAK_MUTATION, {
  props: ({ mutate }) => ({
    takUpdate: ({ id, text, completed }) => {
      mutate({
        variables: { data: { id, text, completed } },
        refetchQueries: [{ query: taks.TAK_LIST_QUERY }],
      });
    },
  }),
});

export const withToggleAllTaks = graphql(taks.TOGGLE_TAK_MUTATION, {
  props: ({ mutate, ownProps: { taks } }) => ({
    toggleAllTaks: ({ completed }) => {
      taks.forEach((tak) => {
        mutate({
          variables: { id: tak.id, completed },
          refetchQueries: [{ query: taks.TAK_LIST_QUERY }],
        });
      });
    },
  }),
});

export const withRemoveTak = graphql(taks.DELETE_TAK_MUTATION, {
  props: ({ mutate }) => ({
    removeTak: (id) => {
      mutate({
        variables: { id },
        refetchQueries: [{ query: taks.TAK_LIST_QUERY }],
      });
    },
  }),
});
