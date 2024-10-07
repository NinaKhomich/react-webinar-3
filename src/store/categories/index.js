import StoreModule from '../module';

/**
 * Состояние списка категорий
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  async getAllCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    this.setState(
      {
        categories: json.result.items,
      },
      'Загружен список категорий из АПИ',
    );
  }
}

export default CategoriesState;
