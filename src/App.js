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
// import DateInput from './components/dateinput';

console.log(moment().format("ddd, MMMM"))

// const birthdayInput = prompt("Enter your birthday as 'YYYY-MM-DD'", "YYYY-MM-DD")

// Define Birthday
const birthday = "1995-06-24"

const now = moment()
// Get Birthday
const born = moment(birthday)

function percenting(a, b) {
  return 100 - ((a/b) * 100)
}

// Get the age, date of last and next birthday, days to next birthday, and % of year age finished
const age = Math.floor(now.diff(born, 'years', true))
const lastBday = moment(birthday).add(age, 'years')
const nextBday = moment(birthday).add(age + 1, 'years')
const daysToBday = nextBday.diff(now, 'days')
const totalBday = nextBday.diff(lastBday, 'days')
const percentBday = percenting(daysToBday, totalBday)

// Get jan 1 date of respective years, days from 'now' to next year, and the percent of the year finished
const thisYear = moment().startOf('year')
const nextYear = moment().startOf('year').add(1, 'years')
const daysToYear = nextYear.diff(now, 'days')
const totalYear = nextYear.diff(thisYear, 'days')
const percentYear = percenting(daysToYear, totalYear)

// Get number of days old, the next big date marker coming up, the date of the big day, the days until that date, and the percent of the way there
const daysOld = now.diff(moment(birthday), 'days')
const nextBigDay = 
    (daysOld<10000) ? 10000 : 
    (daysOld>10000 && daysOld<20000 ? 20000 : 
      (daysOld>20000 && daysOld<25000 ? 25000 : 
        (daysOld>25000 && daysOld<40000 ? 40000 : "wow, good job")
      )
    )
const bigDayDate = moment(birthday).add(nextBigDay, 'days')
const daysToBigDay = bigDayDate.diff(now, 'days')
const percentDays = percenting(daysToBigDay, nextBigDay)
const decImage = (
  nextBigDay === 10000 ? TenK : 
    (nextBigDay === 20000 ? TwentyK : 
      (nextBigDay === 25000 ? Two5K : FortyK)
    )
  )

// Get current and next decade, date you turn the decade, days to the decade, percent of the decade
const currDec = (Math.floor(age/10 % 10)) * 10
const nextDec = currDec+10
const currDecDate = moment(birthday).add(currDec, 'years')
const nextDecDate = moment(birthday).add(nextDec, 'years')
const daysToDec = nextDecDate.diff(now, 'days')
const totalDec = nextDecDate.diff(currDecDate, 'days')
const percentDec = percenting(daysToDec, totalDec)

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

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
          width={percentBday} />

        <Card
          title={`${moment().add(1, 'years').format("YYYY")} New Year`}
          image={require('./images/newYear.svg')}
          data={daysToYear}
          label="Days Remaining"
          width={percentYear} />

        <Card
          title={`${nextBigDay/1000}k Days`}
          image={decImage}
          data={daysToBigDay}
          label="Days Remaining"
          width={percentDays} />

        <Card
          title={`${currDec}'s to ${nextDec}`}
          image={require('./images/death.svg')}
          data={daysToDec}
          label="Days Remaining"
          width={percentDec} />

      </CardGrid>

      <DateInput></DateInput>

    </div>
  );
}

console.log(DateInput.value)

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  padding-top: 100px;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  opacity: 0;
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
  position-relative
  opacity: 0;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (max-width: 720px) {
    justify-content: center;
}
`

export default App;
