import './index.scss';

import axios from  'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';





export default function Home() {
  const [ nome, setNome ] = useState('')
  const [ senha, setSenha ] = useState('')


  const navegacao = useNavigate()


  async function acesso() {
    const usuario = {
      "nome": nome,
      "senha": senha
    }

    const url = `http://localhost:3000/acesso/`
    let resp = await axios.post( url, usuario )


    if ( resp.data.erro != undefined ) {
      alert( resp.data.erro )
    } else {
      localStorage.removeItem( 'USUARIO', resp.data.toke)
      navegacao( '/consultar' )
    }
  }



  return (
    <div className="pagina-home pagina">
      <h1>Login</h1>

      <div className="campo-form">
        <label htmlFor="nome"> Nome </label>
        <input
          id='nome'
          type='text'
          value={ nome }
          onChange={ ( e ) => setNome( e.target.value )}  
        />
      </div>
      
      <div className="campo-form">
        <label htmlFor="senha"> Senha </label>
        <input
          id='senha'
          type='text'
          value={ senha }
          onChange={( e ) => setSenha( e.target.value )}  
        />
      </div>

      <button onClick={ acesso }> entrar </button>

    </div>
  );
}

