
import Book from '../book';
import { Request } from 'tedious';



export function getBooksAsList(connection){

    var bookArray: Book[] = [];

    var request = new Request("SELECT * FROM books", function(err){
        if (err) {
            console.log(err);
        }
    });

    return new Promise((resolve, reject) => {

        request.on('row', function(columns) {
            var arr: any[] = [];
            columns.forEach(function(column){
                arr.push(column.value);
            })
            var book = new Book(arr[0], arr[1], arr[2], arr[3]);
            bookArray.push(book);
    
        });

        console.log(bookArray)
        request.on('error', error => reject(error));
        request.on('doneProc', () => resolve(bookArray));
        connection.execSql(request);

    });
   
}
