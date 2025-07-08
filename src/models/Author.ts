export class Author {
    private authorId: number;
    private firsname: string;
    private lastname: string;

    constructor(authorId: number, firstname: string, lastname: string) {
        this.authorId = authorId;
        this.firsname = firstname;
        this.lastname = lastname;
    }

    get getAuthorId(): number {
        return this.authorId;
    }

    set setAuthorId(value: number) {
        this.authorId = value;
    }

    get getFirstname(): string {
        return this.firsname;
    }

    set setFirstname(value: string) {
        this.firsname = value;
    }

    get getLastname(): string {
        return this.lastname;
    }

    set setLastname(value: string) {
        this.lastname = value;
    }
}
