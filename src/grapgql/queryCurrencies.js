import {
  gql,
} from "@apollo/client";

const currenciesQuery = {
  query: gql`
    query {
      currencies {
        label
        symbol
      }
    }
  `,
}

export default currenciesQuery