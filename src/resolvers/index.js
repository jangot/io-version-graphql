"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster'
    },
];
exports.resolvers = {
    Query: {
        books: function () { return books; }
    }
};
