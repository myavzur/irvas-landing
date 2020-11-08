const timer = (daysSelector, hoursSelector, minutesSelector, secondsSelector, deadLine) => {    
    function getRemainingTime() {
        const t = Date.parse(deadLine) - Date.parse(new Date()),
          seconds = Math.floor(t / 1000) % 60, // 123seconds % 60 = 2min 3sec = 2.3 = 0.3sec => return 3 sec
          minutes = Math.floor((t / 1000) / 60) % 60,
          hours = Math.floor((t / 1000) / 60 / 60) % 24,
          days = Math.floor((t / 1000) / 60 / 60 / 24);

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
    }

    function setTimer() {
        const days = document.querySelector(daysSelector),
              hours = document.querySelector(hoursSelector),
              minutes = document.querySelector(minutesSelector),
              seconds = document.querySelector(secondsSelector),

              timerId = setInterval(updateTimer, 1000);

        function updateTimer() {
            const t = getRemainingTime();

            if (t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timerId);
            } 
            else {
                days.textContent = addZero(t.days);
                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);
            }
        }
        updateTimer(); // init timer
    }
    setTimer();

    function addZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
};

export default timer;