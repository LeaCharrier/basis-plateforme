import {
    rgbToHex
} from "./ColorConvertor.js";
import slugify from 'slugify'

export function fileFormat(file) {
    const items = [];
    let i = 0;

    file.document.children
        .filter(child => child.type === 'CANVAS')
        .map(child => {
            return child.children
                .filter(child => child.type === 'FRAME')
                .map(child => {
                    const slug = slugify(child.name.toLowerCase())
                    const id = slugify(child.id.replace(':', '_'))

                    items[`${slug}-${id}`] = {
                        name: child.name,
                        slug: slug,
                        id: child.id,
                        colors: []
                    }

                    let rec = obj => {
                        [...obj].forEach(o => {
                            if(o.children) {
                                rec(o.children);
                            } else if(o.fills.length && o.fills[0] && o.fills[0].color) {

                                // Store used style id
                                let style;
                                o.styles && o.styles.fill ? style = o.styles.fill : style = undefined;

                                const {
                                    r,
                                    g,
                                    b,
                                    a
                                } = o.fills[0].color

                                const color = {
                                    name: o.name,
                                    type: o.type,
                                    style: style,
                                    r: r * 255,
                                    g: g * 255,
                                    b: b * 255,
                                    a,
                                    hex: rgbToHex(r * 255, g * 255, b * 255),
                                    fillType: o.fills[0].type
                                }

                                items[`${slug}-${id}`].colors.push(color)
                                items.push(color)

                            }
                        });
                    }

                    rec(child.children);

                })
        })

    return items
}

export function jsonFileFormat(json) {
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
                            r: parseFloat(data.value.match(/\d+/g)[0]),
                            g: parseFloat(data.value.match(/\d+/g)[1]),
                            b: parseFloat(data.value.match(/\d+/g)[2]),
                            a: parseFloat(data.value.match(/\d+/g)[3])
                        }

                        res.colors.push({
                            prefix: k,
                            name: s,
                            hex: rgbToHex(rgba.r, rgba.g, rgba.b),
                            ...rgba,
                            display: data.value
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
