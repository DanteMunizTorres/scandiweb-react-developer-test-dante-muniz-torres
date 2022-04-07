
import { Link, Route, Router } from 'react-router-dom'

function CurrencyMenu(props) {


  return (
    <select className='selectCurrency' onChange={()=>this.props.changeCurrency}>
      {props.currencies.map((currency, i) => {return <option key={i} value={i}></option>})}
    </select>
/*     <nav>

    <ul>
      {props.currencies.map(currency => {return <li><button><span>X</span>XXX</button></li>})}
    </ul>
    </nav> */
  )
}

export default CurrencyMenu