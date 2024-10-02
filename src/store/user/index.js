import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {
  initState() {
    return {
      isLogged: false,
      userData: {},
      error: '',
      token: '',
    };
  }

  /**
   * @return {Promise<void>}
   */

  async signIn({ login, password }) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();
      const userInfo = json.result;
      localStorage.setItem('X-Token', json.result.token);

      // Пользователь загружен успешно
      this.setState({
        userData: userInfo.user,
        isLogged: true,
      });
    } catch (e) {
      this.setState({
        error: e.message,
        isLogged: false,
      });
    }
  }

  async checkToken(token) {
    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      const json = await response.json();
      console.log(json.result, 'checkToken');

      // Пользователь загружен успешно
      this.setState(
        {
          userData: json.result,
          isLogged: true,
        },
        'Загружен пользователь из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        error: e.message,
        isLogged: false,
      });
      console.log(this.isLogged);
    }
  }
}

export default UserState;
