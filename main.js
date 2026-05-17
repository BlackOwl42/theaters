// Плавная прокрутка к секции "Топ-3"
document.addEventListener('DOMContentLoaded', function() {
    // Находим ссылку "Топ-3 в 2026"
    const top3Link = document.querySelector('a[href="#top3"]');
    
    // Если ссылка существует
    if (top3Link) {
        top3Link.addEventListener('click', function(event) {
            event.preventDefault(); // Отменяем стандартное поведение
            
            // Находим секцию с id="top3"
            const top3Section = document.getElementById('top3');
            
            // Если секция существует
            if (top3Section) {
                top3Section.scrollIntoView({
                    behavior: 'smooth', // Плавная прокрутка
                    block: 'start' // Выравнивание по верху
                });
            }
        });
    }
});
// Плавная прокрутка к секции "Кто мы?"
const whoLink = document.querySelector('a[href="#who"]');

if (whoLink) {
    whoLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        const whoSection = document.getElementById('who');
        
        if (whoSection) {
            whoSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}
// Плавная прокрутка к секции "Контакты"
const contactsLink = document.querySelector('a[href="#contacts"]');

if (contactsLink) {
    contactsLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        const contactsSection = document.getElementById('contacts');
        
        if (contactsSection) {
            contactsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Переход на страницу театров по ссылке "Театры" в навигации
document.addEventListener('DOMContentLoaded', function() {
    const theatersLink = document.querySelector('a[href="#"]');
    
    // Находим именно ссылку "Театры" (третья в навигации)
    const navLinks = document.querySelectorAll('.header__nav a');
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Театры') {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = 'theaters.html';
            });
        }
    });
});

// Переход на страницу театров по кнопке "Хочу в театр!"
document.addEventListener('DOMContentLoaded', function() {
    const theaterButton = document.querySelector('.about__button');
    
    if (theaterButton) {
        theaterButton.addEventListener('click', function() {
            window.location.href = 'theaters.html';
        });
    }
});

// Переходы по ссылкам на спектакли из карточек Топ-3
document.addEventListener('DOMContentLoaded', function() {
    // Создаем массив с данными о спектаклях
    const spectacles = [
        {
            title: 'Бесы',
            link: 'https://goteatr.ru/repertuar/besy/'
        },
        {
            title: 'Три',
            link: 'https://www.vmtheatre.ru/tri'
        },
        {
            title: 'Квадрат',
            link: 'https://teatrpanova.ru/shows/ploxoi-teatr-spektakl-kvadrat-sankt-peterburg'
        }
    ];
    
    // Находим все карточки спектаклей
    const cards = document.querySelectorAll('.spectacle-card');
    
    cards.forEach(card => {
        // Находим название спектакля в карточке
        const titleElement = card.querySelector('.spectacle-card__title');
        
        if (titleElement) {
            const cardTitle = titleElement.textContent.trim();
            
            // Ищем совпадение в массиве
            const spectacle = spectacles.find(s => s.title === cardTitle);
            
            if (spectacle) {
                // Делаем всю карточку кликабельной
                card.style.cursor = 'pointer';
                
                // Добавляем эффект при наведении
                card.addEventListener('mouseenter', function() {
                    const image = card.querySelector('.spectacle-card__image');
                    if (image) {
                        image.style.transform = 'scale(1.03)';
                        image.style.transition = 'transform 0.3s ease';
                    }
                    card.style.opacity = '0.9';
                    card.style.transition = 'opacity 0.3s ease';
                });
                
                card.addEventListener('mouseleave', function() {
                    const image = card.querySelector('.spectacle-card__image');
                    if (image) {
                        image.style.transform = 'scale(1)';
                    }
                    card.style.opacity = '1';
                });
                
                // Открываем ссылку при клике
                card.addEventListener('click', function() {
                    window.open(spectacle.link, '_blank');
                });
            }
        }
    });
});