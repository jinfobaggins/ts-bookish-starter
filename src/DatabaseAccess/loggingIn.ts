import { Request, Connection } from 'tedious';
import { getConnection } from './createConnection';
import * as jwt from 'jsonwebtoken';
import { config } from './createConnection';



export async function correctUserAndPassword(username: string, password: string, connection_){
    var output;

    var connection = getConnection();
   
  
    var sql: string = "SELECT * FROM users WHERE username='" + username + "' and password='" + password + "'";
    var request = new Request(sql, function(err){
        if (err) {
            console.log(err);
        }
    });

    return new Promise((resolve, reject) => {

        request.on('row', function(columns) {
            output = columns[0].value;
        });

        request.on('error', error => reject(error));
        request.on('doneProc', () => resolve(output));
        connection.execSql(request);
        
    });


   // connection.close();
         
}

export function findUserByID(ID: string, connection){
    var output;
   
    var sql: string = "SELECT * FROM users WHERE ID='" + ID + "'";
    var request = new Request(sql, function(err){
        if (err) {
            console.log(err);
        }
    });

    return new Promise((resolve, reject) => {

        request.on('row', function(columns) {
            output = columns[0].value;
        });

        request.on('error', error => reject(error));
        request.on('doneProc', () => resolve(output));
        connection.execSql(request);
    });
         
}