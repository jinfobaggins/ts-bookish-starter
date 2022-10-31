import { Router, Request, Response } from 'express';
import {User, Book, CheckedOut} from '../sequelizeDefines'

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/search/:id', this.getBook.bind(this));

        this.router.post('/', this.createBook.bind(this));
        this.router.get('/allBooks', this.getBooksAsList.bind(this))
    }

    async getBooksAsList(req: Request, res: Response){
        const books = await Book.findAll();
        return res.status(500).json({books,
        });
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
