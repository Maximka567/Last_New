// Локализация
const translations = {
    ru: {
        aboutTitle: 'Интернет магазин фигурок "Сделай сам" по игре Terraria',
        aboutText: 'Создавайте уникальные коллекционные фигурки персонажей Terraria своими руками. Наши наборы включают все необходимое для сборки и покраски.',
        productsTitle: 'Наши товары',
        modelsTitle: '3D Модели',
        orderTitle: 'Оформление заказа',
        contactsTitle: 'Контакты',
        bannerTitle: 'НОВАЯ КОЛЛЕКЦИЯ',
        bannerText: 'Ограниченный выпуск фигурок боссов Terraria с мельчайшими деталями',
        bannerBtn: 'Смотреть коллекцию',
        addToCart: 'Добавить в корзину',
        orderName: 'Ваше имя',
        orderEmail: 'Email',
        orderPhone: 'Телефон',
        orderAddress: 'Адрес доставки',
        orderProduct: 'Выберите товар',
        submitOrder: 'Оформить заказ',
        adminLogin: 'Админ',
        // ... другие переводы
    },
    en: {
        aboutTitle: 'Online store of "Do it yourself" Terraria figures',
        aboutText: 'Create unique collectible Terraria character figures with your own hands. Our kits include everything you need for assembly and painting.',
        productsTitle: 'Our Products',
        modelsTitle: '3D Models',
        orderTitle: 'Place Order',
        contactsTitle: 'Contacts',
        bannerTitle: 'NEW COLLECTION',
        bannerText: 'Limited edition Terraria boss figures with finest details',
        bannerBtn: 'View collection',
        addToCart: 'Add to cart',
        orderName: 'Your name',
        orderEmail: 'Email',
        orderPhone: 'Phone',
        orderAddress: 'Delivery address',
        orderProduct: 'Select product',
        submitOrder: 'Place order',
        adminLogin: 'Admin',
        // ... другие переводы
    }
};

// Пример товаров
let products = [
    {
        id: 1,
        name: 'Глаз Ктулху',
        description: 'Фигурка первого босса в Terraria. Высота: 12см. В комплекте детали для сборки и инструкция.',
        price: 1299,
        image: 'https://via.placeholder.com/300x200?text=Eye+of+Cthulhu'
    },
    {
        id: 2,
        name: 'Скелетрон',
        description: 'Фигурка босса Скелетрона из Terraria. Высота: 15см. В комплекте детали для сборки и инструкция.',
        price: 1499,
        image: 'https://via.placeholder.com/300x200?text=Skeletron'
    }
];

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function () {
    // Загрузка товаров
    renderProducts();

    // Настройка переключателя языка
    const langSelect = document.getElementById('langSelect');
    langSelect.addEventListener('change', function () {
        setLanguage(this.value);
    });

    // Обработка формы заказа
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Инициализация 3D просмотрщиков
    initModelViewers();
});

// Рендер товаров
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">${product.price} ₽</div>
                <button class="btn add-to-cart" data-id="${product.id}">Добавить в корзину</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Обновление выпадающего списка товаров
    updateProductSelect();
}

// Обновление списка товаров в форме заказа
function updateProductSelect() {
    const productSelect = document.getElementById('orderProduct');
    if (!productSelect) return;

    // Очищаем и добавляем только новые товары
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Установка языка
function setLanguage(lang) {
    // Обновляем текстовые элементы
    document.querySelector('.about__title').textContent = translations[lang].aboutTitle;
    document.querySelector('.about__text').textContent = translations[lang].aboutText;
    document.querySelector('#products .section-title').textContent = translations[lang].productsTitle;
    document.querySelector('#models .section-title').textContent = translations[lang].modelsTitle;
    document.querySelector('#order .section-title').textContent = translations[lang].orderTitle;
    document.querySelector('.banner__title').textContent = translations[lang].bannerTitle;
    document.querySelector('.banner__text').textContent = translations[lang].bannerText;
    document.querySelector('.banner .btn').textContent = translations[lang].bannerBtn;

    // Обновляем кнопки "Добавить в корзину"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.textContent = translations[lang].addToCart;
    });

    // Обновляем форму заказа
    document.querySelector('label[for="orderName"]').textContent = translations[lang].orderName;
    document.querySelector('label[for="orderEmail"]').textContent = translations[lang].orderEmail;
    document.querySelector('label[for="orderPhone"]').textContent = translations[lang].orderPhone;
    document.querySelector('label[for="orderAddress"]').textContent = translations[lang].orderAddress;
    document.querySelector('label[for="orderProduct"]').textContent = translations[lang].orderProduct;
    document.querySelector('#orderForm button').textContent = translations[lang].submitOrder;

    // Обновляем ссылку на админку
    document.querySelector('.admin-link').textContent = translations[lang].adminLogin;
}

// Инициализация 3D просмотрщиков
function initModelViewers() {
    // Здесь будет код для инициализации Three.js
    // Для каждого .model-viewer создаем сцену, камеру и рендерер
    console.log('3D viewers initialized');
}