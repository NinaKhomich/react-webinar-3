import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Product from '../../components/product';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import MainMenu from '../../components/main-menu';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const store = useStore();
  const {itemId} = useParams();

  useEffect(() => {
    store.actions.product.getProductById(itemId);
  }, []);

  const select = useSelector(state => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  console.log(select.item);
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product.item.title} />
      <MainMenu onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Product
        item={select.product.item}
        itemCountry={select.product.itemCountry.title}
        itemCategory={select.product.itemCategory.title}
        addToBasket={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(ProductPage);
