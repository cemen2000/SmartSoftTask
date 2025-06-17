document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Проверка минимальной длины имени
    if (name.length < 3) {
        alert('Имя должно быть не менее 3 символов');
        return;
    }

    // Проверка валидности почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Введите корректный email');
        return;
    }

    // AJAX запрос
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
        alert('Форма отправлена успешно!');
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы');
    });
});

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('customer-name').value.trim();
    const terms = document.getElementById('terms').checked;

    // Проверка обязательных полей
    if (!name || !terms) {
        alert('Заполните все обязательные поля');
        return;
    }

    // Отображение SweetAlert
    Swal.fire({
        title: 'Создание заказа',
        text: `Имя: ${name}`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

fetch('https://cemen2000.github.io/SmartSoftTask/reviews.json') 
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const reviewElement = createReview(item.name, item.review);
            reviewContainer.appendChild(reviewElement);
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки отзывов:', error);
    });
