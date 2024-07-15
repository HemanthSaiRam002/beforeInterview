import React from "react"
import useProductList from "./Products_Cust_Hook"
import { IProduct } from "../../Interfaces"
// import './Product.css'
import { addToCart } from 'shell/events';
const ProductsList = () => {
    const { prd_list } = useProductList()
    const handleAddToCart = (product: IProduct) => {
        window.dispatchEvent(addToCart(product))
    }
    return (
        <>
            {
                prd_list.length ?
                    <ul style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        {
                            prd_list.map((product) => {
                                return (
                                    <div key={product.id}
                                        style={{
                                            border: '1px solid black'
                                        }}>
                                        <li>{product.prd_name}</li>
                                        <li>{product.prd_price}</li>
                                        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                    : <>{'No Products'}</>
            }
        </>
    )
}

export default ProductsList