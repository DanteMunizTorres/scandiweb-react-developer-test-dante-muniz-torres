import { gql } from "@apollo/client";

const productsQuery = {
  query: gql`
    query {
      category {
        products {
          id
          name
          brand
          inStock
          category
          inStock
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          gallery
          description
          attributes {
            id
            name
            items {
              id
              value
              displayValue
            }
          }
        }
      }
    }
  `,
};

export default productsQuery;
