DROP DATABASE IF EXISTS banamex;

CREATE DATABASE banamex;
use banamex;

CREATE TABLE cliente(
    clienteId VARCHAR(15) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    apellidomaterno VARCHAR(50) NOT NULL,
    onboardstatus ENUM('onboarded', 'pending', 'rejected') NOT NULL,
    ingresos DECIMAL(10,2) NOT NULL,
    nacimiento DATE NOT NULL,
    curp VARCHAR(18) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    modelocelular VARCHAR(15) NOT NULL,
    PRIMARY KEY (clienteId)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE promociones
(
    promocionId VARCHAR(15) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    accionada BOOLEAN NOT NULL,
    PRIMARY KEY (promocionId)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE tarjetas
(
    tarjetaid VARCHAR(15) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    PRIMARY KEY (tarjetaid)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE productos
(
    productoId VARCHAR(15) NOT NULL,
    nombre ENUM('tarjeta', 'prestamo', 'inversion') NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    PRIMARY KEY (productoId)
) DEFAULT CHARSET=utf8mb4;

