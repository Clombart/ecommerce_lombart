import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import gFetchFirestore from "../../../helpers/gFetchFirestore";
import ItemList from "../../ItemList/ItemList"


const ItemListContainer = () => {

    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { idCategory } = useParams();

    // efecto que trae productos por categoría
    useEffect(() => {
        gFetchFirestore(setProductsList, setLoading, idCategory)
    }, [idCategory])

    return (
        <>
            {loading
                ? <Spinner className="position-absolute top-50 start-50" animation="border" variant="warning" role="status"></Spinner>
                : <ItemList products={productsList} />
            }
        </>
    )
}

export default ItemListContainer