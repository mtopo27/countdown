import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import Card from './components/card';
import moment from 'moment'
import TenK from './images/10k.svg'
import TwentyK from './images/20k.svg'
import Two5K from './images/25k.svg'
import FortyK from './images/40k.svg'

console.log(moment().format("ddd, MMMM"))

// Define Birthday
const birthday = "1995-06-24"

const now = moment()
// Get Birthday
const born = moment(birthday)

// Get the age, date of last and next birthday, days to next birthday, and % of year age finished
const age = Math.floor(now.diff(born, 'years', true))
const lastBday = moment(birthday).add(age, 'years')
const nextBday = moment(birthday).add(age + 1, 'years')
const daysToBday = (nextBday.diff(now, 'days'))
const percentBday = 100 - ((daysToBday/nextBday.diff(lastBday, 'days'))*100)

// Get jan 1 date of respective years, days from 'now' to next year, and the percent of the year finished
const thisYear = moment().startOf('year')
const nextYear = moment().startOf('year').add(1, 'years')
const daysToYear = nextYear.diff(now, 'days')
const percentYear = 100 - ((daysToYear/nextYear.diff(thisYear, 'days'))*100)

// Get number of days old, the next big date marker coming up, the date of the big day, the days until that date, and the percent of the way there
const daysOld = now.diff(moment(birthday), 'days')
const nextBigDay = (daysOld<10000) 
  ? 10000 
  : (daysOld>10000 && daysOld<20000 
    ? 20000 
    : (daysOld>20000 && daysOld<25000 
      ? 25000 
      : (daysOld>25000 && daysOld<40000 
        ? 40000 
        : "wow, good job"
        )
      )
  )
const bigDayDate = moment(birthday).add(nextBigDay, 'days')
const daysToBigDay = bigDayDate.diff(now, 'days')
const percentDays = 100 - ((daysToBigDay/nextBigDay)*100)
const decImage = (nextBigDay === 10000 ? TenK : (nextBigDay === 20000 ? TwentyK : (nextBigDay === 25000 ? Two5K : FortyK)))
console.log(decImage)

// Get current and next decade, date you turn the decade, days to the decade, percent of the decade
const currDec = (Math.floor(age/10 % 10)) * 10
const nextDec = currDec+10
const currDecDate = moment(birthday).add(currDec, 'years')
const nextDecDate = moment(birthday).add(nextDec, 'years')
const daysToDec = nextDecDate.diff(now, 'days')
const percentDec = 100 - ((daysToDec/nextDecDate.diff(currDecDate, 'days'))*100)

console.log(moment().add(1, 'years').format("YYYY"))

function App() {
  return (
    <div className="appContent">

      <HeroText>
        <LifeCount>{daysOld}</LifeCount>
        <LifeLabel>Days Old</LifeLabel>
      </HeroText>

      <CardGrid>

        <Card
          title={`${nextBday.diff(born, 'years')}th Birthday`}
          image={require('./images/birthday.svg')}
          data={daysToBday}
          label="Days Remaining"
          width={percentBday} 
        />

        <Card
          title={`${moment().add(1, 'years').format("YYYY")} New Year`}
          image={require('./images/newYear.svg')}
          data={daysToYear}
          label="Days Remaining"
          width={percentYear} 
        />

        <Card
          title={`${nextBigDay/1000}k Days`}
          image={decImage}
          data={daysToBigDay}
          label="Days Remaining"
          width={percentDays} 
        />

        <Card
          title={`${currDec} to ${nextDec}`}
          image={require('./images/death.svg')}
          data={daysToDec}
          label="Days Remaining"
          width={percentDec}  
        />
    
      </CardGrid>

      <Measurement>
        <span>Days Remaining</span>
        <span>Days Elapsed</span>
        <span>Percentage</span>
      </Measurement>


    </div>
  );
}

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  padding-top: 100px;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  opacity: 0;
  text-align: center;
`

const LifeCount = styled.span`
  font-size: 3rem;
  color: white;
  font-weight: bold;
`

const LifeLabel = styled.span`
  font-size: 2rem;
  color: rgba(255, 255, 255, .8);

`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, 290px );
  grid-gap: 60px 40px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  transition: all ease-in-out .3s;
  opacity: 0;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  justify-items: center;

  div {
    // position: absolute;
  }

  @media (max-width: 720px) {
    justify-content: center;
  }
`

const Measurement = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  width: fit-content;
  grid-gap: 100px;
  padding-bottom: 100px;
  margin-top: 60px;
  text-align: left;
  font-size: 24px;
  padding-left: 50px;
  color: #ACB5BF;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);

  span {
    cursor: pointer;
    transition: all ease-in-out .3s;
  }

  span:hover {
    color: white;
  }

  span:first-child {
    font-weight: bold;
    color: white;
  }
`

export default App;
