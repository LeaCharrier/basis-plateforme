export function rgbToHex(r, g, b) {
    const format = (c) => {
        const hex = parseInt(c).toString(16)
        return hex.length === 1 ? `0${hex}` : hex
    }

    const color = `#${format(r)}${format(g)}${format(b)}`

    if (color.length > 7)
        return color.slice(0, 7);

    return color;
}
