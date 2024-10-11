import 'dotenv/config'
import express from 'express'
import cors from 'cors'


import addRouter from './router.js'


const servidor = express();
servidor.use( cors() );
servidor.use( express.json() );

addRouter( servidor );

servidor.listen( process.env.PORT, () => console.log( `--> API subiu na porta ${ process.env.PORT }` ));