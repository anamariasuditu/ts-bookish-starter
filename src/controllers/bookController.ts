import { Router, Request, Response } from 'express';
import { getById, getBooks, createBook, updateBook, deleteBook } from '../methods/bookMethods';
import { Book } from '../models/Book';
class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/', this.getAllBooks.bind(this));
        this.router.post('/create', this.createbook.bind(this));
        this.router.put('/:id/update', this.updatebook.bind(this));
        this.router.delete('/:id/delete', this.deletebook.bind(this));
    }

    async getBook(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const book = await getById(id);
            if (book) {
                return res.status(200).json(book);
            } else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async getAllBooks(req: Request, res: Response) {
        try {
            const book = await getBooks();
            if (book) {
                return res.status(200).json(book);
            } else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async createbook(req: Request, res: Response) {
        const { title, ISBN, nrCopies } = req.body;
        const book = new Book(undefined, title, ISBN, nrCopies);
        try {
            await createBook(book);
            return res.status(200).json(book);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async updatebook(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { title, ISBN, nrCopies } = req.body;
        const book = new Book(id, title, ISBN, nrCopies);
        try {
            await updateBook(book);
            return res.status(200).json(book);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async deletebook(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const book = await deleteBook(id);
            return res.status(200).json(book);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }
}

export default new BookController().router;
