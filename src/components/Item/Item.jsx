import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';


const Item = memo(
    ({ products }) => {
        const { img, name, brand, price, choice, id } = products;
        return (
            <>
                <Card className="mb-3" style={{ width: '18rem' }}>
                    <Card.Header>{brand}</Card.Header>
                    <div style={{ width: '100%' }}>
                        <Card.Img variant="top" src={img} style={{ width: 'auto', maxHeight: '200px' }} />
                    </div>
                    <Card.Body>
                        <Card.Title>{`${name}`}</Card.Title>
                        <Card.Text>
                            {`$${price}`}
                        </Card.Text>
                        <Link to={`/item/${id}`}>
                            <Button variant="outline-warning">Comprar</Button>
                        </Link>
                    </Card.Body>
                    <Card.Footer className="text-muted">{`${choice}`}</Card.Footer>
                </Card>
            </>
        )
    }
)

export default Item