// import mongoose from 'mongoose';
// import validator from 'validator';

// const isISBN = validator.isISBN;
// const bookSchema = new mongoose.Schema(
//     {
//         isbn: {
//             type: String,
//             required: true,
//             // unique: true,
//             trim: true,
//             validate: [isISBN]
//         },
//         category: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//         },
//         edition: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//         },
//         volume: {
//             type: Number,
//             min: 1,
//             required: true,
//             trim: true,
//         },
//         language: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//         },
//         status: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// export const BookModel = mongoose.model('book', bookSchema);

import mongoose from 'mongoose';
// var id = mongoose.Types.ObjectId();

const samySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
);
export const SamyModel = mongoose.model('samy', samySchema);


