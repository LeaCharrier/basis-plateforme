import mongoose from 'mongoose';
// import validator from 'validator';

// const isISBN = validator.isISBN;
const jsonSchema = new mongoose.Schema(
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
export const jsonModel = mongoose.model('json', jsonSchema);