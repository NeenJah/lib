'use strict';

const linearForm = document.forms.linearForm;
const btnSubmit = document.querySelector('#js-linear-form-submit');
const point1 = document.forms.linearForm.point1;
const point2 = document.forms.linearForm.point2;
const xResult = document.forms.linearForm.xResult;
const zResult = document.forms.linearForm.zResult;
const patternPoint = /^\d+\.?\d*,\d+\.?\d*$/;

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
        value: patternPoint,
    },
]).addField(point2, [{
        rule: 'required',
    },
    {
        rule: 'customRegexp',
        value: patternPoint,
    },
]);

function linearFormSubmit(event) {
    validator.eventListeners[0].func(event);
    const {
        isValid
    } = validator;
    const [x1, z1] = document.forms.linearForm.point1.value.split(',');
    const [x2, z2] = document.forms.linearForm.point2.value.split(',');

    alert(isValid);

}

linearForm.addEventListener('submit', linearFormSubmit);