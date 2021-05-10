// import { ComposantForm } from '../models/jsonFigma.model.js';

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

export async function get(req, res) {
    try {
        res.status(200).json({book: 'hello'});
    }
    catch(err) {
        res.status(400).send({err});
    }
}