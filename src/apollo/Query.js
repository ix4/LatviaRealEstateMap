import gql from 'graphql-tag';

export const GET_LOCAL_STATE = gql`
  {
    start_date @client
    end_date @client
    category @client
  }
`;

export const GET_REGION_TABLE_DATA = gql`
  query GetRegionTableData(
    $category: Category
    $start_date: Date!
    $end_date: Date!
  ) {
    getRegions(
      category: $category
      start_date: $start_date
      end_date: $end_date
    ) {
      name
      price {
        count
      }
    }
  }
`;
