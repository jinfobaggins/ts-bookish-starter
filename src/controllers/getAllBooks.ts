import { Router, Request, Response } from 'express';
import  {getBooksAsList} from '../app';
import Book from './book';

class getAllBooks {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', this.check.bind(this));
    }

    check = (req: Request, res: Response) => {
        
        
        var bookArray = getBooksAsList();
        //console.log(bookArray);
        return res.send(bookArray);
    };
    
}

export default new getAllBooks().router;
