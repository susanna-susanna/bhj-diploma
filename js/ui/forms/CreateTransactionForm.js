/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm{
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let accountsSelect = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      if (response.data) {
        accountsSelect.innerHTML = '';
        response.data.forEach(element => {
          accountsSelect.innerHTML += `<option value="${element.id}">${element.name}</option>`;
        });
      } else {
        console.log("Error in CTF. did not receive a list of accounts", err)
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        const type = options.data.type;
        const modalName = 'new' + type[0].toUpperCase() + type.substr(1);
        let transaction = App.getModal(modalName);
        transaction.close();
        App.update();
      } else {
        console.log("Error. Did not create transaction", err)
      }
    });
  }
}
