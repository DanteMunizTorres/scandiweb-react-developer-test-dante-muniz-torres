


function CartArticle (props) {


  return (
    <article>
      <div>
        <h3>brand</h3>
        <h4>product name {props.product.id}</h4>
        <h3>price</h3>
        <div>
          <input type='checkbox' />
          <input type='checkbox' />
        </div>        
      </div>

      <div>
        <div>
          <button>+</button>
          <p>cantidad</p>
          <button>-</button>
        </div>
        <img alt="product-image"></img>
      </div>




    </article>
  )
}

export default CartArticle