/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error("Error1 in M.Element doesn't exist");
    } 
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const closeModals = this.element.querySelectorAll('[data-dismiss="modal"]');
    //console.log(Array.isArray(closeModals));
    for (let closeModal of closeModals) {
      closeModal.addEventListener('click', this.onClose.bind(this));
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault();
    this.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const deleteModals = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (let deleteModal of deleteModals) {
      deleteModal.removeEventListeber('click', this.onClose.bind(this));
    }
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = 'none';
  }
}


