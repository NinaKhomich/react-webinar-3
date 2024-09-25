import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Controls from '../../components/controls';
// import Pagination from '../../components/pagination';

function ProductPage() {
  const store = useStore();

  const select = useSelector(state => ({
    item: state.product.item,
    itemCountry: state.product.itemCountry,
    itemCategory: state.product.itemCategory,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // useEffect(() => {
  //   store.actions.catalog.load();
  // }, []);
  const itemId = select.item._id;

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(itemId => store.actions.basket.addToBasket(itemId), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div>
        <p>{select.item.description}</p>
        <p>Страна производитель: <span>{select.itemCountry.title}</span></p>
        <p>Категория: <span>{select.itemCategory.title}</span></p>
        <p>Год выпуска: <span>{select.item.edition}</span></p>
        <p>{`Цена: ${select.item.price}`}</p>
      </div>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </PageLayout>
  );
}

export default memo(ProductPage);
