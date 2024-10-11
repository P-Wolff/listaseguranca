import { autenticar } from '../utils/seguranca.js';


import * as db from '../repository/listaDeProgramasRepository.js';


import { Router } from "express";
const endpoints = Router();


endpoints.get( '/listadeprogramas/', autenticar, async ( req, resp ) => {

    try {
        let idUsuario = req.user.id;
        let registros = await db.consultarListaDeProgramas( idUsuario );
        resp.send( registros );

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

endpoints.get( '/listadeprogramas/:id', autenticar, async (req, resp) => {

    try {
        let id = req.params.id;
        let registros = await db.consultarListaDeProgramasPorId( id );
        resp.send( registros[0] );

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.post( '/listadeprogramas/', async (req, resp) => {
    try {
        let programa = req.body;
        let id = await db.inserirListaDeProgramas( programa );

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.put( '/listadeprogramas/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        programa.idUsuario = req.user.id;
        let programa = req.body;

        let linhasAfetadas = await db.alterarListaDeProgramas( id, programa );

        if ( linhasAfetadas >= 1 ) {
            resp.send();
        }
        else {
            resp.status(400).send({ erro: 'Nenhum registro encontrado' })
        }
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.delete( '/listadeprogramas/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        
        let linhasAfetadas = await db.removerListaDeProgramas( id );

        if ( linhasAfetadas >= 1 ) {
            resp.send();
        }
        else {
            resp.status(400).send({ erro: 'Nenhum registro encontrado' })
        }
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


export default endpoints;