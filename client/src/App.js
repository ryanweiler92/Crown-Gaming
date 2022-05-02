import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import SingleGame from './pages/SingleGame'
import Navigation from './components/Navigation'
import igdb from 'igdb-api-node';

const client2 = igdb('7zjdun2r8e3xekbh7czqxnto5daih5', '2xulatfe4e4t4wgphbuov3a7hheb86');

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={SingleGame} />
      </Switch>
    </Router>
  </ApolloProvider>
  );
}

export default App;
