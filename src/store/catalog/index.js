import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalPages: 0,
    };
  }

  async load(pageLimit) {
    const response = await fetch(
      `/api/v1/articles?limit=${pageLimit}&skip=0&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / pageLimit),
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
