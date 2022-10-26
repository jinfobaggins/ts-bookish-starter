import { Router, Request, Response } from 'express';

class getAllBooks {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', this.check.bind(this));
    }

    check = (req: Request, res: Response): Response => {
        return res.status(200).json({ status: 'OK' });
    };
}

export default new getAllBooks().router;
