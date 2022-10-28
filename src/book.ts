class Book {
    title: string;
    ISBN: number;
    authors: string;
    noCopies: number;

    constructor(ISBN: number, title: string, authors: string, noCopies: number){
        this.ISBN = ISBN;
        this.title = title;
        this.authors = authors;
        this.noCopies = noCopies;
    }
}

export default Book;
