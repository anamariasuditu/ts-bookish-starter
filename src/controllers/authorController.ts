import { Router, Request, Response } from 'express';
import {
    getauthorbyId,
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} from '../methods/authorMethods';
import { Author } from '../models/Author';
class AuthorController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getAuthor.bind(this));
        this.router.get('/', this.getAllAuthors.bind(this));
        this.router.post('/create', this.createauthor.bind(this));
        this.router.put('/:id/update', this.updateauthor.bind(this));
        this.router.delete('/:id/delete', this.deleteauthor.bind(this));
    }

    async getAuthor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const author = await getauthorbyId(id);
            if (author) {
                return res.status(200).json(author);
            } else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async getAllAuthors(req: Request, res: Response) {
        try {
            const author = await getAuthors();
            if (author) {
                return res.status(200).json(author);
            } else res.status(404).json({ message: 'Book not found' });
        } catch (error) {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async createauthor(req: Request, res: Response) {
        const { firstname, lastname } = req.body;
        const author = new Author(undefined, firstname, lastname);
        try {
            await createAuthor(author);
            return res.status(200).json(author);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async updateauthor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { firstname, lastname } = req.body;
        const author = new Author(id, firstname, lastname);
        try {
            await updateAuthor(author);
            return res.status(200).json(author);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    async deleteauthor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const author = await deleteAuthor(id);
            return res.status(200).json(author);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }
}

export default new AuthorController().router;
