import React from "react"
import styled from 'styled-components'
import './card.css'

// Add prop types, particularly for the image because lone wolfs die. In javascript, you absolutely need to define and document
/**ß
 * @param {{
 *  image: require
 *  title: string
 * }} props 
 */
const Card = props => (
  <CardContainer>
    <CardTitle>{props.title}</CardTitle>
    <CardImg src={props.image} />
    <div className="stack">
      <CardData>{props.data}</CardData>
      <DataLabel>{props.label}</DataLabel>
    </div>
    <BarGraph>
      <BarFill barWidth={props.barWidth} />
    </BarGraph>
  </CardContainer>
)

const CardContainer = styled.div`
  padding: 16px 20px;
  background-color: #12121a
  border-radius: 24px;
  width: 250px;
  box-shadow: 0px 3px 10px 0 rgba(0, 0, 0, .1);
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-gap: 24px;
`

const CardTitle = styled.span`
  color: white;
  text-align: left;
`

const CardImg = styled.img`
  height: 64px;
  width: auto;
  justify-self: center;
`

const CardData = styled.span`
  font-weight: bold;
  font-size: 2rem;
  color: white
  margin-bottom: 2px;
`

const DataLabel = styled.span`
  color: rgba(255, 255, 255, .8);
`

const BarGraph = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, .33);
  border-radius 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const BarFill = styled.div`
  position: absolute;
  background-color: #0578F2;
  width: ${props => props.barWidth}%;
  height: 8px;
  border-radius: 20px;
  animation: Grow 3s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
`



export default Card