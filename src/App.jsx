import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

import Cart from './components/container/Cart/Cart';
import ItemDetailContainer from './components/container/ItemDetailContainer/ItemDetailContainer';
import CartContextProvider from './context/CartContextProvider';
import ItemListContainer from './components/container/ItemListContainer/ItemListContainer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <div className="App container-fluid">
          <header className="App-header ">
            <NavBar />
          </header>
          <Routes>
            <Route index path='/' element={<ItemListContainer />} />
            <Route path='/categoria/:idCategory' element={<ItemListContainer />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/carrito' element={<Cart />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;