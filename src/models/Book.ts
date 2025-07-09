export class Book {
    private bookId?: number;
    private title: string;
    private ISBN: number;
    private nrCopies: number;

    constructor(
        bookId: number | undefined,
        title: string,
        ISBN: number,
        nrCopies: number,
    ) {
        this.bookId = bookId;
        this.title = title;
        this.ISBN = ISBN;
        this.nrCopies = nrCopies;
    }

    get getBookId(): number {
        return this.bookId;
    }

    set setBookId(value: number) {
        this.bookId = value;
    }

    get getTitle(): string {
        return this.title;
    }

    set setTitle(value: string) {
        this.title = value;
    }

    get getISBN(): number {
        return this.ISBN;
    }

    set setISBN(value: number) {
        this.ISBN = value;
    }

    get getNrCopies(): number {
        return this.nrCopies;
    }

    set setNrCopies(value: number) {
        this.nrCopies = value;
    }
}
