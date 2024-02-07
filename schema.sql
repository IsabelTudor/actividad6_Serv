CREATE TABLE usuarios (
    id serial primary key,
    nombre varchar(100) unique,
    password varchar(255)
);
CREATE TABLE videojuegos (
    id serial primary key,
    nombre varchar(255)
);
create table compras (
	idUsuario integer not null,
	idVideojuego integer not null,
	comprado boolean,
	primary key (idUsuario,idVideojuego)
);
ALTER TABLE compras
ADD FOREIGN KEY (idUsuario) references usuarios(id);
ALTER TABLE compras
ADD FOREIGN KEY (idVideojuego) references videojuegos(id);