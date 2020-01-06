import moment from 'moment'
import TenK from './images/10k.svg'
import TwentyK from './images/20k.svg'
import Two5K from './images/25k.svg'
import FortyK from './images/40k.svg'
import * as app from './App'

console.log(moment().format("ddd, MMMM"))

// export const birthdayInput = prompt("Enter your birthday as 'YYYY-MM-DD'", "YYYY-MM-DD")

// Define Birthday
const birthday = "1995-06-24"

console.log(birthday)
export const now = moment()
// Get Birthday
export const born = moment(birthday)

function percenting(a, b) {
  return 100 - ((a/b) * 100)
}

// Get the age, date of last and next birthday, days to next birthday, and % of year age finished
export const age = Math.floor(now.diff(born, 'years', true))
export const lastBday = (bday) => moment(bday).add(age, 'years')
export const nextBday = moment(birthday).add(age + 1, 'years')
export const daysToBday = nextBday.diff(now, 'days')
export const totalBday = nextBday.diff(lastBday, 'days')
export const percentBday = percenting(daysToBday, totalBday)

// Get jan 1 date of respective years, days from 'now' to next year, and the percent of the year finished
export const thisYear = moment().startOf('year')
export const nextYear = moment().startOf('year').add(1, 'years')
export const daysToYear = nextYear.diff(now, 'days')
export const totalYear = nextYear.diff(thisYear, 'days')
export const percentYear = percenting(daysToYear, totalYear)

// Get number of days old, the next big date marker coming up, the date of the big day, the days until that date, and the percent of the way there
export const daysOld = (bday) => now.diff(moment(bday), 'days')
export const nextBigDay = 
    (daysOld<10000) ? 10000 : 
    (daysOld>10000 && daysOld<20000 ? 20000 : 
      (daysOld>20000 && daysOld<25000 ? 25000 : 
        (daysOld>25000 && daysOld<40000 ? 40000 : "wow, good job")
      )
    )
export const bigDayDate = moment(birthday).add(nextBigDay, 'days')
export const daysToBigDay = bigDayDate.diff(now, 'days')
export const percentDays = percenting(daysToBigDay, nextBigDay)
export const decImage = (
  nextBigDay === 10000 ? TenK : 
    (nextBigDay === 20000 ? TwentyK : 
      (nextBigDay === 25000 ? Two5K : FortyK)
    )
  )

// Get current and next decade, date you turn the decade, days to the decade, percent of the decade
export const currDec = (Math.floor(age/10 % 10)) * 10
export const nextDec = currDec+10
export const currDecDate = moment(birthday).add(currDec, 'years')
export const nextDecDate = moment(birthday).add(nextDec, 'years')
export const daysToDec = nextDecDate.diff(now, 'days')
export const totalDec = nextDecDate.diff(currDecDate, 'days')
export const percentDec = percenting(daysToDec, totalDec)