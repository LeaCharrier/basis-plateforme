import {rgbToHex} from "./ColorConvertor.js";
import slugify from 'slugify'

export function fileFormat(file) {
    const items = {
        colors: []
    }

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

                    return child.children
                        .filter(child => child.fills.length)
                        .map(shade => {
                            if (shade.fills[0] && shade.fills[0].color) {
                                const {
                                    r,
                                    g,
                                    b,
                                    a
                                } = shade.fills[0].color

                                const color = {
                                    name: shade.name,
                                    type: shade.type,
                                    r: r * 255,
                                    g: g * 255,
                                    b: b * 255,
                                    a,
                                    hex: rgbToHex(r * 255, g * 255, b * 255),
                                    fillType: shade.fills[0].type
                                }

                                items[`${slug}-${id}`].colors.push(color)
                                items.colors.push(color)
                            }
                        })
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
