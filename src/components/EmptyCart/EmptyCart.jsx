import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const EmptyCart = () => {
    return (
        <div>
            <h2 className="my-3">No hay productos en el carrito</h2>
            <Link to='/'><Button variant="warning" className="my-5">Empezar Compra</Button></Link>
        </div>
    )
}

export default EmptyCart