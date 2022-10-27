import { Router, Request, Response } from 'express';
//import  {getBooksAsList} from '../app';

class getAllBooks {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', this.check.bind(this));
    }

    check = (req: Request, res: Response): Response => {
        return res.status(200).json();
    };
}

export default new getAllBooks().router;
