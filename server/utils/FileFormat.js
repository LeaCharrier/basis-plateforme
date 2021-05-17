import { rgbToHex } from "./ColorConvertor.js";

export function fileFormat(file) {
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

export default function test(json) {
    const res = {}
    const keys = Object.keys(json)

    keys.forEach((k) => {
        const subKeys = Object.keys(json[k])

        subKeys.forEach((s) => {
            const data = json[k][s]

            if (data.type) {
                switch (data.type) {
                    case 'color':
                        if (!res.colors)
                            res.colors = []

                        const rgba = {
                            r: data.value.match(/\d+/g)[0],
                            g: data.value.match(/\d+/g)[1],
                            b: data.value.match(/\d+/g)[2],
                            a: data.value.match(/\d+/g)[3]
                        }

                        res.colors.push({
                            prefix: k,
                            name: s,
                            hex: rgbToHex(rgba.r, rgba.g, rgba.b),
                            rgba: {
                                ...rgba,
                                display: data.value
                            },
                        })

                        break;
                    default:
                        break;
                }
            }
        })
    })

    return res
}
