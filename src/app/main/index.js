import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageLimit: state.catalog.pageLimit,
    totalCount: state.catalog.totalCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.product.item,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //  Переход по страницам каталога
    paginate: useCallback(number => store.actions.catalog.paginate(number), [store]),
    // получение товара по id
    getProduct: useCallback(_id => store.actions.product.getProductById(_id), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} getProduct={callbacks.getProduct} />;
      },
      [callbacks.addToBasket, callbacks.getProduct],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalItems={select.totalCount}
        itemsPerPage={select.pageLimit}
        onPageChange={callbacks.paginate}
      />
    </PageLayout>
  );
}

export default memo(Main);
