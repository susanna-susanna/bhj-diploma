/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error("Error1 in TrW.Element doesn't exist");
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomBtn =  this.element.querySelector('.create-income-button');
    const expenseBtn = this.element.querySelector('.create-expense-button');
    console.log(this);
    
    incomBtn.addEventListener('click', function() {
      const newIncome = App.getModal('newIncome');
      newIncome.open();
    });

    expenseBtn.addEventListener('click', function() {
      const newExpense = App.getModal('newExpense');
      newExpense.open();
    });
  }
}
