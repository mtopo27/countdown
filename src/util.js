import moment from 'moment'
import TenK from './images/10k.svg'
import TwentyK from './images/20k.svg'
import Two5K from './images/25k.svg'
import FortyK from './images/40k.svg'

export const now = moment()

function percenting(a, b) {
  return 100 - ((a/b) * 100)
}

// 
export const bDayData = function(userBorn, userBday) {
  var currAge = Math.floor(moment().diff(userBorn, 'years', true));
  var prevBday = moment(userBday).add(currAge, 'years', true);
  var nextBday = moment(userBday).add(currAge + 1, 'years', true);
  var daysToBday = nextBday.diff(moment(), 'days');
  var totalBday = nextBday.diff(prevBday, 'days');
  // var percentBday = percenting(daysToBday, totalBday)
  var percentBday = 100 - ((daysToBday/totalBday) * 100)
  return [daysToBday, percentBday]
}

// Get jan 1 date of respective years, days from 'now' to next year, and the percent of the year finished
export const thisYear = moment().startOf('year')
export const nextYear = moment().startOf('year').add(1, 'years')
export const daysToYear = nextYear.diff(now, 'days')
export const totalYear = nextYear.diff(thisYear, 'days')
export const percentYear = percenting(daysToYear, totalYear)

// Get number of days old, the next big date marker coming up, the date of the big day, the days until that date, and the percent of the way there
export const daysOldData = function(userBday) {
  var daysOld = moment().diff(moment(userBday), 'days');
  var nextBigDay = 
  (daysOld<10000) ? 10000 : 
    (daysOld>10000 && daysOld<20000 ? 20000 : 
      (daysOld>20000 && daysOld<25000 ? 25000 : 
        (daysOld>=25000 && daysOld<40000 ? 40000 : "wow, good job")
      )
  );
  var bigDayDate = moment(userBday).add(nextBigDay, 'days');
  var daysToBigDay = bigDayDate.diff(moment(), 'days');
  var percentDays = percenting(daysToBigDay, nextBigDay);
  var decImage = (
    nextBigDay === 10000 ? TenK : 
      (nextBigDay === 20000 ? TwentyK : 
        (nextBigDay === 25000 ? Two5K : FortyK)
      )
    );
  return [nextBigDay, decImage, daysToBigDay, percentDays]
}


// Get current and next decade, date you turn the decade, days to the decade, percent of the decade
export const decData = function(userAge, userBday) {
  var currDec = (Math.floor(userAge/10 % 10)) * 10;
  var nextDec = currDec + 10;
  var currDecDate = moment(userBday).add(currDec, 'years');
  var nextDecDate = moment(userBday).add(nextDec, 'years');
  var daysToDec = nextDecDate.diff(moment(), 'days');
  var totalDec = nextDecDate.diff(currDecDate, 'days');
  var percentDec = percenting(daysToDec, totalDec);
  return [currDec, nextDec, daysToDec, percentDec]
}

export const tryData = function(me) {
  const tryThis = me;
  const tryThat = me + me;
  return { tryThis, tryThat }
}

