import StoreModule from '../module';

/**
 * Детальная информация о пользователе для страницы профиля
 */
class UserState extends StoreModule {
  initState() {
    return {
      userData: {},
      waiting: false,
    };
  }

  /**
   * @return {Promise<void>}
   */

  async loadUserData(token) {

    this.setState({
      userData: {},
      waiting: true,
    });

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
          waiting: false,
        },
        'Загружен пользователь из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        userData: {},
        waiting: false,
      });
    }
  }
}

export default UserState;
