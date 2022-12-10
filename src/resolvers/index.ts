import { QueryApplications } from "./applications";

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

export const resolvers = {
    Query: {
        books: () => books,
        applications: QueryApplications
    },
};