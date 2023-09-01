import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { globalStyles } from './styles/globalStyles';
import { Global } from '@emotion/react';
import App from './App';

const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql', 
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <App />
      </ApolloProvider>
    </React.StrictMode>
);