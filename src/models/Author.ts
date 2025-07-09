export class Author {
    private authorId: number;
    private firstname: string;
    private lastname: string;

    constructor(authorId: number, firstname: string, lastname: string) {
        this.authorId = authorId;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    get getAuthorId(): number {
        return this.authorId;
    }

    set setAuthorId(value: number) {
        this.authorId = value;
    }

    get getFirstname(): string {
        return this.firstname;
    }

    set setFirstname(value: string) {
        this.firstname = value;
    }

    get getLastname(): string {
        return this.lastname;
    }

    set setLastname(value: string) {
        this.lastname = value;
    }
}
