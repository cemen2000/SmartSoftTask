document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const secondname = document.getElementById('second name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name.length < 3) {
    Swal.fire({
        icon: 'error',
        title: 'Ошибка валидации',
        text: 'Имя должно быть не менее 3 символов',
        confirmButtonText: 'Понятно'
    });
    return;
}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка валидации',
            text: 'Введите корректный email',
            confirmButtonText: 'Понятно'
        });
    }

    if (message.length < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка валидации',
            text: 'Сообщение должно быть заполнено',
            confirmButtonText: 'Понятно'
        });
        return;
    }
    fetch('http://127.0.0.1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
    })

    .then(response => response.json())
    .then(data => {
        console.log('Отправлено:', data);
        Swal.fire({
            icon: 'success',
            title: 'Форма успешно отправлена!',
            confirmButtonText: 'OK'
        });
    })

   .catch(error => {
    console.error('Ошибка:', error);
    Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: `Произошла ошибка при отправке формы: ${error.message}`,
        confirmButtonText: 'Понятно'
    });
});


        
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const terms = document.getElementById('terms').checked;
    const customername = document.getElementById('customer-name').value.trim();
    const address = document.getElementById('delivery-address').value.trim();
    const comment = document.getElementById('comment').value.trim();
    // Проверка обязательных полей
    if (!customername || !terms) {
         Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: `Нужно обязательн заполнить имя и подтвердить условия`,
        confirmButtonText: 'Понятно'
         })
        return;
    }
    Swal.fire({
        title: 'Создание заказа',
        text: `Имя: ${name}
        Адресс доставки: ${address},
        Комментарий к заказу: ${comment}`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
});
async function loadReviews() {
  try {
    const response = await fetch('reviews.json'); 
    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error('Ошибка при загрузке отзывов:', error);
    return [];
  }
}
function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviews');

  reviews.forEach((review, index) => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
      
    const icon = document.createElement('div');
    icon.classList.add('review-icon');
    icon.textContent = index + 1;
      
    const title = document.createElement('h3');
    title.classList.add('review-title');
    title.textContent = review.title;
      
    const body = document.createElement('p');
    body.classList.add('review-body');
    body.textContent = review.body;
      
    reviewElement.appendChild(icon);
    reviewElement.appendChild(title);
    reviewElement.appendChild(body);
    reviewsContainer.appendChild(reviewElement);
  });
}

// Главная функция
async function init() {
  const reviews = await loadReviews();
  displayReviews(reviews);
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', init);
})
