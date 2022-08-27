import { useState, useContext } from 'react';
import { getFirestore, getDocs, where, documentId, collection, addDoc, query, writeBatch } from 'firebase/firestore'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { CartContext } from '../../context/CartContextProvider';
import ModalOrderComplete from '../ModalOrderComplete/ModalOrderComplete';

import './ContactForm.css'


const ContactForm = () => {
    const [orderId, setOrderId] = useState('');
    const [formSubmmit, setFormSubmmit] = useState(false);

    const { cart, totalPrice, handleShowBis } = useContext(CartContext);

    const generateOrder = async (values) => {

        const order = {}
        order.buyer = {
            name: values.name,
            lastname: values.lastname,
            phone: values.phone,
            mail: values.email,
        }
        order.items = cart.map(prod => {
            const id = prod.item.id
            const price = prod.item.price
            const title = prod.item.name
            const amount = prod.amount

            return { id, price, title, amount }
        })

        order.total = totalPrice()
        order.date = new Date().toLocaleString()

        //insertar order
        const db = getFirestore();
        const queryInsertCollection = collection(db, 'orders');
        addDoc(queryInsertCollection, order)
            .then((resp) => setOrderId(resp.id))
            .catch(err => (err))

        //actuaizar stock
        const queryCollectionStock = collection(db, 'products')
        const queryActualizarStock = query(
            queryCollectionStock,
            where(documentId(), 'in', cart.map(it => it.item.id))
        )

        const batch = writeBatch(db)
        await getDocs(queryActualizarStock)
            .then(resp => resp.docs.forEach(res => batch.update(res.ref, { stock: res.data().stock - cart.find(item => item.item.id === res.id).amount })))
            .catch(err => (err))
        batch.commit()

    }

    return (
        <div>
            <Formik
                initialValues={{ name: '', lastname: '', phone: '', email: '', emailCheck: '' }}

                validate={(values) => {
                    let errors = {};
                    if (!values.name) {
                        errors.name = 'Por favor, complete el nombre';
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                        errors.name = 'Por favor, ingrese un nombre válido, sin numeros';
                    }

                    if (!values.lastname || (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname))) {
                        errors.lastname = 'Por favor, ingrese un apellido válido que no contenga números';
                    }

                    if (!values.phone || (!/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(values.phone))) {
                        errors.phone = 'Por favor, ingrese un número de teléfono válido';
                    }

                    if (!values.email || (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email))) {
                        errors.email = 'Por favor, ingrese un mail válido'
                    }
                    if (!values.emailCheck) {
                        errors.emailCheck = 'Por favor, ingrese un mail válido'
                    } else if (values.emailCheck !== values.email) {
                        errors.emailCheck = 'Por favor, repita el mail anterior'
                    }
                    return errors
                }}

                onSubmit={(values, { resetForm }) => {
                    generateOrder(values);
                    setFormSubmmit(true);
                    handleShowBis();
                    resetForm();
                }}
            >
                {({ errors }) => (
                    <Form className="formulario text-center">

                        <div className="mb-3">
                            <label htmlFor="name" className='form-label'>Nombre</label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Ana"
                                id="name"
                                className="form-control"
                            />
                            <ErrorMessage name="name" component={() => (
                                <div className="error">{errors.name}</div>
                            )} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastname" className='form-label'>Apellido</label>
                            <Field
                                type="text"
                                name="lastname"
                                placeholder="Gonzalez"
                                id="lastname"
                                className="form-control"
                            />
                            <ErrorMessage name="lastname" component={() => (
                                <div className="error">{errors.lastname}</div>
                            )} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className='form-label'>Telefono/Celular</label>
                            <Field
                                type="number"
                                name="phone"
                                placeholder="11-2233-4455"
                                id="phone"
                                className="form-control"
                            />
                            <ErrorMessage name="phone" component={() => (
                                <div className="error">{errors.phone}</div>
                            )} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="af@gmail.com"
                                id="email"
                                className="form-control"
                            />
                            <ErrorMessage name="email" component={() => (
                                <div className="error">{errors.email}</div>
                            )} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emailCheck" className='form-label'>Email</label>
                            <Field
                                type="email"
                                name="emailCheck"
                                placeholder="af@gmail.com"
                                id="emailCheck"
                                className="form-control"
                            />
                            <ErrorMessage name="emailCheck" component={() => (
                                <div className="error">{errors.emailCheck}</div>
                            )} />
                        </div>

                        {formSubmmit && <ModalOrderComplete id={orderId} />}
                        <button type="submit" className='btn btn-warning' >Submit</button>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default ContactForm