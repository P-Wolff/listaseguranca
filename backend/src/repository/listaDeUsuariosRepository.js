import con from './connection.js';


export async function inserirListaDeUsuarios( usuario ) {
    const comando = `
        insert into tb_usuario ( nm_usuario )
        values ( ? )
    `;


    let resposta = await con.query( comando, [ usuario.nome ])
    let info = resposta[0];

    return info.insertId;
}


export async function consultarListaDeUsuarios( idUsuario ) {
    const comando = `
        select  nm_usuario nome
        from    tb_usuario
        where   id_usuario = ?
    `;


    let resposta = await con.query( comando, [ idUsuario ] );
    let registros = resposta[0];

    return registros;
}



export async function consultarListaDeUsuariosPorId( id ) {
    const comando = `
        select nm_usuario nome
        from tb_usuario;
        where   id_canal = ?
    `;


    let resposta = await con.query( comando, [ id ] );
    let registros = resposta[0];

    return registros;
}


export async function alterarListaDeUsuarios( id, usuario ) {
    const comando = `
        update 	tb_usuario
        set		nm_usuario = ?
        where id_usuario = ?
    `;


    let resposta = await con.query( comando, [ usuario.nome, id ]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerListaDeUsuarios( id ) {
    const comando = `
        delete from tb_usuario
        where id_usuario = ?
    `;


    let resposta = await con.query( comando, [ id ]);
    let info = resposta[0];

    return info.affectedRows;
}
