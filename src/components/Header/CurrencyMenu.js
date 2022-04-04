
import { Link, Route, Router } from 'react-router-dom'

function CurrencyMenu(props) {


  return (
    <ul>
      {props.currencies.map(currency => {return <li><Link>{currency}</Link></li>})}
    </ul>
  )
}

export default CurrencyMenu