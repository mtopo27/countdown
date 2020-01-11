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
    newBDay: '',
    dataDisplay: "Days Remaining"
  }

  handleChange = (event) => {
    this.setState({dateInput: event.target.value});
  }

  handleClick = (event) => {
    setTimeout(() => this.setState({hasDate: true}),400);
    this.setState({newBDay: this.state.dateInput})
  }

  handleDisplay = (value) => {
    this.setState({dataDisplay: value})
  }

  

  render() {
    // Constants from states, logic functions held in util
    var userBday = this.state.newBDay
    var userBorn = moment(userBday)
    var userAges = Math.floor(util.now.diff(userBorn, 'years', true))
    var userDaysOld = util.now.diff(moment(userBday), 'days')
    var [daysToBday, daysFromBday, percentBday] = util.bDayData(userBorn, userBday)
    var [nextBigDay, decImage, daysToBigDay, percentDays] = util.daysOldData(userBday)
    var [currDec, nextDec, daysToDec, daysFromDec, percentDec] = util.decData(userAges, userBday)
    const displayControl = (first, second, third) => {
      if (this.state.dataDisplay === "Days Remaining") {
        return first
      } else if (this.state.dataDisplay === "Days Elapsed") {
        return second
      } else {
        return `${Math.floor(third)}%`
      }
    } 

    if (this.state.hasDate && this.state.newBDay != '') {
      return(
        <AppContent>
          <TopMain daysOld={userDaysOld} />
      
          <CardGrid>
            <Card
              title={`${userAges + 1}th Birthday`}
              image={require('./images/birthday.svg')}
              data={displayControl(daysToBday, daysFromBday, percentBday)}
              label={this.state.dataDisplay}
              fill={percentBday} />
  
            <Card
              title={`${moment().add(1, 'years').format("YYYY")} New Year`}
              image={require('./images/newYear.svg')}
              data={displayControl(util.daysToYear, util.daysFromYear, util.percentYear)}
              label={this.state.dataDisplay}
              fill={util.percentYear} />
    
            <Card
              title={`${nextBigDay/1000}k Days`}
              image={decImage}
              data={displayControl(daysToBigDay, userDaysOld, percentDays)}
              label={this.state.dataDisplay}
              fill={`${this.state.hasDate ? percentDays : "0"}`} />


            <Card
              title={`${currDec}'s to ${nextDec}`}
              image={require('./images/death.svg')}
              data={displayControl(daysToDec, daysFromDec, percentDec)}
              label={this.state.dataDisplay}
              fill={percentDec} />
          </CardGrid>
          <div className="underCard">
            <div className="shortTerm">
              <StyledInput 
                type="date" 
                onChange={this.handleChange}
              />
              <InputClicker 
                ready={this.state.dateInput != this.state.newBDay ? "1" : "0"} 
                clicker={this.handleClick}
                initialPage={false}
              />
            </div>
            <div className="labels">
              <DisplayOptions 
                active={this.state.dataDisplay === "Days Remaining"} 
                clicking={() => this.handleDisplay("Days Remaining")}>
                  Days Remaining
              </DisplayOptions>
              <DisplayOptions 
                active={this.state.dataDisplay === "Days Elapsed"} 
                clicking={() => this.handleDisplay("Days Elapsed")}>
                  Days Elapsed
              </DisplayOptions>
              <DisplayOptions 
                active={this.state.dataDisplay === "Percent Done"} 
                clicking={() => this.handleDisplay("Percent Done")}>
                  Percent Done
              </DisplayOptions>
            </div>
          </div>
        </AppContent>
       )
    } 

    return (
      <AppContent>
          <Fading fading={this.state.newBDay != '' ? "0" : "1"}><TestInput>
            <InputHero>
              When were you born?
            </InputHero>
            <div>
              <StyledInput 
                  type="date" 
                  onChange={this.handleChange}
                  initialPage
                  >
              </StyledInput>
             <InputClicker 
              ready={this.state.dateInput ? "1" : "0"} 
              clicker={this.handleClick}
              initialPage={true}
              />
            </div>
            <ErrorPop popper={`${this.state.hasDate && this.state.newBDay === '' ? "1" : "0"}`} message="Please Insert Your Birthday"/>
          </TestInput></Fading>
            {/* This is stupid and for the life of me I don't know why, but for the styles to properly show post state change, the following section had to be in */}
            <DNone>
                <LifeLabel /> <LifeCount /><HeroText /> 
                <CardGrid /> <Card /> 
                <StyledInput /> <InputClicker />
                <DisplayOptions active={true} /> <DisplayOptions active={false} />
                <ErrorPop popper={"1"} message="Please Insert Your Birthday"/>
                <InputClicker ready={"1"} initialPage={true} /> <InputClicker ready={"0"} initialPage={false}/> <InputClicker ready={"1"} initialPage={false}/> <Fading fading={0}/> <Fading fading={1}/>
            </DNone>
      </AppContent>
    );
  }
}

const AppContent = styled.div`
  background-color: #151B26;
  justify-content: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
  overflow: none;
  text-align: center;
  
  @media (max-width: 1200px) {
    padding-top: 40px;
    padding-bottom: 40px;
}
`

const TestInput = styled.div`
  display: Flex;
  flex-direction: column;
  padding-bottom: 20vh;

  div {
    width: fit-content;
    max-width: 100%;
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
  font-size: ${props => props.initialPage ? "2.75rem" : "1.5rem"};
  padding: ${props => props.initialPage ? "8px 80px" : "2px 8px"};
  border: none;
  text-align: center;
  border-bottom: solid 2px rgba(255, 255, 255, .8);
  color: rgba(255, 255, 255, .5);
  transition: all .5s ease;
  cursor: text;
  position: relative;
  display: flex;
  justify-content: center;

  :focus {
    outline: none;
    border-bottom: solid 2px #025FEB;
    color: rgba(255, 255, 255, .8);
  }

  :after {
    position: absolute;
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

const DisplayText = styled.span`
  transition: all .3s ease;
  color: ${props => props.active ? "white" : "rgba(255, 255, 255, .5)"};
  font-weight: ${props => props.active ? "bold" : "normal"};

  :hover {
    color: white;
    cursor: pointer;
  }
`
const DisplayOptions = ({ active, children, clicking }) => {
  return <DisplayText onClick={clicking} active={active}>{children}</DisplayText>
}

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
  animation: Rise 1.5s .4s forwards ease;
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
  margin-bottom: 6vh;
  grid-template-columns: repeat( auto-fit, 265px );
  grid-gap: 48px 16px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  transition: all .3s;
  opacity: 0;
  animation: Rise 1.5s .4s forwards ease;

  @media (max-width: 1200px) {
    grid-template-columns: 265px 265px;
    justify-content: space-around;
  }

  @media (max-width: 720px) {
    justify-content: center;
    grid-template-columns: 265px;
    margin-bottom: 24px;
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
  width: ${props => props.initialPage ? "36px" : "20px"};
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
            initialPage={props.initialPage}
            onClick={props.clicker} />
        ) 
}





export default App;
