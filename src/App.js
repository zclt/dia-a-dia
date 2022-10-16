import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [movimentacao, setMovimentacao] = useState();
  const r1 = window.location.origin

  async function asyncGetToken() {
    setToken(isAuthenticated ? await getAccessTokenSilently({audience: "https://zclt-dev.us.auth0.com/api/v2/"}) : 'not logged')
    console.log(token)
  }

  function getMovimentacao(id) {
     axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
    axios.get(`/Movimentacao/${id}`, {
      headers:{
        authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setMovimentacao(response.data)
    });
  }

  return (
    <div className="App">
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout({ returnTo: r1 })}>Log out</button>
      <button onClick={() => asyncGetToken()}>Token</button>
      <button onClick={() => getMovimentacao("62f105ff6f552f142a627040")}>Movimentacao</button>
      <h1>{ isAuthenticated ? user?.name : 'no logged' }</h1>
    </div>
  );
}

export default App;
