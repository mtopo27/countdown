import React from 'react';
import './App.css';
import styled from 'styled-components'
import Card from './components/card';
import moment from 'moment'
import * as util from './util'

  /*
    Questions:
    2. how do I ensure something follows a format '####-##-##'
    3. Any idea why the styled components don't render after state change
    ---
    4. Animating between returns? 
  */

class App extends React.Component {
  state = {
    dateInput: '',
    hasDate: false
  }


  handleChange = (event) => {
    this.setState({dateInput: event.target.value});
  }


  handleClick = (event) => {
    this.setState({hasDate: true});
  }

  

  render() {
    // Constants from states, logic functions held in util
    var userBday = this.state.dateInput
    var userBorn = moment(userBday)
    var userAges = Math.floor(util.now.diff(userBorn, 'years', true))
    var userDaysOld = util.now.diff(moment(userBday), 'days')
    var [daysToBday, percentBday] = this.state.hasDate ? util.bDayData(userBorn, userBday) : "0"
    var [nextBigDay, decImage, daysToBigDay, percentDays] = util.daysOldData(userBday)
    var [currDec, nextDec, daysToDec, percentDec] = util.decData(userAges, userBday)
console.log(this.state.hasDate)
      return (
        <div className="appContent">
        
        <div className={`${!this.state.hasDate ? '' : 'fixer'}`}>
        <TestInput>
        <input 
          type="date" 
          onChange={this.handleChange} >
        </input>
        <button onClick={this.handleClick}>Store Date</button>
        </TestInput>
        </div>

        <CSSFix showing={`${this.state.hasDate ? 1 : 0}`}>
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
          barWidth={parseFloat(percentBday)} />

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
          barWidth={`${percentDays}`} />

        <Card
          title={`${currDec}'s to ${nextDec}`}
          image={require('./images/death.svg')}
          data={daysToDec}
          label="Days Remaining"
          barWidth={parseFloat(percentDec)} />
      </CardGrid></CSSFix>
      </div>
      )
    }

    }

const HeroText = styled.div`
  flex-direction: column;
  display: flex;
  margin-bottom: 60px;
  padding-top: 100px;
  animate: Rise 2.5s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
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

const TestInput = styled.div`
  position: absolute; 
  left: 40%;
  top: 40%;

  input {
    border: solid 1px black;
  }

  button {
    background-color: rgba(0, 0, 0, .1);
    color: white;
  }
`

const CSSFix = styled.div`
  transition: .3s all ease;
  z-index: -1000;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: ${props => props.showing};
`

export default App;
