import jwt from 'jsonwebtoken'
const CHAVE = '===!!ListaCanais=='





export function gerarChave( infoUsua ) {
    return jwt.sign( infoUsua, CHAVE )
}


export function autenticar( req, resp, next ) {
    return autenticacao( req, resp, next )
}




export function autenticacao( req, resp, next ) {
    try {
        let token = req.headers[ 'token-de-acesso'];

        if ( token === undefined )
            token = req.query[ 'token-de-acesso' ]

        let login = jwt.verify( token, CHAVE );

        req.user = login;

        next();
        
    } catch (e) {
        resp.status(401).end();
    }
}