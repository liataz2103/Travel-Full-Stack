let emailRequestForm = document.querySelector(".email-request-form");
emailRequestForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            name: document.querySelector('#name').value,
            text: document.querySelector('#message').value,
        })
    }).then((resp) => resp.text()).then((data) => console.log(data));
})