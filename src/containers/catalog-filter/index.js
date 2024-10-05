import { memo, useCallback, useEffect, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import { sortCategoriesList } from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.getAllCategories();
  }, []);

  const select = useSelector(state => ({
    categoriesList: state.catalog.categories,
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    query: state.catalog.params.query,
  }));

  const categoriesList = sortCategoriesList(select.categoriesList);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // фильтр по категории
    onFilterCategory: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    categories: useMemo(
      () => [
        { value: '', title: 'Все' },
        ...categoriesList.map(category => {
          return { value: category._id, title: category.title };
        }),
      ],
      [select.categoriesList],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onFilterCategory}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        theme={'big'}
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
