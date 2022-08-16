import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useMutation,
} from "@apollo/client"

const client = new ApolloClient({
  uri: "https://autofill.khoa.app/graphql",
  //uri: 'http://localhost:3015/graphql',
  cache: new InMemoryCache(),
})

const POTATO_AUTH_MUTATION = gql`
  mutation PotatoAuth {
    potatoAuth {
      isPotato
    }
  }
`

function App() {
  const [pubCredVerifiedState, setPubCredVerifiedState] = useState(false)
  const [pubCredState, setPubCredState] = useState("")
  const [passwordState, setPasswordState] = useState("")
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
  )
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
      setPubCredVerifiedState(false)
      setPubCredState("")
    },
  })
  const [potatoLogin] = useMutation(POTATO_AUTH_MUTATION, {
    onCompleted: async (data) => {
      window.location.assign("https://www.google.com")
    },
  })
  return (
    <>
      <input
        autoComplete="current-password"
        type="password"
        value={passwordState}
        onChange={(e) => setPasswordState(e.target.value)}
      />
      <input
        style={{ display: "none" }}
        type="email"
        value={pubCredState}
        autoComplete="username"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          potatoLogin()
        }}
      >
        login
      </button>
      <button
        type="text"
        onClick={(e) => {
          e.preventDefault()
          potatoChangeRequest()
        }}
      >
        change
      </button>
    </>
  )
}
function PubCredView({
  setPubCredVerifiedState,
  pubCredState,
  setPasswordState,
  setPubCredState,
}) {
  const [potatoAuthRequest] = useMutation(POTATO_AUTH_MUTATION, {
    onCompleted: async (data) => {
      setPubCredVerifiedState(true)
    },
  })
  return (
    <>
      <input
        name="email"
        id="text-input-email"
        aria-invalid="false"
        placeholder=" "
        value={pubCredState}
        onChange={(e) => setPubCredState(e.target.value)}
      />
      <label for="text-input-email">Email or phone number</label>
      <button
        id="next"
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          potatoAuthRequest()
        }}
      >
        next
      </button>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))
