import 'core-js';

import ApolloClient from "apollo-boost";
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import bugsnagReact from '@bugsnag/plugin-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const bugsnagClient = window.bugsnagClient;

const client = new ApolloClient({
  uri: "https://api.brokalys.com"
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
