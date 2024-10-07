import StoreModule from '../module';

/**
 * Детальная информация о проверке авторизации, входе в профиль и выходе из него
 */
class AuthState extends StoreModule {
  initState() {
    return {
      isLogged: false,
      currentUserData: {},
      error: null,
      location: null,
    };
  }

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
        ...this.getState(),
        currentUserData: userInfo.user,
        isLogged: true,
      });
    }

    if (json.error) {
      const err = json.error;
      this.setState({
        ...this.getState(),
        currentUserData: {},
        error: err.data.issues.map(item => item.message),
        isLogged: false,
      });
    }
  }

  async checkToken() {
    const token = localStorage.getItem('X-Token');
    if (token) {
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
            ...this.getState(),
            currentUserData: json.result,
            isLogged: true,
          },
          'Загружен пользователь из АПИ',
        );
      } catch (e) {
        this.setState({
          ...this.getState(),
          isLogged: false,
        });
      }
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
      ...this.getState(),
      currentUserData: {},
      isLogged: false,
    });
    localStorage.removeItem('X-Token');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }

  setLocation(location) {
    this.setState({
      ...this.getState(),
      error: null,
      location: location,
    });
  }
}

export default AuthState;
