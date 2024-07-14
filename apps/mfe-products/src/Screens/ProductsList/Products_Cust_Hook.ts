import { useState } from "react"
import { IProduct } from "../../Interfaces"
import { ProductsList } from "../../mock/ProductsList"

const useProductList = () => {
    const [prd_list, setPrdList] = useState<IProduct[]>(ProductsList)

    return { prd_list }
}

export default useProductList