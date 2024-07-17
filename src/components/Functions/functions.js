function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const year = date.getUTCFullYear();

    const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} / ${day} ${month} ${year}`;

    return formattedDate;
}


export {formatDateTime}