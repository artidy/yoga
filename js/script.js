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
    
});