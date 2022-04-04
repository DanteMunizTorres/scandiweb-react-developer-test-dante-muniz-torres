
import { Link, Route, Router } from 'react-router-dom'

function CurrencyMenu(props) {


  return (
    <ul>
      {props.currencies.map(currency => {return <li><button><span>X</span>XXX</button></li>})}
    </ul>
  )
}

export default CurrencyMenu