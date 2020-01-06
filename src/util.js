import moment from 'moment'
import TenK from './images/10k.svg'
import TwentyK from './images/20k.svg'
import Two5K from './images/25k.svg'
import FortyK from './images/40k.svg'
import * as app from './App'

console.log(moment().format("ddd, MMMM"))

// export const birthdayInput = prompt("Enter your birthday as 'YYYY-MM-DD'", "YYYY-MM-DD")

// Birthday and born are needed in order to keep a moment variable that isn't mutated. When .add or .subtract, use moment(birthday). When using diff you can just use born
const birthday = "1995-06-24"
export const now = moment()
export const born = moment(birthday)

function percenting(a, b) {
  return 100 - ((a/b) * 100)
}

export const testerFunction = function(numX) {
  var first = 3 - numX;
  var second = 3 + numX;
  return [first, second]
}


// Get the age, date of last and next birthday, days to next birthday, and % of year age finished

export const bDayData = function(userBorn, userBday) {
  var currAge = Math.floor(moment().diff(userBorn, 'years', true));
  var prevBday = moment(userBday).add(currAge, 'years', true);
  var nextBday = moment(userBday).add(currAge + 1, 'years', true);
  var daysToBday = nextBday.diff(moment(), 'days');
  var totalBday = nextBday.diff(prevBday, 'days');
  var percentBday = percenting(daysToBday, totalBday)
  return [daysToBday, percentBday]
}
const [currAge, prevBday] = bDayData(moment("1995-06-24"), "1995-06-24")

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
export const currDec = (Math.floor(24/10 % 10)) * 10
export const nextDec = currDec+10
export const currDecDate = moment(birthday).add(currDec, 'years')
export const nextDecDate = moment(birthday).add(nextDec, 'years')
export const daysToDec = nextDecDate.diff(now, 'days')
export const totalDec = nextDecDate.diff(currDecDate, 'days')
export const percentDec = percenting(daysToDec, totalDec)