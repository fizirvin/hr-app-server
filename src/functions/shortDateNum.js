import { utcToZonedTime, format } from 'date-fns-tz'

function shortDateNum(date){
    const mexDate = utcToZonedTime(date, 'America/Mexico_City')
    const output = format(mexDate, 'yyyy-MM-dd', { timeZone: 'America/Mexico_City' })
    return output
}

export default shortDateNum;