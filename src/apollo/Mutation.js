import gql from 'graphql-tag';

export const SET_SELECTED_DATES = gql`
  mutation SetSelectedDates($start_date: Date!, $end_date: Date!) {
    setSelectedDates(start_date: $start_date, end_date: $end_date) @client
  }
`;

export const SET_SELECTED_CATEGORY = gql`
  mutation SetSelectedCategory($category: Category!) {
    setSelectedCategory(category: $category) @client
  }
`;

export const SET_HOVERED_REGION = gql`
  mutation SetHoveredRegion($region: String!) {
    setHoveredRegion(region: $region) @client
  }
`;
