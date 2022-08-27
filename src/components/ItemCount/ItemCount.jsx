import { useState } from "react"
import Button from 'react-bootstrap/Button';

import './ItemCount.css'

const ItemCount = ({ stock, onAdd, initial }) => {
    const [count, setCount] = useState(initial)

    const subtract = () => {
        if (count > initial) {
            setCount(count - 1)
        }
    }
    const add = () => {
        if (count < stock) {
            setCount(count + 1)
        }
    }

    return (
        <>
            <div className="input-group mb-3 mx-auto counterW">
                <button className="btn btn-outline-warning" type="button" onClick={subtract}>-</button>
                <input type="number" className="form-control text-center" placeholder={count}></input>
                <button className="btn btn-outline-warning" type="button" onClick={add}>+</button>
            </div>
            <Button variant="outline-warning" disabled={count > stock} onClick={() => onAdd(count)}>Agregar</Button>

        </>
    )
}

export default ItemCount