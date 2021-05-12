import rgbToHex from "./RgbToHex.js";

export default function fileFormat(file) {
    const res = file.document.children
        .filter(child => child.type === 'CANVAS')[0].children
        .filter(child => child.type === 'FRAME')[0].children

        //Get all rectangles using shades
        .filter(child => child.type === 'RECTANGLE')

        //Get every colors
        .filter(child => child.fills[0].color)

        .map(shade => {
            const { r, g, b } = shade.fills[0].color;
            const nodeId = shade.fills;

            return {
                name: shade.name,
                color: {
                    r: shade.fills[0].color.r,
                    g: shade.fills[0].color.g,
                    b: shade.fills[0].color.b,
                    hex: rgbToHex(r * 255, g * 255, b * 255),
                }
            }
        })
        .filter((shade) => !!shade.name)

    return res
}
