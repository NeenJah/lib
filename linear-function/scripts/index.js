'use strict';

const PATTERN_POINT = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
const inputRules = [
  {
    rule: 'required',
      errorMessage: 'Поле обязательно для заполнения'
  },
];
const linearForm = document.forms.linearForm;
const btnSubmit = document.querySelector('#js-linear-form-submit');
const x1InputEl = document.forms.linearForm.x1;
const z1InputEl = document.forms.linearForm.z1;
const x2InputEl = document.forms.linearForm.x2;
const z2InputEl = document.forms.linearForm.z2;
const xResult = document.forms.linearForm.xResult;
const zResult = document.forms.linearForm.zResult;

const validator = new JustValidate(document.forms.linearForm, {
    validateBeforeSubmitting: true,
});

validator.
addField(x1InputEl, inputRules).
addField(z1InputEl, inputRules).
addField(x2InputEl, inputRules).
addField(z2InputEl, inputRules);

function onResetResultInput(event) {
    if(!event.target.classList.contains('js-result')) return;
    
    event.target == xResult ? zResult.value = '' : xResult.value = '';
    
    linearForm.removeEventListener('input', onResetResultInput);
    
    console.log('input!');
}

function roundToThree(num) {
    return Number(num.toFixed(3));
}

function onLinearFormSubmit(event) {
    let x = 0;
    let z = 0;
    validator.eventListeners[0].func(event);
    const {
        isValid
    } = validator;
    const {
        x1: { value: x1 },
        z1: { value: z1 },
        x2: { value: x2 },
        z2: { value: z2 },
        xResult: { value: xResult },
        zResult: { value: zResult },
    } = linearForm;
    
    const k = roundToThree(( z2 - z1 ) / ( x2 - x1 ));
    const b = roundToThree(z1 - k * x1);

    if(!xResult && !zResult) return;
    
    if(!xResult) {
      z = zResult;
      x = roundToThree(( z - b )/k);
    } else {
      x = xResult;
      z = roundToThree(k * x + b);
    }
    linearForm.xResult.value = x;
    linearForm.zResult.value = z;
    
    linearForm.addEventListener('input', onResetResultInput);
}

linearForm.addEventListener('submit', onLinearFormSubmit);