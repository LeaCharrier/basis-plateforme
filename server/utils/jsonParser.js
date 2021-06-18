import { ColorUsage } from './ColorUsage.js';

export function jsonParser(jsons, ref) {

    let colorUsage = new ColorUsage(ref);

    // Properties of interest
    const properties = {
        hex: color => {
            colorUsage.update(color);
        }
    }

    // Parse an object
    let parse = obj => {
        for (let prop in obj) {
            if (obj[prop] instanceof Object) {
                parse(obj[prop]);
            } else if (properties[prop]) {
                properties[prop](obj);
            }
        }
    };

    // Parse all jsons
    [...jsons].forEach(json => {
        parse(json);
    });

    // Interpret the extracted data
    colorUsage.calc(colorUsage.colors);

    // Return data
    return colorUsage;

}
