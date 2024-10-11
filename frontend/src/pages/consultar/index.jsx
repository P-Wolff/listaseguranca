import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './index.scss'
import axios from 'axios'



export default function Consultar() {
    const [ usuarioCad, setUsuarioCad ] = useState( null );
    const [ listadeCanais, setListaDeCanais ] = useState([]);

    const navegacao = useNavigate()

    async function buscar() {
        const url = `http://localhost:3000/listadecanais?token-de-acesso=${usuarioCad}`;
        let resp = await axios.get(url);

        setListaDeCanais(resp.data);
    }

    async function excluir( id ) {
        const url = `http://localhost:3000/listadecanais/${id}?token-de-acesso=${usuarioCad}`;
        await axios.delete( url )
        
        await buscar()
    }


    async function sair() {
        localStorage.removeItem( 'USUARIO', null )
        navegacao( '/' )
    }


    useEffect(() => {
        let usu = localStorage.getItem( 'USUARIO' )
        setUsuarioCad( usu )

        if ( usu == undefined ) {
            navegacao( '/' )
        }
    }, []);

    return(
        <div className="pagina-consultar pagina">
            <h2> Bem-vindo {usuarioCad?.nome} </h2>
            <button onClick={ sair }> Sair </button>
            
            <h1> Consultar </h1>
            <button onClick={buscar}> Buscar </button>
            <button><Link to={ '/cadastrar' }>Cadastrar</Link></button>


            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Canal</th>
                        <th>Aberto</th>
                    </tr>
                </thead>

                <tbody
                {...listadeCanais.map( item =>
                        <tr>
                            <td>{ item.id }</td>
                            <td>{ item.nome }</td>
                            <td>{ item.canal }</td>
                            <td>{ item.aberto ? 'Sim' : 'Não' }</td>
                            <td>
                                <Link to={`/cadastrar/${ item.id }`}> Alterar </Link>
                                <Link onClick={() => excluir( item.id )}> Deletar</Link>
                            </td>
                        </tr>
                    )}>
                </tbody>

            </table>


        </div>
    );
}