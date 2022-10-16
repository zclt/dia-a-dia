import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import axios from "axios"
import './App.css'

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState()
  const [movimentacao, setMovimentacao] = useState()
  const logoutUri = process.env.REACT_APP_REDIRECT_URI

  async function asyncGetToken() {
    if(isAuthenticated && !token) {
      const t = await getAccessTokenSilently({audience: process.env.REACT_APP_AUDIENCE })
      setToken(t)
      return t    
    } else {
      loginWithRedirect()
    }
    return token    
  }

  async function asyncMovimentacao(id) {    
    const movimentacao = await axios.get(`/movimentacao/${id}`, { headers: { authorization: `Bearer ${await asyncGetToken()}` } })
    setMovimentacao(movimentacao.data)
  }

  return (
    <div className="App">
      <p>{ isAuthenticated ? <img src={user?.picture}/> : 'no logged' }</p> 
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout({ returnTo: logoutUri })}>Log out</button>
      <button onClick={() => asyncMovimentacao("62f105ff6f552f142a627040")}>Movimentacao</button>
      <pre>{ JSON.stringify(movimentacao, null, 4) }</pre>
    </div>
  );
}

export default App;
