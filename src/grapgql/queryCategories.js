import { gql } from "@apollo/client";

const categoriesQuery = {
  query: gql`
    query {
      categories {
        name
      }
    }
  `,
};

export default categoriesQuery;
