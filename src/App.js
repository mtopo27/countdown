import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import Card from './components/card';
import moment from 'moment'

// console.log(moment().format("DDD"))

const now = moment()
const bday25 = moment([2020, 5, 24])
const newYear20 = moment([2020, 0, 1])
const born = moment([1995, 5, 24])
const tenK = moment(born.add(10000,'days'))
const year20 = moment([2015, 5, 24])
const year30 = moment([2025, 5, 24])

console.log(born.diff(tenK.d, 'days'))
console.log(born.diff(moment(), 'days'))

const daysOld = now.diff(moment([1995, 5, 24]), 'days')
const to25 = bday25.diff(now, 'days')
const to2020 = newYear20.diff(now, 'days')
const to10k = born.diff(tenK.d, 'days')
const to30 = year30.diff(now, 'days')

const percent25 = 100 - ((to25/365)*100)
const percent2020 = 100 - ((to2020/365)*100)
const percent10k = 100 - ((to10k/10000) * 100)
const percent30 = 100 - (to30/year30.diff(year20, 'days') *100)

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <HeroText>
        <LifeCount>{daysOld}</LifeCount>
        <LifeLabel>Days Old</LifeLabel>
      </HeroText>

      <CardGrid>

        <Card
          title = "25th Birthday"
          image = {require('./images/birthday.svg')}
          data = {to25}
          label = "Days Remaining"
          width = {percent25} />

        <Card
          title = "2021 New Year"
          image = {require('./images/newYear.svg')}
          data = {to2020}
          label = "Days Remaining"
          width = {percent2020} />

        <Card
          title = "10,000 Days"
          image = {require('./images/10k.svg')}
          data = {to10k}
          label = "Days Remaining"
          width = {percent10k} />

        <Card
          title = "20's to 30"
          image = {require('./images/death.svg')}
          data = {to30}
          label = "Days Remaining"
          width = {percent30} />


      </CardGrid>

      {/* <Measurement>
        <span>Days Remaining</span>
        <span>Days Elapsed</span>
        <span>Percentage</span>
      </Measurement> */}


      </header>
    </div>
  );
}

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  padding-top: 100px;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
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
  grid-template-columns: repeat( 4, 290px );
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  transition: all ease-in-out .3s;
  animation: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
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
