import { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Product from '../../components/product';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function ProductPage() {
  const store = useStore();

  const select = useSelector(state => ({
    item: state.product.item,
    itemCountry: state.product.itemCountry,
    itemCategory: state.product.itemCategory,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Product
        item={select.item}
        itemCountry={select.itemCountry.title}
        itemCategory={select.itemCategory.title}
        addToBasket={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(ProductPage);
