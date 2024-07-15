export const ADD_TO_CART_EVENT = 'ADD_TO_CART'
export const REMOVE_FROM_CART_EVENT = 'REMOVE_FROM_CART'

export const addToCart = (product: any) => {
    return new CustomEvent(ADD_TO_CART_EVENT, { detail: product })
}

export const removeFromCart = (productId: number) => {
    return new CustomEvent(REMOVE_FROM_CART_EVENT, { detail: productId })
}