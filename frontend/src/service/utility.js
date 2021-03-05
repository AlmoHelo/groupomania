export const DATE_FORMAT = (dateString) => {
    const dateHour = dateString.split('.')[0]
    const dates = dateHour.split("T")
    const hours = dates[1]
    const dateNew = dates[0].split("-").reverse().join("/")
    return `le ${dateNew} à ${hours}`
}

export const COLOR_HAND = (handColor) => {
    handColor.style.color = "red"
    return handColor
}

