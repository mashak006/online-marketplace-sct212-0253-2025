function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function showNotification(message, type) {
    let notificationArea = document.getElementById('notificationArea');
    let notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    notificationArea.innerHTML = '';
    notificationArea.appendChild(notification);

    setTimeout(function() {
        notification.style.opacity = '0';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

if (document.getElementById('registerForm')) {
    let form = document.getElementById('registerForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value;

        if (name === '') {
            showNotification('Please enter your name', 'error');
            return;
        }

        if (email === '') {
            showNotification('Please enter your email', 'error');
            return;
        }

        if (!email.includes('@')) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password === '') {
            showNotification('Please enter a password', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        setCookie('userName', name, 7);
        showNotification('Registration successful! Redirecting...', 'success');

        setTimeout(function() {
            window.location.href = 'product.html';
        }, 1500);
    });
}

if (window.location.pathname.includes('product.html')) {
    let userName = getCookie('userName');

    if (!userName) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('welcomeMessage').textContent = 'Welcome, ' + userName + '!';
    }

    let cloths = [
        { name: 'round nake tshirt', price: 'Ksh 3,200', image: 'images/tshirt.jpg' },
        { name: 'polokragen sweatshirt', price: 'Ksh 3,200', image: 'images/sweatshirt.jpg' },
        { name: 'sneaker MR530', price: 'Ksh 5,500', image: 'images/sneaker.jpg' },
        { name: 'summer denim jorts short', price: 'Ksh 3,000', image: 'images/jorts.jpg' },
        { name: 'vintaje loose straight jeans', price: 'Ksh 2,000', image: 'images/jeans.jpg' },
        { name: 'fashionable hiphop cap', price: 'Ksh 1,500', image: 'images/cap.jpg' },
        { name: 'vintaje loose straight jeans', price: 'Ksh 2,000', image: 'images/jeans.jpg' },
        { name: 'fashionable hiphop cap', price: 'Ksh 1,500', image: 'images/cap.jpg' },

    ];

    function displayProducts(productsToShow) {
        let grid = document.getElementById('productsGrid');
        grid.innerHTML = '';

        productsToShow.forEach(function(cloth) {
            let card = document.createElement('div');
            card.className = 'product-card';

            let imageContainer = document.createElement('div');
            imageContainer.className = 'product-image';

            if (cloth.image) {
                let img = document.createElement('img');
                img.src = cloth.image;
                img.alt = cloth.name;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';


                img.onerror = function() {
                    imageContainer.innerHTML = '';
                    imageContainer.textContent = 'Image Not Found';
                };

                imageContainer.appendChild(img);
            } else {
                imageContainer.textContent = 'Image Placeholder';
            }

            let info = document.createElement('div');
            info.className = 'product-info';

            let name = document.createElement('div');
            name.className = 'product-name';
            name.textContent = cloth.name;

            let price = document.createElement('div');
            price.className = 'product-price';
            price.textContent = cloth.price;

            info.appendChild(name);
            info.appendChild(price);
            card.appendChild(imageContainer);
            card.appendChild(info);
            grid.appendChild(card);
        });
    }

    displayProducts(cloths);

    let searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        let searchTerm = searchInput.value.toLowerCase();
        let filtered = cloths.filter(function(cloth) {
            return cloth.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filtered);
    });
}