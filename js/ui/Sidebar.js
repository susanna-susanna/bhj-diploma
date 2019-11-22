/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('body');
    const burger = document.querySelector('[data-toggle="push-menu"]');

    burger.addEventListener('click', function() {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuLogin = document.querySelector('.menu-item_login');
    const menuRegister = document.querySelector('.menu-item_register');
    const menuLogout = document.querySelector('.menu-item_logout');

    menuLogin.addEventListener('click', () => {
      const enterModal = App.getModal( 'login' );
      enterModal.open();
    });

    menuRegister.addEventListener('click', () => {
      const registerModal = App.getModal('register');
      registerModal.open();
    });

    menuLogout.addEventListener('click', () => {
      User.logout({}, (err, response) => {
        if (response && response.success === true) {
          App.setState('init');
          User.unsetCurrent();
        } else {
          console.log("Error1 in SB");
        }
      });
    });
  }

}


