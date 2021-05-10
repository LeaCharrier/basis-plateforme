import { jsonModel } from '../models/jsonFigma.model.js';

export async function get(req, res) {
    try {
        res.status(200).json({
		   "colors": {
		      "grey": {
		         "value":"rgba(255, 255, 255, 1)"
		      },
		      "blue": {
		         "value":"rgba(255, 255, 255, 1)"
		      }
		   }
		});
    }
    catch(err) {
        res.status(400).send({err});
    }
}
export async function push(req, res) {
    const {title} = req.body

    try {
        const json = await jsonModel.create({category: title});
        res.status(201).json({item: json._id});
    }
    catch(err) {
        res.status(400).send({err});
    }
}