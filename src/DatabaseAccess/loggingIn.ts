import { Request, Connection } from 'tedious';
import { connection } from '../app';



export async function correctUserAndPassword(username: string, password: string){
    var output;


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



}

export function findUserByID(ID: string){
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