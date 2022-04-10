import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('input'),
    buttonStart: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};
let chosenDay;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDay = selectedDates[0];
   
    if (selectedDates[0] - Date.now() < 0) {
      
      Notiflix.Notify.info('Please choose a date in the future');
      refs.buttonStart.disabled = true;
        // window.alert("Please choose a date in the future");
          return;
      }
    refs.buttonStart.disabled = false;
    
  },
};

flatpickr("#datetime-picker", options);

// const a = options.onClose()
// console.log(a)

let timerId = null;
// console.log(refs.input);
// console.log(refs.buttonStart);
// console.log(refs.days);
// console.log(refs.hours);
// console.log(refs.minutes);
// console.log(refs.seconds);




const onClickStart = () => {
    refs.input.setAttribute('disabled', 'true');
    refs.buttonStart.setAttribute('disabled', 'true');
    
  

    
    timerId = setInterval(() => {

       if (chosenDay - Date.now() <= 0 ) {
         clearInterval(timerId);
        //  markUpChange(0, 0, 0, 0);
         return;
         
      }
              const rizultTime = convertMs(chosenDay - Date.now());
      markUpChange(rizultTime);
      console.log(chosenDay - Date.now())
      
    }, 1000);

  
    // if(new Date()>= 1){window.alert("Please choose a date in the future");}
}
 refs.buttonStart.addEventListener('click', onClickStart); 





// console.log(options.onClose())

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function markUpChange({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
   return String(value).padStart(2,'0')
}
