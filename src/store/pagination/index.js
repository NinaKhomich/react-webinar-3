import StoreModule from '../module';

class Pagination extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.pageLimit = 10;
  }

  initState() {
    return {
      pageItems: [],
      currentPage: 1,
      pageLimit: this.pageLimit,
      pageNumberState: [],
    };
  }

  async paginate(number) {
    const response = await fetch(
      `/api/v1/articles?limit=${this.pageLimit}&skip=${(number - 1) * this.pageLimit}`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        pageItems: json.result.items,
        currentPage: number,
      },
      'Загружены товары из АПИ',
    );
  }

  getPaginationState(totalPages, currentPage) {
    let state = [];
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      if (
        pageNumber == 1 ||
        pageNumber == totalPages ||
        (pageNumber <= currentPage + 1 && pageNumber >= currentPage - 1) ||
        (currentPage <= 3 && pageNumber <= 3) ||
        (currentPage >= 53 && pageNumber >= 53)
      ) {
        state.push({ state: 'button', pageNumber: pageNumber });
      } else {
        if (
          (currentPage == 1 && pageNumber == currentPage + 3) ||
          (currentPage != 1 && pageNumber == currentPage + 2) ||
          (currentPage == totalPages && pageNumber == currentPage - 3) ||
          (currentPage != totalPages && pageNumber == currentPage - 2)
        ) {
          state.push({ state: 'dots', pageNumber: pageNumber });
        }
      }
    }
    this.setState({
      ...this.getState(),
      pageNumberState: state,
    });
  }
}

export default Pagination;
