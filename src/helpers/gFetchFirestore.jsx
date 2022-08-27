import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const gFetchFirestore = (setProductsList, setLoading, idCategory) => {

  const db = getFirestore();
  const queryCollection = collection(db, 'products');
  const queryCollectionFilter = idCategory ? query(queryCollection, where('category', '==', idCategory)) : queryCollection;

  getDocs(queryCollectionFilter)
    .then(resp => setProductsList(resp.docs.map(prod => ({ id: prod.id, ...prod.data() }))))
    .catch(err => (err))
    .finally(() => setLoading(false))

  return (
    <div>gFetchFirestore</div>
  )
}

export default gFetchFirestore