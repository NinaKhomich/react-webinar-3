import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.pageLimit = 10;
  }

  initState() {
    return {
      list: [],
      totalPages: 0,
      currentPage: 1,
      paginationArray: [],
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=${this.pageLimit}&skip=0&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / this.pageLimit),
      },
      'Загружены товары из АПИ',
    );
  }

  async paginate(number) {
    const response = await fetch(
      `/api/v1/articles?limit=${this.pageLimit}&skip=${(number - 1) * this.pageLimit}`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        currentPage: number,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
