export const DATE_FORMAT = (dateString) => {
    const dateHour = dateString.split('.')[0]
    const dates = dateHour.split("T")
    const hours = dates[1]
    const dateNew = dates[0].split("-").reverse().join("/")
    return ` ${dateNew} à ${hours}`
}


export const SEARCH_PICTURE = (pictureString) => {
    const name = pictureString.split('/images/')[1];
    return name
}

