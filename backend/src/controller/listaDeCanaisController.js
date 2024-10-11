import { autenticar } from '../utils/seguranca.js';

import * as db from '../repository/listaDeCanaisRepository.js';


import { Router } from "express";
const endpoints = Router();


endpoints.get( '/listadecanais/', autenticar, async ( req, resp ) => {

    try {
        let idUsuario = req.user.id;
        let registros = await db.consultarListaDeCanais( idUsuario );
        resp.send( registros );

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

endpoints.get( '/listadecanais/:id', autenticar, async ( req, resp ) => {

    try {
        let id = req.params.id;
        let registros = await db.consultarListaDeCanaisPorId( id );
        resp.send( registros[0] );

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.post( '/listadecanais/', autenticar, async ( req, resp ) => {
    try {
        let canal = req.body;
        canal.idUsuario = req.user.id;
        let id = await db.inserirListaDeCanais( canal );

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.put( '/listadecanais/:id', autenticar, async ( req, resp ) => {
    try {
        let id = req.params.id;
        let canal = req.body;

        let linhasAfetadas = await db.alterarListaDeCanais( id, canal );
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


endpoints.delete( '/listadecanais/:id', autenticar, async ( req, resp ) => {
    try {
        let id = req.params.id;
        
        let linhasAfetadas = await db.removerListaDeCanais( id );

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