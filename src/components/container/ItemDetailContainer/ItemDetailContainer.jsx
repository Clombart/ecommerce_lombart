import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import ItemDetail from '../../ItemDetail/ItemDetail';
import gFetchFirestoreDetail from "../../../helpers/gFetchFirestoreDetail";


const ItemDetailContainer = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams({});
    
    useEffect(() => {
    gFetchFirestoreDetail(setProduct, setLoading, id)
    }, [id])

    return (
        <>
            {loading ? <Spinner className="position-absolute top-50 start-50" animation="border" variant="warning" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
                : <ItemDetail item={product} />
            }
        </>
    )
}

export default ItemDetailContainer