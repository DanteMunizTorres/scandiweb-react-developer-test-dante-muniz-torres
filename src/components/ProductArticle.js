

function ProductArticle (props) {


  return (
    <article>
      {<img src={props.product.gallery[0]} alt=''></img>}
      <h4>{props.product.name}</h4>
      <h3>{props.product.price}</h3>
    </article>    
  )
}

export default ProductArticle