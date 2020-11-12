function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function getDateOffset(numDays) { 
    const d = new Date()
    d.setDate(d.getDate()+numDays)
    const from = formatDate(d)
    return from
} 

export {formatDate as default, getDateOffset}
