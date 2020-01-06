import React from 'react';
import './App.css';
import styled from 'styled-components'
import Card from './components/card';
import moment from 'moment'
import * as util from './util'

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
    console.log(this.state.dateInput)
    console.log(this.state)
    console.log(this.state.hasDate)
    if (this.state.hasDate === false) {
    return (
      <TestInput>
      <input 
        type="text" 
        onChange={this.handleChange} >
      </input>
      <button onClick={this.handleClick}>Store Date</button>
      {this.state.dateInput === "hello" ? <span>yo</span> : <span>nope</span>}
      </TestInput>
    )
    } else {

    return (
    <div className="appContent">

      <HeroText>
        <LifeCount>{util.daysOld}</LifeCount>
        <LifeLabel>Days Old</LifeLabel>
      </HeroText>

      <CardGrid>

        <Card
          title={`${util.nextBday.diff(util.born, 'years')}th Birthday`}
          image={require('./images/birthday.svg')}
          data={util.daysToBday}
          label="Days Remaining"
          width={util.percentBday} />

        <Card
          title={`${moment().add(1, 'years').format("YYYY")} New Year`}
          image={require('./images/newYear.svg')}
          data={util.daysToYear}
          label="Days Remaining"
          width={util.percentYear} />

        <Card
          title={`${util.nextBigDay/1000}k Days`}
          image={util.decImage}
          data={util.daysToBigDay}
          label="Days Remaining"
          width={util.percentDays} />

        <Card
          title={`${util.currDec}'s to ${util.nextDec}`}
          image={require('./images/death.svg')}
          data={util.daysToDec}
          label="Days Remaining"
          width={util.percentDec} />

      </CardGrid>
    </div>
  );
    }
    }
}


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

const TestInput = styled.div`
  position: absolute; 
  left: 40%;
  top: 40%;

  input {
    border: solid 1px black;
  }

  button {
    background-color: rgba(0, 0, 0, .1);
  }
`

export default App;
