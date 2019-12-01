/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
if (!element) {
  throw new Error("Error_1 in AsyncForm. Element doesn't exist");
}
this.element = element;
this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', event => {
      if (this.element.checkValidity()) {
        event.preventDefault();
        this.submit();
      }
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let dataForm = {};
    let formData = new FormData(this.element);
    //console.log(Array.isArray(formData.entries()));

    for (let item of formData.entries()) {
      let key = item[0];
      let value = item[1];
      dataForm[key] = value;
    }
    return dataForm;
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let options = {};
    options.url = this.element.getAttribute('action');
    options.method = this.element.method;
    options.data = this.getData();
    this.onSubmit(options);
  }
}
