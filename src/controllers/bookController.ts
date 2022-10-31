import { Router, Request, Response } from 'express';
import {User, Book, CheckedOut} from '../sequelizeDefines'

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/book/:id', this.getBook.bind(this));
        this.router.post('/create/', this.createBook.bind(this));
        this.router.get('/allBooks', this.getBooksAsList.bind(this))
        this.router.get('/author/:author', this.findBookByAuthor.bind(this))
        this.router.get('/bookAvailability/:id', this.getBookAvailability.bind(this));
    }

    async getBooksAsList(req: Request, res: Response){
        const books = await Book.findAll();
        books.sort(function(a,b) {
            if(a.get('Title') < b.get('Title')){ return -1;}
            if(a.get('Title') > b.get('Title')){ return 1;}
            return 0;})


        return res.status(200).json({books});
    }

    async getBook(req: Request, res: Response) {
        const book = await Book.findOne({where: {ISBN: req.params.id}});
        if (book){
            return res.status(200).json({book});}
        else {
            return res.status(400).json({sorry: 'Book does not exist!'});
        }
    }

    async createBook(req: Request, res: Response) {
        const book = await Book.findOne({where: {ISBN: req.body.ISBN}})
        if (book){
            return res.status(400).json({sorry: 'Book already exists!'});
        }
        else {
            const book = await Book.create({
                ISBN: req.body.ISBN,
                Title: req.body.Title,
                Authors: req.body.Authors,
                noCopies: req.body.noCopies,

            })
            return res.status(201).json({book});
        }
    }

    async findBookByAuthor(req, res){
        const books = await Book.findAll({where: {Authors: req.params.author}});
        if (books){
            return res.status(200).json({books});}
        else {
            return res.status(400).json({sorry: 'No books by this author'});
        }
    }

    async getBookAvailability(req, res){
        const book = await Book.findOne({where: {ISBN: req.params.id}});
        if (book){
            let nonAvailableBooks = []

            const totalCopies = book.get('noCopies')
            const checkedOutCopies = await CheckedOut.findAll({where: {ISBN: req.params.id, returned: false}});
        
            for (const checkedOutBook of checkedOutCopies){
                nonAvailableBooks.push({user: checkedOutBook.get('UserID'), dueDate: checkedOutBook.get('dueDate')})
            }

            return res.status(200).json({copies: totalCopies, available: Number(totalCopies)-checkedOutCopies.length, nonAvailableBooks});
        }


        else {
            return res.status(400).json({sorry: 'Book does not exist!'});
        }

    }
}

export default new BookController().router;
