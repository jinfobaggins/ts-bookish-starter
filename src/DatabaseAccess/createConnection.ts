import { resolve } from 'path';
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
    return new Promise((resolve, reject) => {
        if (!connection) {
            connection = new Connection(config)
        }

        connection.connect();
        connection.on('connect', function(err) {
            if(err) {
                console.log('Error: ', err);
                reject(err);
            } else{
                console.log('Connected');
                resolve(connection);

            }
        });

        return connection;
    });
}