import { createContext, useState } from "react";
import swal from '@sweetalert/with-react';


export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartList')));

  //agregar producto al carrito
  const addToCart = (product) => {
    let newCart = [];

    if (isInCart(product.item.id)) {
      let prod = cart.find((i) => i.item.id === product.item.id);
      prod.amount += product.amount;
      newCart = [...cart];
    } else {
      newCart = [...cart, product];
    }

    setCart(newCart);
    saveAtLocalStorage('cartList', newCart)
  }

  //guardar en LocalStorage
  const saveAtLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  //encontrar producto en el carrito
  const isInCart = (id) => {
    return cart.find((item) => item.item.id === id) ? true : false;
  };

  //eliminar producto del carrito
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.item.id !== id));
    saveAtLocalStorage('cartList', cart.filter((item) => item.item.id !== id));
  };

  //resetear carrito
  const resetCart = () => {
    setCart([]);
    saveAtLocalStorage('cartList', []);
  }

  //vaciar carrito con SWAL
  const emptyCart = () => {
    swal({
      title: "Estás seguro?",
      text: "Una vez vaciado, deberás seleccionar los productos nuevamente!",
      icon: "warning",
      buttons: ["Cancelar", "Sí!"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          swal("El carrito ha sido eliminado", {
          icon: "success",
          buttons: false,
          timer: 2000,
         });
        setTimeout(() => {
          resetCart()
        }, 1000);
       } else {
         swal("Tu carrito está a salvo!", {
          buttons: false,
          timer: 2000,
        });
      }
    });
  };


  //total de compra
  const totalPrice = () => {
    return cart.reduce((acumPrice, prod) => acumPrice + (prod.amount * prod.item.price), 0)
  }

  //cantidad total de productos
  const totalAmount = () => {
    return cart.reduce((counter, prod) => counter += prod.amount, 0)
  }

  //Modal Form
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Modal OrderComplete
  const [showBis, setShowBis] = useState(false);
  const handleShowBis = () => setShowBis(true);
  const handleCloseBis = () => setShowBis(false);

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      addToCart,
      resetCart,
      emptyCart,
      deleteItem,
      totalAmount,
      totalPrice,
      show,
      handleShow,
      handleClose,
      showBis,
      handleShowBis,
      handleCloseBis
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider