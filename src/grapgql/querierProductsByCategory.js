import { gql } from "@apollo/client";

const productsByCategory = (category) => {
  return {
  query: gql`
      query {
        category(input: {title: "${category}"}) {
          products {
            name
            id
            attributes {
              name
            }
            inStock
            brand
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            gallery
          }
        }
      }
    `,
    }
}

export {productsByCategory};
