import 'core-js';

import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import bugsnagReact from '@bugsnag/plugin-react';

import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import mockMapGeojson from './geojson.json';
import { resolvers } from './apollo/Resolvers';

const bugsnagClient = window.bugsnagClient;

const client = new ApolloClient({
  uri: 'https://api.brokalys.com',
  connectToDevTools: true,
  clientState: {
    resolvers,
    defaults: {
      category: 'apartment'.toUpperCase(),
      start_date: '2018-01-01',
      end_date: '2018-02-01',

      getChartData: [
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 0, 1)).toISOString().substr(0, 10),
          pricePerSqm: 8290,
          count: 829,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 1, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6895,
          count: 689,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 2, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6292,
          count: 629,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 3, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6120,
          count: 612,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 4, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6100,
          count: 610,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 5, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6090,
          count: 609,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 6, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6400,
          count: 640,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 7, 1)).toISOString().substr(0, 10),
          pricePerSqm: 6494,
          count: 649,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 8, 1)).toISOString().substr(0, 10),
          pricePerSqm: 7470,
          count: 747,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 9, 1)).toISOString().substr(0, 10),
          pricePerSqm: 7100,
          count: 710,
        },
        {
          __typename: 'ChartRow',
          date: new Date(Date.UTC(2018, 10, 1)).toISOString().substr(0, 10),
          pricePerSqm: 7900,
          count: 790,
        },
      ],

      getMapData: {
        __typename: 'Object',
        geojson: JSON.stringify(mockMapGeojson),
      },
    },
  },
});

if (bugsnagClient) {
  bugsnagClient.use(bugsnagReact, React);
  const ErrorBoundary = bugsnagClient.getPlugin('react');

  ReactDOM.render(
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ApolloProvider>,
    document.getElementById('root'),
  );
} else {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
  );
}

registerServiceWorker();
