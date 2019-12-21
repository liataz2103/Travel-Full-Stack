
let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', function(e){
    e.preventDefault
    // get the eamail and pass from the form
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;
    // send them to server
    fetch('http://localhost:3000/users/login', {
        // specify method unless its get
        method: 'POST',
        // withCredentials: true,
        // credentials: 'include'
        // specify headers
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        // 2 arrow func: 1: get resp as argument and transfer it to text format
    }).then((resp) => {
        if(resp.status == 400) {
            return new Error();
        }
        // since data.redirecturl is an object so no text in this case
        return resp.json();
    }).then((data) =>{
            window.location.href = data.redirectURL;
        }).catch(() => alert('Wrong email or password'));
});

registerForm.addEventListener('submit', function(e){
    e.preventDefault
    // get details from form
    let email = document.querySelector('#register-email').value;
    console.log(email);
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#re-enter-register-password').value;
    // check if re-entered the same password
    if(password !== rePassword){
        return;
    }
    // otherwise send them to server
    fetch('http://localhost:3000/users/register', {
        // specify method unless its get
        method: 'POST',
        // specify headers
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email, 
            password: password
        })
        // 2 arrow func: 1: get resp as argument and transfer it to text format
    }).then((resp)=> resp.text()).then((data)=>alert(data));
})