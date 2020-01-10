import React from 'react';
import './App.css';
import styled from 'styled-components'
import Card from './components/card';
import moment from 'moment'
import * as util from './util'
import Arrow from './images/arrow.svg'


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
    setTimeout(() => this.setState({hasDate: true}),420);
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
    // var [currDec, nextDec, daysToDec, percentDec] = util.decData(24, "1995-06-24")
    console.log(percentDec)

    if (this.state.hasDate && this.state.newBDay != '') {
      return(
        <div className="appContent">
          <TopMain daysOld={userDaysOld} />
      
          <CardGrid>
            <Card
              title={`${userAges + 1}th Birthday`}
              image={require('./images/birthday.svg')}
              data={daysToBday}
              label="Days Remaining"
              fill="20" />
  
            <Card
              title={`${moment().add(1, 'years').format("YYYY")} New Year`}
              image={require('./images/newYear.svg')}
              data={util.daysToYear}
              label="Days Remaining"
              fill={util.percentYear} />
    
            <Card
              title={`${nextBigDay/1000}k Days`}
              image={decImage}
              data={daysToBigDay}
              label="Days Remaining"
              fill={`${this.state.hasDate ? percentDays : "0"}`} />

            {/* <Carder title={"10"} /> */}

            <Card
              title={`${currDec}'s to ${nextDec}`}
              image={require('./images/death.svg')}
              data={daysToDec}
              label="Days Remaining"
              fill={percentDec} />
          </CardGrid>
        </div>
       )
    } 

    return (
      <div className="appContent">
          <Fading fading={this.state.newBDay != '' ? "0" : "1"}><TestInput>
            <InputHero>
              When were you born?
            </InputHero>
            <div>
              <StyledInput 
                  type="date" 
                  onChange={this.handleChange}
                  placeholder="MM-DD-YYYY">
              </StyledInput>
             <InputClicker ready={this.state.dateInput ? "1" : "0"} clicker={this.handleClick}/>
            </div>
            <ErrorPop popper={`${this.state.hasDate && this.state.newBDay === '' ? "1" : "0"}`} message="Please Insert Your Birthday"/>
          </TestInput></Fading>
            <DNone>
                <LifeLabel /> <LifeCount /><HeroText /> <CardGrid /> <Carder title={20}  />
                <ErrorPop popper={"1"} message="Please Insert Your Birthday"/>
                <InputClicker ready={"1"} /> <Fading fading={0}/> <Fading fading={1}/>
            </DNone>
      </div>
    );
  }
}

const TestInput = styled.div`
  display: Flex;
  flex-direction: column;
  padding-bottom: 20vh;

  div {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: auto;
  }
`

const StyledInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  font-family: 'Oxygen', sans-serif;
  font-size: 2.75rem;
  padding: 8px 80px;
  border: none;
  text-align: center;
  border-bottom: solid 2px white;
  color: rgba(255, 255, 255, .9);
  transition: all .5s ease;
  cursor: text;

  :focus {
    outline: none;
    border-bottom: solid 2px #0578F2;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
    z-index: -1000;
  }

  ::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
    display: none;
    z-index: -1000;
}

::-webkit-clear-button {
  display: none;
}

}
`

const InputHero = styled.span`
  font-size: 3.5rem;
  color: white;
  font-weight: bold;
  margin-bottom: 88px;
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
  opacity: 0;
  animation: Rise 1.5s .5s forwards ease;
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
  margin-bottom: 10vh;
  grid-template-columns: repeat( auto-fit, 290px );
  grid-gap: 48px 24px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  transition: all .3s;
  opacity: 0;
  animation: Rise 1.5s .5s forwards ease;

  @media (max-width: 720px) {
    justify-content: center;
}
`

const ErrorMessage = styled.span`
  opacity: ${props => props.error};
  transition: opacity .4s ease;
  color: purple;
`

const InputImage = styled.img`
  position: absolute;
  transition: .8s all ease;
  opacity: ${props => props.ready};
  right: 0%;
  width: 36px;
  cursor: pointer;
`

const FadeOut = styled.div`
  opacity: ${props => props.fade};
  transition: all .4s ease;
`

const Fading = ({ fading, children }) => {
  return <FadeOut fade={fading} >{children}</FadeOut>
}

const ErrorPop = props => {
  return <ErrorMessage error={props.popper}>Please Insert Your Birthday</ErrorMessage>
}

const TopMain = props => {
  return (          
  <HeroText>
    <LifeCount>{props.daysOld}</LifeCount>
    <LifeLabel>Days Old</LifeLabel>
  </HeroText>
  )
}

const InputClicker = props => {
  return (
          <InputImage 
            src={require('./images/arrow.svg')} 
            ready={props.ready} 
            onClick={props.clicker} />
        ) 
}

const Carder = props => {
  return <Card fill={props.title}></Card>
}

const TesterInput = ({ children }) => {
  return <TestInput>{children}</TestInput>
}

const InputField = ({ clickFunction, children }) => {
  return <input type="text" placeholder="MM-DD-YYYY" onChange={clickFunction}>{children}</input>
}





export default App;
