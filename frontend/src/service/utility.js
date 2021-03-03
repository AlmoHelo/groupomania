export const DATE_FORMAT = (dateString) => {
    const dateHour = dateString.split('.')[0]
    const dates = dateHour.split("T")
    const hours = dates[1]
    const dateNew = dates[0].split("-").reverse().join("/")
    return `Publié le ${dateNew} à ${hours}`
}

