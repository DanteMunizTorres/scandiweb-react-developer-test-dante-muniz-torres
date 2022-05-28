import { gql } from "@apollo/client";

const productById = (id) => {
  return {
    query: gql`
      query {
        product(id:"${id}") {
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
    `,
  }
}

export {productById};