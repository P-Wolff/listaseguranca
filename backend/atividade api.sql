create database db_atividades;

use db_atividades;


/*	USUARIOS	*/
create table tb_usuario_cadastro (
	id_usuario_cadastro	int primary key auto_increment,
	nm_usuario_cadastrado	varchar(200),
	ds_senha	varchar(50)
);

insert into tb_usuario_cadastro ( nm_usuario_cadastrado, ds_senha )
						values	( 'Paloma', 'admin@123' );

select	*
  from 	tb_usuario_cadastro;




/*	CANAL	*/
create table tb_canal (
	id_canal int primary key auto_increment,
	nm_canal varchar(200),
	nr_canal int,
	bt_aberto boolean,
	id_cadastro	int,
    
    foreign key (id_cadastro) references tb_usuario_cadastro(id_usuario_cadastro)
    on delete cascade
	on update cascade
);

insert into tb_canal ( nm_canal, nr_canal, bt_aberto, id_cadastro )
values ( 'SBT', 4, true, 1 );

select 	*
from 	tb_canal;


update 	tb_canal
set		nm_canal = 'globo',
		nr_canal = 5,
        bt_aberto = true
where id_canal = 1;

delete from tb_canal
where id_canal = 1;



/*	PROGRAMA	*/
create table tb_canal_programa (
	id_canal_programa int primary key auto_increment,
	id_canal int,
	nm_programa varchar(200),
	ds_genero varchar(200),
	hr_programa time,
	id_cadastro	int,
    
    foreign key (id_cadastro) references tb_usuario_cadastro(id_usuario_cadastro)
    on delete cascade
    on update cascade,
	foreign key (id_canal) references tb_canal(id_canal)
    ON DELETE CASCADE 
    on update cascade
    -- ON DELETE: será executada quando um registro for excluído da tabela pai.
    -- CASCADE: permite excluir ou atualizar os registros relacionados presentes na tabela filha automaticamente
);

insert into tb_canal_programa ( id_canal, nm_programa, ds_genero, hr_programa, id_cadastro )
values ( 1, 'Sábado animado', 'Livre', '07:00:00', 1 );


select 	*
from 	tb_canal_programa;


update 	tb_canal_programa
set		id_canal = 1,
		nm_programa = 'Tv Globinho',
        hr_programa = '07:00:00'
where id_canal_programa = 1;

delete from tb_canal_programa
where id_canal_programa = 1;




/*	USUARIOS	*/
create table tb_usuario (
	id_usuario int primary key auto_increment,
	nm_usuario varchar(200),
	id_cadastro	int,
    
    foreign key (id_cadastro) references tb_usuario_cadastro(id_usuario_cadastro)
    on delete cascade
    on update cascade
);

insert into tb_usuario ( nm_usuario, id_cadastro )
values ( 'Priscila', 1 );

select * 
from tb_usuario;


update 	tb_usuario
set		nm_usuario = 'Patricia'
where id_usuario = 1;

delete from tb_usuario
where id_usuario = 1;




/*	FAVORITO	*/
create table tb_programa_favorito (
	id_programa_favorito int primary key auto_increment,
	id_usuario int,
	id_canal_programa int,
	vl_avaliacao decimal(10,2),
	id_cadastro	int,
    
    foreign key (id_cadastro) references tb_usuario_cadastro(id_usuario_cadastro)
    on delete cascade
    on update cascade,
	foreign key (id_usuario) references tb_usuario(id_usuario)
	ON DELETE CASCADE
    on update cascade,
	foreign key (id_canal_programa) references tb_canal_programa(id_canal_programa)
	ON DELETE CASCADE
    on update cascade
);

insert into tb_programa_favorito ( id_usuario, id_canal_programa, vl_avaliacao, id_cadastro )
values ( 1, 1, 10, 1 );


select 	*
from 	tb_programa_favorito;


update 	tb_programa_favorito
set		id_usuario = 1, 
		id_canal_programa = 1, 
        vl_avaliacao = 5
where id_canal = 1;

delete from tb_programa_favorito
where id_programa_favorito = 2;



