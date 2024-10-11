import listaDeCanais from './controller/listaDeCanaisController.js'
import listaDeFavoritos from './controller/listaDeFavoritosController.js'
import listaDeProgramas from './controller/listaDeProgramasController.js'
import listaDeUsuarios from './controller/listaDeUsuariosController.js'
import usuarioCadastrado from './controller/usuarioController.js'


export default function addRouter( servidor ){
    servidor.use( listaDeCanais );
    servidor.use( listaDeFavoritos );
    servidor.use( listaDeProgramas );
    servidor.use( listaDeUsuarios );
    servidor.use( usuarioCadastrado );
}