document.querySelector('.submit').addEventListener('click', formSubmitted);
const ui = new UI();
const http = new EasyHttp();

function formSubmitted(e) {
    const name = document.querySelector('.name');
    const email = document.querySelector('.email');
    const message = document.querySelector('.message');

    if(name.value === '' || email.value === '') {
        ui.paint('Please enter values in the required fields.');
    } else {
        const data = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        http.post('/contact', data)
        .then((res) => {
            if(res === 201) {
                ui.paint(`Hey ${name.value}, I am excited to get in touch with you!!`);
                name.value = '';
                email.value = '';
                message.value = '';
            } else if(res === 400) {
                ui.paint('Please provide a valid email id.')
            }
        }).catch((err) => {
            console.log(err)
        })  
    }

    e.preventDefault();
}