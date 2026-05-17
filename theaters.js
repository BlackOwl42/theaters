// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Находим все карточки театров в верхнем блоке
    const theaterCards = document.querySelectorAll('.theater-card');
    
    // Находим все детальные секции театров
    const theaterDetails = document.querySelectorAll('.theater-detail');
    
    // Создаем соответствие между названиями театров и их секциями
    const theaterMap = new Map();
    
    theaterDetails.forEach(detail => {
        const heading = detail.querySelector('.theater-detail__heading');
        if (heading) {
            // Очищаем текст от HTML и лишних пробелов
            const theaterName = heading.textContent.trim().replace(/\s+/g, ' ');
            theaterMap.set(theaterName, detail);
        }
    });
    
    // Функция для плавной прокрутки к элементу
    function scrollToTheater(detailElement) {
        if (detailElement) {
            const headerOffset = 0; // Можно добавить смещение, если нужно
            const elementPosition = detailElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Функция для нормализации названия (убираем переносы строк и лишние пробелы)
    function normalizeName(name) {
        return name.replace(/\s+/g, ' ').trim();
    }
    
    // Добавляем обработчики для каждой карточки
    theaterCards.forEach(card => {
        const titleElement = card.querySelector('.theater-card__title');
        if (titleElement) {
            const cardTitle = normalizeName(titleElement.textContent);
            
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function() {
                // Ищем соответствующую детальную секцию
                let targetDetail = null;
                
                for (let [name, detail] of theaterMap) {
                    const normalizedName = normalizeName(name);
                    if (normalizedName === cardTitle) {
                        targetDetail = detail;
                        break;
                    }
                }
                
                // Если не нашли по точному совпадению, пробуем частичное совпадение
                if (!targetDetail) {
                    for (let [name, detail] of theaterMap) {
                        const normalizedName = normalizeName(name);
                        if (normalizedName.includes(cardTitle) || cardTitle.includes(normalizedName)) {
                            targetDetail = detail;
                            break;
                        }
                    }
                }
                
                scrollToTheater(targetDetail);
            });
            
            // Добавляем эффект наведения
            card.addEventListener('mouseenter', function() {
                const image = card.querySelector('.theater-card__image img');
                if (image) {
                    image.style.transform = 'scale(1.05)';
                    image.style.transition = 'transform 0.3s ease';
                }
                const title = card.querySelector('.theater-card__title');
                if (title) {
                    title.style.opacity = '0.8';
                    title.style.transition = 'opacity 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = card.querySelector('.theater-card__image img');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                const title = card.querySelector('.theater-card__title');
                if (title) {
                    title.style.opacity = '1';
                }
            });
        }
    });
    
    // Дополнительно: анимация появления детальных секций при скролле
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за детальными секциями театров
    theaterDetails.forEach(detail => {
        observer.observe(detail);
    });
    
    // Добавляем обработчик для кнопки "Вернуться на главную"
    const homeButton = document.querySelector('.menu-button--home');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Обработчик для кнопок "Хочу сюда!" с data-атрибутами
    const actionButtons = document.querySelectorAll('.theater-detail__button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Находим родительскую секцию и берем из нее ссылку
            const parentSection = button.closest('.theater-detail');
            const link = parentSection.getAttribute('data-booking-link');
            
            if (link && link !== '#') {
                window.open(link, '_blank');
            } else {
                console.warn('Ссылка не указана для этого театра');
                alert('Ссылка на бронирование временно недоступна');
            }
        });
    });
}); //

    // Обработчик для адресов театров (и картинка, и текст кликабельны) - Яндекс Карты
    const theaterAddresses = document.querySelectorAll('.theater-detail__right');
    
    theaterAddresses.forEach(block => {
        const addressImage = block.querySelector('.theater-detail__image--right img');
        const addressText = block.querySelector('.theater-detail__address');
        
        // Пропускаем "Плохой театр" (у него нет картинки с адресом, а текст особенный)
        const isBadTheater = block.closest('.theater-detail')?.querySelector('.theater-detail__address-box');
        
        if (!isBadTheater && addressText) {
            const address = addressText.textContent.replace('Адрес:', '').trim();
            // Формируем ссылку для Яндекс Карт
            const mapLink = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
            
            function openMap() {
                window.open(mapLink, '_blank');
            }
            
            // Делаем кликабельной картинку
            if (addressImage) {
                addressImage.style.cursor = 'pointer';
                addressImage.style.transition = 'transform 0.3s ease';
                
                addressImage.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                addressImage.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
                
                addressImage.addEventListener('click', openMap);
            }
            
            // Делаем кликабельным текст адреса
            addressText.style.cursor = 'pointer';
            addressText.style.transition = 'opacity 0.3s ease';
            
            addressText.addEventListener('mouseenter', function() {
                this.style.opacity = '0.7';
                this.style.textDecoration = 'underline';
            });
            
            addressText.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
                this.style.textDecoration = 'none';
            });
            
            addressText.addEventListener('click', openMap);
        }
    });

    // Переход на главную страницу
document.addEventListener('DOMContentLoaded', function() {
    // По кнопке "Камерные театры Петербурга"
    const chambersButton = document.querySelector('.menu-button--chambers');
    if (chambersButton) {
        chambersButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // По кнопке "Вернуться на главную"
    const homeButton = document.querySelector('.menu-button--home');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});