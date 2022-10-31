import {User, Book, CheckedOut} from '../sequelizeDefines'


export async function getBooksAsList(){
    const books = await Book.findAll();
    return books;
}
