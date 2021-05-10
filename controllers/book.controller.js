// import { BookModel } from '../models/book.model.js';

// export async function push(req, res) {
//     const {isbn, category, edition, volume, language, status} = req.body;

//     try {
//         const book = await BookModel.create({isbn, category, edition, volume, language, status});
//         res.status(201).json({book: book._id});
//     }
//     catch(err) {
//         res.status(400).send({err});
//     }
// }

// export async function get(req, res) {
//     try {
//         res.status(200).json({book: 'hello'});
//     }
//     catch(err) {
//         res.status(400).send({err});
//     }
// }


import { SamyModel } from '../models/book.model.js';
// import {SamyModel} from "../models/samy.model.js";
export async function get(req, res) {
    try {
        const allSamies = await SamyModel.find({});
        res.status(200).json(allSamies);
    }
    catch(err) {
        res.status(400).send({err});
    }
}

export async function push(req, res) {
    const {title} = req.body
    try {
        const samy = await SamyModel.create({category: title});
        res.status(201).json({item: samy._id});
    }
    catch(err) {
        res.status(400).send({err});
    }
}