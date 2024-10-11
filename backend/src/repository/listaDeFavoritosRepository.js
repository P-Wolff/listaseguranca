import con from './connection.js';


export async function inserirListaDeFavoritos( favorito ) {
    const comando = `
        insert into tb_programa_favorito ( id_usuario, id_canal_programa, vl_avaliacao )
        values ( ?, ?, ? );
    `;


    let resposta = await con.query( comando, [ favorito.idUsuario, favorito.idCanal, favorito.avaliacao ])
    let info = resposta[0];

    return info.insertId;
}


export async function consultarListaDeFavoritos( idUsuario ) {
    const comando = `
        select 	id_usuario              idUsuario, 
        		id_canal_programa       idCanal, 
                vl_avaliacao            avaliacao
        from 	tb_programa_favorito;
        where   id_usuario = ?
    `;


    let resposta = await con.query( comando, [ idUsuario ] );
    let registros = resposta[0];

    return registros;
}



export async function consultarListaDeFavoritosPorId( id ) {
    const comando = `
        select 	id_usuario              idUsuario, 
        		id_canal_programa       idCanal, 
                vl_avaliacao            avaliacao
        from 	tb_programa_favorito;
        where   id_programa_favorito = ?
    `;


    let resposta = await con.query( comando, [ id ] );
    let registros = resposta[0];

    return registros;
}


export async function alterarListaDeFavoritos( id, favorito ) {
    const comando = `
        update 	tb_programa_favorito
        set		id_usuario = ?, 
        		id_canal_programa = ?, 
                vl_avaliacao = ?
        where id_canal = ?;
        
    `;


    let resposta = await con.query( comando, [ favorito.idUsuario, favorito.idCanal, favorito.avaliacao, id ]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerListaDeFavoritos( id ) {
    const comando = `
        delete from tb_programa_favorito
        where id_programa_favorito = ?;
    `;


    let resposta = await con.query( comando, [ id ]);
    let info = resposta[0];

    return info.affectedRows;
}
