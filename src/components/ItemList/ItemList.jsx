import { memo } from "react"

import Item from "../Item/Item"

import './ItemList.css';


const ItemList = memo(
    ({ products }) => {

        return (
            <div id="container-Cards" className="container-fluid">
                {products.map((prod) => <Item products={prod} key={prod.id} />
                )}
            </div>
        )
    }
)

export default ItemList
