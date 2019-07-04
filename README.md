# BpmSenior

This is a project of a requisition flow.
There a division of a server and client side where are two projects, one in NodeJS and the other in Angular 7;

## Development server

Before of all you have to create a db of mysql with those specifications:

    host: "localhost",
    user: "root",
    password: "",
    database: "bpm"

After that you have to install depencencies both server and client using `yarn`;

To run project first start the server with `yarn start` then start client with `yarn start` too;

## Observation

Your base will be populate with two users, one where is a requester (`nathan.alcantara@senior.com.br`) and the other is the users that will receive the requisition (`gabriel.fischer@senior.com.br`) both passwords are `senior123`