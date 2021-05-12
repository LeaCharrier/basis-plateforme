export default function rgbToHex(r, g, b) {
    const color = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

    if (color.length > 7)
        return color.slice(0, 7);

    return color;
}
