window.addEventListener('DOMContentLoaded', () => {

  // TAB
  

  // Находим
  let tabs = document.querySelectorAll('.tabheader__item'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsParent = document.querySelector('.tabheader__items');

  // Прячем все табы
  function hideTabContent() {
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });

    tabsContent.forEach((item) => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });
  }

  // Показываем сонтент таба по его номеру в массиве
  function showTabContent(i = 0) {
    // Делаем контент i таба видимым
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    // Делает таб i видимым
    tabs[i].classList.add('tabheader__item_active');
  }

  // Обработчик по клику
  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    // Если на объект можно кликнуть и клик объект является табом
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        // Если клик по определённому табу
        if (target == item) {
          // Прячем контент  всех табов
          hideTabContent();
          // Показываем таб по индексу массива
          showTabContent(i);        
        }});
      }});

  
  hideTabContent();
  showTabContent();

  // TIMER
  // Дата до которой идёт отсчёт
  const deadline = '2022-12-31';

  // Высчитываем время (разницу, д., ч., м., с.)
  // Принимает дату конца таймера
  function getTimeRemaining(endtime) {
    let seconds, minutes, hours, days;
    const t = Date.parse(endtime) - Date.parse(new Date());

    // Если время таймера вышло - присвоить его значениям 0
    if(t <=0 ) {
      // Сюда можно подставить любой код в зависимости от задачи (например добавить вывеску, что акция завершена)
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24) );
      hours = Math.floor( t / (1000 * 60 * 60) % 24 - 3);
      minutes = Math.floor( (t / 1000 / 60) % 60);
      seconds  = Math.floor( (t / 1000) % 60);
    }
  
    return {
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  // Вставляем в HTML данные таймера
  // Принимает тег таймера HTML  и дату окончания таймера
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours =  timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds  = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    // Запускаем сразу, чтобы не было задержки
    updateClock();

    // Добавляем в значение счётчика 0, если числа таймера < 10
    // Принимает значение которому нужно добавить 0
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
    
    // Вставляем в HTML данные таймера
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
  
    // Остановка таймера при исходе времени
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  // Вызов таймера
  setClock('.timer', deadline);

  // Модальное окно 
  const modal = document.querySelector('.modal'),
        modalCloseBtn = modal.querySelector('[data-modalCloseBtn]'),
        modalOpenBtns = document.querySelectorAll('[data-modalOpenBtn]');

  // Функция открытия модального окна
  function openModal() {
    modal.classList.toggle('show');
      document.body.style.overflow = 'hidden';
  }
  
  // Даём каждой кнопке обработкик на открытие модального окна
  modalOpenBtns.forEach((btn) => {    
  btn.addEventListener('click', ()=> {
    openModal();
  });
});

  // Функция закрытия модального окна
  function closeModal() {
      modal.classList.toggle('show');
      document.body.style.overflow = '';
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modalCloseBtn.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Функция открытия модального окна
  function showModalByScroll() {
    // Если прокрутка сверху + видимая область клиента >= Всей проскроливаемой части документа
    if (window.pageYOffset + document.documentElement.clientHeight >=  document.documentElement.scrollHeight - 1) {
      // Открываем модальное окно
      openModal();
      // Удаляем обработчик события 
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // Используем CLASS для создания элементов 

  class MenuCard{
    constructor(src, alt, title, descr, price, parentElement, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr= descr;
      this.price= price;
      this.parent = document.querySelector(parentElement);
      this.classes = classes;
      this.priceCourse = 27;
      this.element = 'menu__item';
      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.priceCourse;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        element.classList.add(this.element);
      } else {
        this.classes.push('menu__item');
        this.classes.forEach(className => element.classList.add(className));
      }
      

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    ".menu .container",
    'big'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню 'Премиум'",
    "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню 'Премиум'",
    "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    19,
    ".menu .container"
  ).render();

  // FORMS

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      // Весь код который в сейчас в комментарии - это код для сервера, который работает
      // в JSON формате. Его нужно разкмоментировать и закомментировать request.send(formData);
      // request.setRequestHeader('Content-Type', 'applictaion/json');
      const formData = new FormData(form);

      // const object = {};
      // formData.forEach(function(keys, value) {
      //  object[key] = value;
      // };)
      // const json = JSON.stringify(object);
      // 
      // request.send(json);
      request.send(formData);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;          
        }
      });
    });
  }

});



















