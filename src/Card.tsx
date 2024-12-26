import { CardDetails } from './App'
import './App.css'
const mapper = {
  normal: '',
  quickplay: './Quick-Play.png',
  continuous: './continuous.png',
  field: './field.png',
  equip: './equip.png',
  counter: './counter-trap.png',
}

const colorMapper = {
  Spell: '#2b907e',
  Trap: '#8f0c71',
  Monster: '#a57052',
}

const LevelImage = ({ order }: { order: number }) => <img key={order} src="./monster-level2.png" alt="*" />
const iconType = (src: string) => <img src={src} alt="" />

export const Card = ({ ...props }: CardDetails) => {
  let cardTypeDetails;
  if (props.type === "Monster") {
    cardTypeDetails = [...Array(Number(props.level))].map((_, i) => <LevelImage order={i} />)
  } else if (props.type === "Spell") {
    cardTypeDetails = <div>[Spell Card{iconType(mapper[props.spellType || 'normal'])}]</div>
  } else { cardTypeDetails = <div>[Trap Card{iconType(mapper[props.trapType || 'normal'])}]</div> }


  // const cardTypeDetails = props.type === 'Monster' ? [...Array(props.level)].map((_, i) => <LevelImage key={i} />) : props.type === 'Spell' ? props.spellType : props.trapType
  return (
    <div className="card" style={{ backgroundColor: colorMapper[props.type] }}>
      <div className="title">
        <h1>{props.name}</h1>
        <div className="icon">
          <img src="" alt="" />
        </div>
      </div>
      <div className="cardTypeOrLevel">
        {cardTypeDetails}
      </div>
      <div className="cardImage">
        <img src="" alt="" />
      </div>
      <div className="detailsCard">
        {props.type === "Monster" &&
          <h1>[{props.monsterType}/Effect]</h1>
        }
        <p>
          {props.effect}
        </p>
        {props.type === "Monster" &&
          <>
            <hr />

            <p className='stats'> ATK/{props.attack} DEF/{props.defense}</p></>}

      </div>
    </div>
  )
}