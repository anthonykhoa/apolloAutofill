import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [pubCredVerifiedState, setPubCredVerifiedState] = React.useState(false);
  const [pubCredState, setPubCredState] = React.useState('');
  const [passwordState, setPasswordState] = React.useState('');
  return (
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
  );
}
function PasswordView({
  pubCredState,
  setPasswordState,
  passwordState,
  setPubCredVerifiedState,
  setPubCredState,
}) {
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
      <button type="submit">login</button>
      <button
        type="text"
        onClick={() => {
          setPubCredVerifiedState(false);
          setPubCredState('');
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
        onClick={() => setPubCredVerifiedState(true)}
      >
        next
      </button>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
