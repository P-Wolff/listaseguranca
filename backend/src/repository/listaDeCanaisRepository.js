import con from './connection.js';


export async function inserirListaDeCanais( canal ) {
    const comando = `
        insert into tb_canal ( nm_canal, nr_canal, bt_aberto )
        values ( ?, ?, ? );
    `;


    let resposta = await con.query( comando, [ canal.nome, canal.numero, canal.aberto ])
    let info = resposta[0];

    return info.insertId;
}


export async function consultarListaDeCanais( idUsuario ) {
    const comando = `
        select 	nm_canal    nome, 
		        nr_canal    canal, 
                bt_aberto   aberto
        from 	tb_canal
        where id_usuario = ?
    `;


    let resposta = await con.query( comando, [ idUsuario ] );
    let registros = resposta[0];

    return registros;
}



export async function consultarListaDeCanaisPorId( id ) {
    const comando = `
        select 	nm_canal    nome, 
		        nr_canal    canal, 
                bt_aberto   aberto
        from 	tb_canal
        where   id_canal = ?;
    `;


    let resposta = await con.query( comando, [ id ] );
    let registros = resposta[0];

    return registros;
}


export async function alterarListaDeCanais( id, canal ) {
    const comando = `
        update 	tb_canal
        set		nm_canal = ?,
		        nr_canal = ?,
                bt_boolean = ?
        where id_canal = ?;
    `;


    let resposta = await con.query( comando, [ canal.nome, canal.numero, canal.aberto, id ]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerListaDeCanais( id ) {
    const comando = `
        delete from tb_canal
        where id_canal = ?;
    `;


    let resposta = await con.query( comando, [ id ]);
    let info = resposta[0];

    return info.affectedRows;
}
