/*
 * Format Date Helper
 */
export function dateFormat(rawDate) {
    var format = rawDate ? new Date(rawDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''
    return format;
}