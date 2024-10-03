import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {
  initState() {
    return {
      isLogged: false,
      userData: {},
      error: null,
      token: '',
    };
  }

  /**
   * @return {Promise<void>}
   */

  async signIn({ login, password }) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();
    if (json.result) {
      const userInfo = json.result;
      localStorage.setItem('X-Token', json.result.token);

      // Пользователь загружен успешно
      this.setState({
        userData: userInfo.user,
        isLogged: true,
      });
    }

    if (json.error) {
      const err = json.error;
      console.log(err);
      this.setState({
          userData: {},
          error: err.message,
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
      console.log(this.error);
    }
  }

  async logout() {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('X-Token'),
      },
    });

    this.setState({
      userData: {},
      isLogged: false,
    });
    localStorage.removeItem('X-Token');
  }
}

export default UserState;
