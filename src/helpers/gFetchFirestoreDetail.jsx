import { getFirestore, doc, getDoc } from 'firebase/firestore';

const gFetchFirestoreDetail = (setProduct, setLoading, id) => {

  const db = getFirestore();
  const queryProduct = doc(db, 'products', id);
  getDoc(queryProduct) //trae un solo elemento, para traer muchos getDocs ... es una promesa
    .then(resp => setProduct({ id: resp.id, ...resp.data() }))
    .catch((error) => (error))
    .finally(() => { setLoading(false) })

  return (
    <div>gFetchFirestoreDetail</div>
  )
}

export default gFetchFirestoreDetail