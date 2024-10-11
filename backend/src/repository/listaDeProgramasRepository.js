import con from './connection.js';


export async function inserirListaDeProgramas( programa ) {
    const comando = `
        insert into tb_canal_programa ( id_canal, nm_programa, ds_genero, hr_programa )
        values ( ?, ?, ?, ? )
    `;


    let resposta = await con.query( comando, [ programa.idCanal, programa.programa, programa.genero, programa.horario ])
    let info = resposta[0];

    return info.insertId;
}


export async function consultarListaDeProgramas( idUsuario ) {
    const comando = `
        select 	id_canal        idCanal,
        		nm_programa     programa,
                ds_genero       genero,
                hr_programa     horario
        from 	tb_canal_programa
        where   id_usuario = ?
    `;


    let resposta = await con.query( comando, [ idUsuario ] );
    let registros = resposta[0];

    return registros;
}



export async function consultarListaDeProgramasPorId( id ) {
    const comando = `
        select 	id_canal        idCanal,
        		nm_programa     programa,
                ds_genero       genero,
                hr_programa     horario
        from 	tb_canal_programa
        where   id_canal = ?
    `;


    let resposta = await con.query( comando, [ id ] );
    let registros = resposta[0];

    return registros;
}


export async function alterarListaDeProgramas( id, programa ) {
    const comando = `
        update 	tb_canal_programa
        set		id_canal = ?,
        		nm_programa = ?,
                hr_programa = ?
        where id_canal_programa = ?
    `;


    let resposta = await con.query( comando, [ programa.idCanal, programa.programa, programa.genero, programa.horario, id ]);
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerListaDeProgramas( id ) {
    const comando = `
        delete from tb_canal_programa
        where id_canal_programa = ?;
    `;


    let resposta = await con.query( comando, [ id ]);
    let info = resposta[0];

    return info.affectedRows;
}
