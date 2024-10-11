import { gerarChave } from "../utils/seguranca.js";

import * as db from '../repository/usuarioRepository.js';


import { Router } from 'express';
const endpoints = Router();


endpoints.post( '/acesso/', async ( req, resp ) => {
    try {
        let usuarioCad = req.body;

        let id = await db.inserirUsuario( usuarioCad );

        resp.send({
            novoId: id
        })
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})



endpoints.post( '/acesso/', async ( req, resp ) => {
    try {
        let usuarioCad = req.body;

        let pessoa = await db.validarUsuario( usuarioCad );

        if ( usuarioCad == null ) {
            resp.send({ erro: "Usuário ou senha incorreto(s)" })
        } else {
            let token = gerarChave( pessoa );
            resp.send({
                "token": token
            })
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default endpoints;