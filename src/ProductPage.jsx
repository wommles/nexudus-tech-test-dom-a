import React, { FC, useState } from "react"
import { useEffect } from "react"
import { getAuth, searchProducts } from "./Api"
import "./ProductPage.css"

const ProductPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const auth = await getAuth()
      const res = await searchProducts(1, 25, auth)
      setProducts(res)
    }
    fetchData() 
  }, [])

  const maxWords = (sentence, count) => {
    const splits = sentence.split(" ")
    if(splits.length < count) return sentence
    return splits.splice(0, count).join(" ") + "..."
  }

  const getCurrency = (code) => {
    switch(code){
      case "USD":
        return "$"
      case "GBP":
        return "£"
      case "EUR":
        return "€"
      default:
        return code + " "
    }
    
  }

  return (
    <div>
      <h1> Product Page</h1>
      <h4> Greyed products are not visible</h4>
      <div className="products-container">
        {products && products.map((product, i) => {
          return(
            <ul 
            className={`product ${product.Visible ? "visibile" : "not-visible"}`}
            key={"product-"+i}
            >
              <p className="name"> {product.Name} </p>
              <p className="description"> {maxWords(product.Description, 10)} </p>
              <p className="price"> {getCurrency(product.CurrencyCode) +  product.Price} </p>
              <p className="visibility"> Visibility : {product.Visible  ? "Visible" : "Not visible"} </p>

            </ul>
            )
          })}
        </div>
        <div>
          Products shown : {products.length}
        </div>
    </div>
  )
}

export default ProductPage
