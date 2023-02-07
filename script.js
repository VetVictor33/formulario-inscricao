const nameInput = document.querySelector('#input-name');
const emailInput = document.querySelector('#input-email');
const birthInput = document.querySelector('#input-birth');
const password = document.querySelector('#password');
const select = document.getElementById('test-city');
const checkboxes = document.getElementsByClassName('checkbox');
const radios = document.querySelectorAll('input[type = radio]');
const submit = document.querySelector('button');

const warning = document.querySelectorAll('.warning');

let invalidName = true;
let invalidEmail = true;
let invalidBirth = true;
let invalidPassword = true;

let checkedRadio;

function resetFields() {
    nameInput.value = '';
    emailInput.value = '';
    birthInput.value = '';
    password.value = ''
    select.selectedIndex = 0;

    for (const radio of radios) {
        radio.checked = false;
    }

    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkbox.checked = false;
        }
    }

};

nameInput.addEventListener('change', (event) => {
    const value = event.target.value;

    if (value.indexOf(" ") === -1) {
        warning[0].style.display = 'block';
    }

    else {
        warning[0].style.display = 'none';
        invalidName = false;
    }

});

emailInput.addEventListener('change', (event) => {
    const value = event.target.value;

    if (value.indexOf('@') === -1) {
        warning[1].style.display = 'block';
    }

    else {
        warning[1].style.display = 'none';
        invalidEmail = false;
    }

});

birthInput.addEventListener('change', (event) => {
    const value = event.target.value;

    if (isNaN(value) || value.length != 4) {
        warning[2].style.display = 'block';
    }

    else {
        warning[2].style.display = 'none';
        invalidBirth = false;
    }
});

select.addEventListener('change', (event) => {
    const selectedIndex = select.selectedIndex;
    const selected = select.options[selectedIndex].value;
    if (selected === 'empty') {
        warning[3].style.display = 'block';
    }

    else {
        warning[3].style.display = 'none';
    }

});

for (const radio of radios) {
    radio.addEventListener('change', () => {
        warning[4].style.display = 'none'
    })
};

password.addEventListener('change', (event) => {
    const value = event.target.value;

    if (value.length < 8 || value.length > 16) {
        warning[5].style.display = 'block';
    }

    else {
        warning[5].style.display = 'none';
        invalidPassword = false;
    }

});

submit.addEventListener('click', (event) => {
    event.preventDefault();
    let error = false;

    if (invalidName) {
        warning[0].style.display = 'block';
        error = true;
    }

    if (invalidEmail) {
        warning[1].style.display = 'block';
        error = true;
    }

    if (invalidBirth) {
        warning[2].style.display = 'block';
        error = true;
    }

    const selectedIndex = select.selectedIndex;
    const selected = select.options[selectedIndex].value;

    if (selected === 'empty') {
        warning[3].style.display = 'block';
        error = true;
    }

    else {
        warning[3].style.display = 'none';
    }

    let checked = false;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            checked = true;
            checkedRadio = radios[i];
            i = radios.length;
        }
    }

    if (!checked) {
        error = true;
        warning[4].style.display = 'block';
    }

    if (invalidPassword) {
        error = true;
        warning[5].style.display = 'block';
    }


    if (error) {
        alert('Preencha todos os campos obrigatórios!');
    }

    else {
        const data = {
            name: nameInput.value,
            email: emailInput.value,
            birth: birthInput.value,
            testPlace: select.options[selectedIndex].value,
            testPeriod: checkedRadio.id,
            courses: [],
            password: password.value
        }

            ;

        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                data.courses.push(checkbox.name)
            }
        }

        alert('Formulário enviado com sucesso!');
        resetFields();
        console.log(data)
    }
});