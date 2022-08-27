import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { CartContext } from '../../context/CartContextProvider';
import ItemCount from '../ItemCount/ItemCount';

import './ItemDetail.css';


const ItemDetail = ({ item }) => {

    const { addToCart } = useContext(CartContext)
    const [amount, setAmount] = useState()

    const onAdd = (counter) => {
        setAmount(counter)
        const product = { item: item, amount: counter }
        addToCart(product)
    }

    return (
        <>
            <Card className="container-fluid container-detail">
                <Card.Img variant="top" src={item.img} style={{ width: '16rem', padding: '1rem' }} />
                <Card.Body>
                    <Card.Title>{`${item.name}`}</Card.Title>
                    <Card.Text className="">
                        {`${item.brand} - `}
                        {`${item.choice}`}
                    </Card.Text>
                    <Card.Text className="price">
                        {`$${item.price}`}
                    </Card.Text>
                    {amount === item.amount
                        ? <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
                        : <div className='d-flex flex-column'>
                            <Link to="/"><Button variant="outline-warning m-1">Seguir Comprando</Button></Link>
                            <Link to="/carrito"><Button variant="outline-warning m-1">Terminar Compra</Button></Link>
                        </div>
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default ItemDetail