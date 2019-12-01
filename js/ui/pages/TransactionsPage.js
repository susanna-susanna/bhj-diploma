/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element) {
      throw new Error("Error in TrP. Element doesn't exist");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAcntBtn = this.element.querySelector('.remove-account');

    removeAcntBtn.addEventListener('click', () => {
      this.removeAccount();
    });

    this.element.addEventListener('click', (event) => {
      let removeTrnsActn = event.target.closest('.transaction__remove');
      if (removeTrnsActn) {
        this.removeTransaction(removeTrnsActn.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    if(!confirm('Вы действительно хотите удалить счет?')) {
      return;
    }
    Account.remove(this.lastOptions.account_id, {}, (err, response) => {
      if (response && response.success) {
        this.clear();
        App.update();
      } else {
        console.log("Error in RemoveAccount", err);
      }
    });
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id, {}, (err, response) => {
        if (response && response.success) {
          App.update();
        } else {
          console.log("Error in RemoveTransaction", err);
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (!options) {
      return;
    }
    if (!options.account_id) {
      return;
    }
    this.lastOptions = options;

    Account.get(options.account_id, {}, (err, response) => {
      if (response) {
        this.renderTitle(response.data.name);
      } else {
        console.log('Error1 in render', err)
      }
    });

    Transaction.list(options, (err, response) => {
      if (response.data) {
        this.renderTransactions(response.data);
      } else {
        console.log('Error2 in render', err);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let newData = new Date(date);
    let day = newData.getDate();
    let months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];
    let month = months[newData.getMonth()];
    let year = newData.getFullYear();
    let hours = newData.getHours();
    let minutes = newData.getMinutes();

    function upTime(number) {
      if (number < 10) {
        return '0' + number;
      } else {
        return number;
      }
    }
    return `${day} ${month} ${year} г. в ${upTime(hours)} ${upTime(minutes)}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    const id = item.id;
    const type = item.type;
    const name = item.name;
    const date = this.formatDate(item.created_at);
    const sum = item.sum;
    return `
      <div class="transaction transaction_${type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${name}</h4>
              <div class="transaction__date">${date}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
              ${sum} <span class="currency">$</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = this.element.querySelector('.content');
    if (data) {
      content.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        content.innerHTML += this.getTransactionHTML(data[i]);
      }
    }

  }
}
