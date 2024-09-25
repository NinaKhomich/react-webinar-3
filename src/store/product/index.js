import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      item: {},
      itemCountry: '',
      itemCategory: '',
    };
  }

  async getProductById(_id) {
    const response = await fetch(
      `api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
        itemCategory: json.result.category,
        itemCountry: json.result.madeIn,
      },
      'Загружен товар byID из АПИ',
    );
  }
}

export default Product;
