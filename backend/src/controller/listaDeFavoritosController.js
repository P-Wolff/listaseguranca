import { autenticar } from '../utils/seguranca.js';

import * as db from '../repository/listaDeFavoritosRepository.js';


import { Router } from "express";
const endpoints = Router();


endpoints.get( '/listadefavoritos/', autenticar, async ( req, resp ) => {

    try {
        let idUsuario = req.user.id;
        let registros = await db.consultarListaDeFavoritos( idUsuario );
        resp.send( registros );

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

endpoints.get( '/listadefavoritos/:id', autenticar, async ( req, resp ) => {

    try {
        let id = req.params.id;
        let registros = await db.consultarListaDeFavoritosPorId( id );
        resp.send( registros[0] );

    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.post( '/listadefavoritos/', autenticar, async ( req, resp ) => {
    try {
        let favorito = req.body;
        favorito.idUsuario = req.user.id;
        let id = await db.inserirListaDeFavoritos( favorito );

        resp.send({
            novoId: id
        })
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


endpoints.put( '/listadefavoritos/:id', autenticar, async ( req, resp ) => {
    try {
        let id = req.params.id;
        let favorito = req.body;

        let linhasAfetadas = await db.alterarListaDeCanais( id, favorito );

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


endpoints.delete( '/listadefavoritos/:id', autenticar, async ( req, resp ) => {
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