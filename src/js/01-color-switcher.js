
const refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]')
};

refs.buttonStart.setAttribute('style',
    'position:relative;top:100px;left:300px;height:50px;width:75px');
refs.buttonStop.setAttribute('style',
    'position:relative;top:100px;left:350px;height:50px;width:75px');    

let timerId = null;

refs.buttonStart.addEventListener("click", () => {
    refs.buttonStart.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
      refs.body.setAttribute(`style`, `background-color: ${getRandomHexColor()}`);
     
  }, 1000);
});


refs.buttonStop.addEventListener("click", () => {
     refs.buttonStart.removeAttribute('disabled', 'disabled');
  clearInterval(timerId);
  refs.body.removeAttribute(`style`, `background-color: ${getRandomHexColor()}`);
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

