export class EntitieNotFoundError extends Error {
    constructor(name: string, id?: string) {
        const message = id
            ? `${name} with ${id} not found`
            : `${name} not found`;

        super(message);
    }
}