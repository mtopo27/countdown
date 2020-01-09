import React from 'react';
import './App.css';
import styled from 'styled-components'
import Card from './components/card';
import moment from 'moment'
import * as util from './util'

  /*
    Questions:
    1. how do I ensure something follows a format '####-##-##'
    ---
    4. Animating between returns? 
  */


class App extends React.Component {
  state = {
    dateInput: '',
    hasDate: false,
    newBDay: ''
  }


  handleChange = (event) => {
    this.setState({dateInput: event.target.value});
  }

  handleClick = (event) => {
    this.setState({hasDate: true})
    this.setState({newBDay: this.state.dateInput})
  }


  render() {
    // Constants from states, logic functions held in util
    var userBday = this.state.dateInput
    var userBorn = moment(userBday)
    var userAges = Math.floor(util.now.diff(userBorn, 'years', true))
    var userDaysOld = util.now.diff(moment(userBday), 'days')
    var [daysToBday, percentBday] = util.bDayData(userBorn, userBday)
    var [nextBigDay, decImage, daysToBigDay, percentDays] = util.daysOldData(userBday)
    var [currDec, nextDec, daysToDec, percentDec] = util.decData(userAges, userBday)

    console.log(percentDec)

    if (!this.state.hasDate) {
      return (
        <div className="appContent">
            <TestInput topper={!this.state.hasDate}>
             <input 
                type="date" 
                onChange={this.handleChange}>
              </input>
              <button onClick={this.handleClick}>Store Date</button>
              <DNone>
                  <LifeLabel /> <LifeCount /><HeroText /> <CardGrid /> <Card barWidth={util.decData(24, "1995-06-24").percentBday} />
              </DNone>
            </TestInput>
        </div>
      );
    } 

    return(
      <div className="appContent">
        <HeroText>
          <LifeCount>{this.state.hasDate ? userDaysOld : ""}</LifeCount>
          <LifeLabel>Days Old</LifeLabel>
        </HeroText>
    
        <CardGrid>
          <Card
            title={`${userAges + 1}th Birthday`}
            image={require('./images/birthday.svg')}
            data={daysToBday}
            label="Days Remaining"
            barWidth="20" />

          <Card
            title={`${moment().add(1, 'years').format("YYYY")} New Year`}
            image={require('./images/newYear.svg')}
            data={util.daysToYear}
            label="Days Remaining"
            barWidth={util.percentYear} />
  
          <Card
            title={`${nextBigDay/1000}k Days`}
            image={decImage}
            data={daysToBigDay}
            label="Days Remaining"
            barWidth={`${this.state.hasDate ? percentDays : "0"}`} />
  
          <Card
            title={`${currDec}'s to ${nextDec}`}
            image={require('./images/death.svg')}
            data={daysToDec}
            label="Days Remaining"
            barWidth={`${this.state.hasDate ? percentDec : "0"}`} />
        </CardGrid>
      </div>
     )
  }
}

const TestInput = styled.div`
  position: absolute; 
  left: 40%;
  top: ${prop => prop.topper ? '40%' : '0%'};

  input {
    border: solid 1px black;
  }

  button {
    background-color: rgba(0, 0, 0, .1);
    color: white;
  }
`
const DNone = styled.div`
  visibility: hidden;
  opacity: 0;
  z-index: -1000;
  display: none;
`

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  padding-top: 100px;
  opacity: 0;
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
