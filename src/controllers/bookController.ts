import { Router, Request, Response } from 'express';
import {User, Book, CheckedOut} from '../sequelizeDefines'

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/book/:id', this.getBook.bind(this));
        this.router.post('/create/', this.createBook.bind(this));
        this.router.get('/allBooks', this.getBooksAsList.bind(this))
    }

    async getBooksAsList(req: Request, res: Response){
        const books = await Book.findAll();
        return res.status(500).json({books,
        });
    }

    async getBook(req: Request, res: Response) {
        const book = await Book.findOne({where: {ISBN: req.params.id}});
        return res.status(200).json({book
        });
    }

    async createBook(req: Request, res: Response) {
        const book = await Book.create({
            ISBN: req.body.ISBN,
            Title: req.body.Title,
            Authors: req.body.Authors,
            noCopies: req.body.noCopies,

        })
        // TODO: implement functionality
        return res.status(201).json({book
        });
    }
}

export default new BookController().router;
