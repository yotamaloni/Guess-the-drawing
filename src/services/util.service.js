export const utilService = {
    makeId,
    timeConverter,
    getTimeSince,
    getDateString,
    getRandomIntInclusive,
    isInPeriodOfTime
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}


function getTimeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' minutes ago';
    }
    return 'just now';
}


function getDateString(dueDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let newDate = new Date(dueDate)
    let year = newDate.getFullYear()
    if (new Date(Date.now()).getFullYear() === year) year = ''
    const month = monthNames[newDate.getMonth()]
    const day = newDate.getDate()
    let hours = newDate.getHours()
    let min = newDate.getMinutes()
    if (min < 10) min = '0' + min
    let partOfTheDay
    if (hours > 12) {
        hours -= 12
        partOfTheDay = 'PM'
    } else {
        partOfTheDay = 'AM'
    }

    return `${month} ${day} ,${year} at ${hours}:${min} ${partOfTheDay} `
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const MILL_SEC_IN_DAY = 1000 * 60 * 60 * 24
const MILL_SEC_IN_WEEK = 1000 * 60 * 60 * 24 * 7
const MILL_SEC_IN_MONTH = 1000 * 60 * 60 * 24 * 30

function isInPeriodOfTime(periodOfTime, time) {
    switch (periodOfTime) {
        case 'day':
            return (time - Date.now() > 0 && time - Date.now() < MILL_SEC_IN_DAY)
        case 'week':
            return (time - Date.now() > 0 && time - Date.now() < MILL_SEC_IN_WEEK)
        case 'month':
            return (time - Date.now() > 0 && time - Date.now() < MILL_SEC_IN_MONTH)
    }
}

