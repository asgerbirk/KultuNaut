export function dateFormat(date){
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    // YYYY-MM-DDTHH:mm:ss.sssZ

    const list = date.split('-')
    /* split
    0: "DD"
    1: "MM"
    2: "YYYY"
    */

    return new Date(`${list[2]}-${list[1]}-${list[0]}`)
}