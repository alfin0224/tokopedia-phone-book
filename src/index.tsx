import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { globalStyles } from './styles/globalStyles';
import { Global } from '@emotion/react';
import { client } from './graphql/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <App />
      </ApolloProvider>
    </React.StrictMode>
);