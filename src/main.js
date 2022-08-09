import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useMutation,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const POTATO_AUTH_MUTATION = gql`
  mutation PotatoAuth {
    potatoAuth {
      isPotato
    }
  }
`;

function App() {
  const [pubCredVerifiedState, setPubCredVerifiedState] = React.useState(false);
  const [pubCredState, setPubCredState] = React.useState('');
  const [passwordState, setPasswordState] = React.useState('');
  return (
    <ApolloProvider client={client}>
      <form autoComplete="on" noValidate>
        {pubCredVerifiedState ? (
          <PasswordView
            pubCredState={pubCredState}
            setPasswordState={setPasswordState}
            passwordState={passwordState}
            setPubCredVerifiedState={setPubCredVerifiedState}
            setPubCredState={setPubCredState}
          />
        ) : (
          <PubCredView
            setPubCredVerifiedState={setPubCredVerifiedState}
            pubCredState={pubCredState}
            setPasswordState={setPasswordState}
            setPubCredState={setPubCredState}
          />
        )}
      </form>
    </ApolloProvider>
  );
}
function PasswordView({
  pubCredState,
  setPasswordState,
  passwordState,
  setPubCredVerifiedState,
  setPubCredState,
}) {
  const [potatoChangeRequest] = useMutation(POTATO_AUTH_MUTATION, {
    onCompleted: async (data) => {
      setPubCredVerifiedState(false);
      setPubCredState('');
    },
  });
  const [potatoLogin] = useMutation(POTATO_AUTH_MUTATION, {
    onCompleted: async (data) => {
      window.location.assign('https://www.google.com');
    },
  });
  return (
    <React.Fragment>
      <input
        autoComplete="current-password"
        type="password"
        value={passwordState}
        onChange={(e) => setPasswordState(e.target.value)}
      />
      <input
        style={{ opacity: 0, zIndex: -99, position: 'absolute' }}
        type="email"
        value={pubCredState}
        autoComplete="username"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          potatoLogin();
        }}
      >
        login
      </button>
      <button
        type="text"
        onClick={(e) => {
          e.preventDefault();
          potatoChangeRequest();
        }}
      >
        change
      </button>
    </React.Fragment>
  );
}
function PubCredView({
  setPubCredVerifiedState,
  pubCredState,
  setPasswordState,
  setPubCredState,
}) {
  const [potatoAuthRequest] = useMutation(POTATO_AUTH_MUTATION, {
    onCompleted: async (data) => {
      setPubCredVerifiedState(true);
    },
  });
  return (
    <React.Fragment>
      <input
        type="email"
        autoComplete="username"
        value={pubCredState}
        onChange={(e) => setPubCredState(e.target.value)}
      />
      <input
        style={{ opacity: 0, zIndex: -99, position: 'absolute' }}
        autoComplete="current-password"
        type="password"
      />
      <button
        id="next"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          potatoAuthRequest();
        }}
      >
        next
      </button>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
