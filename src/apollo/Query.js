import gql from 'graphql-tag';

export const GET_LOCAL_STATE = gql`
  query GetGlobalLocalState {
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

export const GET_TABLE_DATA = gql`
  query GetTableData($category: Category!) {
    getTableData(category: $category) {
      name
      price_per_sqm {
        sell
        rent
      }
      price_per_sqm_change {
        sell
        rent
      }
      btl_ratio
      btl_ratio_change
    }
  }
`;

export const GET_CHART_DATA = gql`
  query GetChartData($category: Category!) {
    getChartData(category: $category) {
      date
      count
      pricePerSqm: price_per_sqm
    }
  }
`;

export const GET_MAP_DATA = gql`
  query GetMapData($category: Category!, $start_date: Date!, $end_date: Date!) {
    getMapData(
      category: $category
      start_date: $start_date
      end_date: $end_date
    ) {
      type
      features {
        type
        properties {
          name
          color
        }
        geometry {
          type
          coordinates
        }
      }
    }
  }
`;
