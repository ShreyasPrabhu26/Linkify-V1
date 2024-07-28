function getCurrentDateInfo() {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    const readableDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return readableDate
}

module.exports = {
    getCurrentDateInfo
}