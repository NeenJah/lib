'use strict';

const PATTERN_POINT = /^\d+\.?\d*,\d+\.?\d*$/;
const linearForm = document.forms.linearForm;
const btnSubmit = document.querySelector('#js-linear-form-submit');
const point1 = document.forms.linearForm.point1;
const point2 = document.forms.linearForm.point2;
const xResult = document.forms.linearForm.xResult;
const zResult = document.forms.linearForm.zResult;

const validator = new JustValidate(document.forms.linearForm, {
    validateBeforeSubmitting: true,
});

validator.
addField(point1, [{
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения!',
    },
    {
        rule: 'customRegexp',
        value: PATTERN_POINT,
    },
]).addField(point2, [{
        rule: 'required',
    },
    {
        rule: 'customRegexp',
        value: PATTERN_POINT,
    },
]);

function linearFormSubmit(event) {
    let x = 0;
    let z = 0;
    validator.eventListeners[0].func(event);
    const {
        isValid
    } = validator;
    const {
        point1: { value: point1 },
        point2: { value: point2 },
        xResult: { value: xResult },
        zResult: { value: zResult },
    } = linearForm;
    
    const [ x1, z1 ] = point1.split(',').map(e => Number(e));
    const [ x2, z2 ] = point2.split(',').map(e => Number(e));
    const k = ( z2 - z1 ) / ( x2 - x1 );
    const b = z1 - k * x1;

    if(!xResult && !zResult) return;
    
    if(!xResult) {
      z = zResult;
      x = ( b - z )/k;
    } else {
      x = xResult;
      z = k * x + b;
    }
    linearForm.xResult.value = x;
    linearForm.zResult.value = z;
}

linearForm.addEventListener('submit', linearFormSubmit);