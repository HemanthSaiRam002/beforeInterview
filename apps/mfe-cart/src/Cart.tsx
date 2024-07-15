import React, { useEffect, useState } from "react"
import { ADD_TO_CART_EVENT } from "shell/events"
const Cart = () => {
    const [cartItems, setCartItems] = useState<any[]>([])
    useEffect(() => {
        const handleAddToCart = (event: CustomEvent) => {
            console.log(event.detail)
            setCartItems((prevCartItems) => [...prevCartItems, event.detail])
        }
        window.addEventListener(ADD_TO_CART_EVENT, handleAddToCart as EventListener)

        return () => {
            window.removeEventListener(ADD_TO_CART_EVENT, handleAddToCart as EventListener)
        }
    }, [])
    return (
        <>
            <h1>Cart Component</h1>
            {
                cartItems.map((cartIt) => {
                    return (
                        <p key={cartIt.id}>{JSON.stringify(cartIt, null, 2)}</p>
                    )
                })
            }
        </>
    )
}

export default Cart