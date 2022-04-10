import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const data = {
   firstDelay: Number(form.elements.delay.value),
    step: Number(form.elements.step.value),
    amount: Number(form.elements.amount.value),
  };

  promiseGenerator(data);
}

function promiseGenerator({ firstDelay, step, amount }) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, firstDelay}) => {
        Notiflix.Notify.success(`This is a FULFILL of promise #${position} with ${firstDelay}ms delay`);
      })
      .catch(({ position, firstDelay }) => {
        Notiflix.Notify.failure(`This is a REJECT of promise #${position} with ${firstDelay}ms delay`);
      });

   firstDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
}