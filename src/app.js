import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const totalCost = store.getTotalCost(cartList);

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

  return (

    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls />
      <List
        list={list}
        onAddItemToCart={callbacks.onAddItemToCart}
      />
      <Head title="Cart" />
      <Cart
        list={cartList}
        onDeleteItem={callbacks.onDeleteItem}
        totalCost={totalCost}
      />
    </PageLayout>
  );
}

export default App;
