import { writable } from 'svelte/store';

export const books = writable({
    category: null,
    edition: null,
    size: null,
    difficulty: null,
    pages_number: 0,
    books_number: 0
})