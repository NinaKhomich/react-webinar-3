import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Subhead from './components/subhead';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const totalCost = store.getTotalCost(cartList);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItemToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),
  };

  const onOpenCart = () => {
    setIsCartOpen(true);
  };

  const onCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Subhead onOpenCart={onOpenCart} totalCost={totalCost} cartList={cartList} />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
      <Modal isOpen={isCartOpen}>
        <Cart
          list={cartList}
          onDeleteItem={callbacks.onDeleteItem}
          onCloseCart={onCloseCart}
          totalCost={totalCost}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
