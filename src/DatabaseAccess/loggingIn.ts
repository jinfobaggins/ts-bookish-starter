import { Request } from 'tedious';
import * as jwt from 'jsonwebtoken';



export function login(username: string, password: string, connection){
    var output = 'login failed'
   
    var sql: string = "SELECT * FROM users WHERE username='" + username + "' and password='" + password + "'";
    var request = new Request(sql, function(err){
        if (err) {
            console.log(err);
        }
    });

    return new Promise((resolve, reject) => {

        request.on('row', function() {
            var token = jwt.sign({ foo: 'loggedin' }, 'shhhhh');
            var decoded = jwt.verify(token, 'shhhhh');
            output = 'loggedin';
        });

        request.on('error', error => reject(error));
        request.on('doneProc', () => resolve(output));
        connection.execSql(request);
    });
   
        
}