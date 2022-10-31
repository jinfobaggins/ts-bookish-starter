import { Router, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import {User, Book, CheckedOut} from '../sequelizeDefines'

class UserController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', function(req, res, next) {res.send('logged in as user');});
        this.router.get('/books', this.getCheckedOutBooksAsList.bind(this));
        this.router.post('/return/:id', this.returnBook.bind(this));
        this.router.post('/checkout/:id', this.checkoutBook.bind(this));
    }

    async getCheckedOutBooksAsList(req, res){
        console.log(req.user.ID)
        const userBooks = await CheckedOut.findAll({where: {userID: req.user.ID, returned: false}});
        const checkedOutBooks = [];
        let iterator = 0;
        
        for (const book of userBooks){
            checkedOutBooks .push(await Book.findOne({where: {ISBN: book.get('ISBN')}}))
            checkedOutBooks[iterator].setDataValue('due date', book.get('dueDate'))
            iterator++;
        }
        
        return res.status(200).json({checkedOutBooks });
    }

    async returnBook(req, res){
        const book = await CheckedOut.update({returned: 1}, {where: {userID: req.user.ID, returned: false, ISBN: req.params.id}})
        return res.status(200).json({success: 'book returned!'});
    }

    async checkoutBook(req, res){
        const book = await Book.findOne({where: {ISBN: req.params.id}});
        var currentTime = new Date();
        currentTime.setDate(currentTime.getDate()+14);
        if (book){
            const checkedOutBook = await CheckedOut.create({
                ISBN: req.params.id,
                UserID: req.user.ID,
                dueDate: currentTime,
                returned: false
            })

            return res.status(200).json({success: 'book checked out with due date: ' + currentTime.toLocaleDateString() });
        }
        else{
            return res.status(400).json({sorry: 'Book does not exist!'});
        }
    }

}

export default new UserController().router;
