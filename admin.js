document.addEventListener('DOMContentLoaded', function () {
    // Проверка авторизации
    checkAuth();

    // Настройка табов
    setupTabs();

    // Обработка формы добавления товара
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function (e) {
            e.preventDefault();
            addProduct();
        });
    }

    // Обработка формы обновления модели
    const updateModelForm = document.getElementById('updateModelForm');
    if (updateModelForm) {
        updateModelForm.addEventListener('submit', function (e) {
            e.preventDefault();
            updateModel();
        });
    }

    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Кнопка входа
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }

    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }
});

// Проверка авторизации
function checkAuth() {
    console.log(localStorage.getItem('adminAuthenticated'));
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');

    if (isAuthenticated) {
        if (adminLogin) adminLogin.classList.add('hidden');
        if (adminPanel) adminPanel.classList.remove('hidden');
        renderAdminProducts();
    } else {
        if (adminLogin) adminLogin.classList.remove('hidden');
        if (adminPanel) adminPanel.classList.add('hidden');
    }
}

// Вход в админку
function login() {
    const password = document.getElementById('adminPassword').value;
    const correctPassword = '11111';

    if (password === correctPassword) {
        localStorage.setItem('adminAuthenticated', 'true');
        checkAuth(); // Обновляем интерфейс без перезагрузки
    } else {
        alert('Неверный пароль');
    }
}

// Выход из админки
function logout() {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = 'index.html';
}

// Настройка табов
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Удаляем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Добавляем активный класс текущей кнопке и соответствующему контенту
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

// Добавление товара
function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDesc').value;
    const price = document.getElementById('productPrice').value;
    const imageFile = document.getElementById('productImage').files[0];

    if (!name || !description || !price || !imageFile) {
        alert('Заполните все поля');
        return;
    }

    // В реальном приложении здесь была бы загрузка на сервер
    // Для демо просто добавляем в массив

    const newProduct = {
        id: products.length + 1,
        name,
        description,
        price: parseInt(price),
        image: URL.createObjectURL(imageFile)
    };

    products.push(newProduct);

    // Очищаем форму
    document.getElementById('addProductForm').reset();

    // Обновляем список товаров
    renderAdminProducts();

    alert('Товар успешно добавлен!');
}

// Рендер товаров в админке
function renderAdminProducts() {
    const productsList = document.getElementById('adminProductsList');
    if (!productsList) return;

    productsList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-admin-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price} ₽</strong></p>
            <button class="btn btn-outline delete-product" data-id="${product.id}">Удалить</button>
        `;
        productsList.appendChild(productCard);
    });

    // Назначаем обработчики удаления
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

// Удаление товара
function deleteProduct(id) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        products = products.filter(product => product.id !== id);
        renderAdminProducts();
    }
}

// Обновление 3D модели
function updateModel() {
    const modelId = document.getElementById('modelSelect').value;
    const title = document.getElementById('modelTitle').value;
    const description = document.getElementById('modelDesc').value;
    const modelFile = document.getElementById('modelFile').files[0];

    if (!title || !description || !modelFile) {
        alert('Заполните все поля');
        return;
    }

    // В реальном приложении здесь была бы загрузка на сервер
    // Для демо просто выводим сообщение

    alert(`Модель ${modelId} обновлена!`);
    document.getElementById('updateModelForm').reset();
}