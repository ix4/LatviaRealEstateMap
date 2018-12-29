import gql from 'graphql-tag';

export const SET_SELECTED_DATES = gql`
  mutation SetSelectedDates($start_date: Date!, $end_date: Date!) {
    setSelectedDates(start_date: $start_date, end_date: $end_date) @client
  }
`;
