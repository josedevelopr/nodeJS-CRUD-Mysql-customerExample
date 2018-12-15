create database crudnodejsmysql;

--using the database

use crudnodejsmysql;

--creating a table

create table customer
(
    id   int(6) unsigned auto_increment primary key,
    name varchar(50) not null,
    address varchar(100) not null,
    phone varchar(15) not null
);

--tp show all tables

show tables;

--to describe

describe customer;