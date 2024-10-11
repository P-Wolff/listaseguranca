import con from './connection.js';


export async function inserirUsuario( usuarioCad ) {
    const comando = `
        insert into tb_usuario_cadastro ( nm_usuario_cadastrado, ds_senha )
						values	( 'Paloma', 'admin@123' );
    `;

    let resposta = await con.query( comando, [ usuarioCad.nome, usuarioCad.senha ])
    let info = resposta[0];
    
    return info.insertId;
}

export async function validarUsuario( usuarioCad ) {
    const comando = `
        select
            id_usuario_cadastro  id,
            nm_usuario_cadastrado  nome
        from tb_usuario_cadastro
        where
            nm_usuario_cadastrado = ?
            and ds_senha = ?
    `;

    let registros = await con.query(comando, [ usuarioCad.nome, usuarioCad.senha ])
    return registros[0][0];
}