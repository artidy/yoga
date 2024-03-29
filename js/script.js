window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {            
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {  
                    hideTabContent(0);                  
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    //timer

    let deadline = '2019-09-09';

    function getTimeRemaining(endtime) {
        let t = Date.parse(deadline) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*60));

            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(udateClock, 1000);

        function udateClock() {
            let t = getTimeRemaining(endtime);
           
            if (t.total < 0) {
                clearInterval(timeInterval);
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
            else {
                hours.textContent = (t.hours < 10) ? "0" + t.hours : t.hours;
                minutes.textContent = (t.minutes < 10) ? "0" + t.minutes : t.minutes;
                seconds.textContent = (t.seconds < 10) ? "0" + t.seconds : t.seconds;
            }
        }
    }

    setClock('timer', deadline);

    // modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        btnDescr = document.querySelectorAll('.description-btn');

    function modalOpen(btn) {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        btn.classList.add('more-splash');
    }

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        for (let i = 0; i < btnDescr.length; i++) {
            btnDescr[i].classList.remove('more-splash');
        } 
        document.body.style.overflow = '';
    });

    more.addEventListener('click', function() {
        modalOpen(this);        
    });
    
    for (let i = 0; i < btnDescr.length; i++) {
        btnDescr[i].addEventListener('click', function() {
            modalOpen(this);
        });
    }
    
    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }

        addDiv(message) {
            let divBlock = document.createElement('div');
            divBlock.textContent = message;
            divBlock.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}; text-align: ${this.textAlign};`;
            document.body.appendChild(divBlock);
        }
    }

    // Form
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо, скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        statusMessage = document.createElement('div'),
        formContact = document.getElementById('form');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        sendRequest(form, event);
    });

    formContact.addEventListener('submit', function(event) {
        sendRequest(formContact, event);
    });

    function sendRequest(formRequest, event) {
        event.preventDefault();
        formRequest.appendChild(statusMessage);
        let input = formRequest.querySelectorAll('input');
        let formData = new FormData(formRequest);

        let jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });
        let json = JSON.stringify(jsonData);                    

        function sendData(json) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                
                request.onreadystatechange = function() {
                    if (request.readyState < 4) {
                        resolve();                
                    }
                    else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    }
                    else {
                        reject();
                    }                    
                };  
                request.send(json);          
            });             
        }       

        sendData(json)
                .then(() => { statusMessage.innerHTML = message.loading; })
                .then(() => { statusMessage.innerHTML = message.success; })
                .catch(() => { statusMessage.innerHTML = message.failure })
                .then(() => { clearInput(); });

             
        function clearInput() {
            input.forEach(function(value, key) {
                input[key].value = '';
            });
        }        
    }

    // slider
    let slideIndex = 0,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlide();
    setInterval(() => {changeSlide(1);}, 5000);
    
    function showSlide() {
        slides.forEach((item) => {item.style.display = 'none';});
        dots.forEach((item) => {item.classList.remove('dot-active');});
        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('dot-active');
    }

    function changeSlide(nextSlide) {
        slideIndex += nextSlide;

        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }

        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        showSlide();
    }

    function currentSlide(slideNumber) {
        slideIndex = slideNumber;
        showSlide();
    }

    prev.addEventListener('click', () => {changeSlide(-1);});
    next.addEventListener('click', () => {changeSlide(1);});
    dotsWrap.addEventListener('click', function(event) {
        if (event.target.classList.contains('dot')) {
            for (let i = 0; i < slides.length; i++) {
                if (event.target == dots[i]) {
                    currentSlide(i);
                }
            }
        }
    });

    // calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        days = document.querySelectorAll('.counter-block-input')[1],
        places = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        placeValue = +places[0].value;

    totalValue.innerHTML = `0$`;
    persons.value = '';
    days.value = '';
    places.options.selectedIndex = 0;
    
    persons.addEventListener('change', function() {
        personsSum = +this.value;
        countTotal();        
    });

    days.addEventListener('change', function() {
        daysSum = +this.value;
        countTotal();
    });

    places.addEventListener('change', function() {
        placeValue = +this.options[this.selectedIndex].value;
        countTotal();
    });

    function countTotal() {
        totalValue.innerHTML = (personsSum == 0 || daysSum == 0 || isNaN(personsSum) || isNaN(daysSum)) ? `0$` : `${personsSum * daysSum * placeValue}$`;
    }
});