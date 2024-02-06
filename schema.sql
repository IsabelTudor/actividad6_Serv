CREATE TABLE usuarios (
    id serial primary key,
    nombre varchar(100) unique,
    password varchar(255)
);
CREATE TABLE videojuegos (
    id serial primary key,
    nombre varchar(255)
);
