import React from "react"
import useProductList from "./Products_Cust_Hook"

const ProductsList = () => {
    const { prd_list } = useProductList()
    return (
        <>
            {
                prd_list.length ?
                    <div>
                        {
                            prd_list.map((product) => {
                                return (
                                    <div key={product.id}>
                                        <li>{product.prd_name}</li>
                                        <li>{product.prd_price}</li>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : <>{'No Products'}</>
            }
        </>
    )
}

export default ProductsList