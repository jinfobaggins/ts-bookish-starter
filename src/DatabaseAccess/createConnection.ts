import { Connection } from 'tedious';

var connection = null;

export var config = {
    server: "localhost",
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    },
    authentication: {
        type: "default",
        options: {  
            userName: "JenRob",
            password: "password",
        }
    }

};

export const getConnection = async() => {
    if (!connection) {
        connection = new Connection(config)
    }

    connection.connect();
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err);
        } else{
            console.log('Connected');

        }
    });

    return connection;
}