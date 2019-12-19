//all functionst to working with callback requests
// since getCallbackRequests is async and fetch is sync (wait for the response) - we need to use sync await
async function getEmails() {
    // each time this function is called a get request to the server should be sent
    return await fetch('http://localhost:3000/emails')
                    // the rsponse is a json file with the calbacks
                    .then((response) => response.json())
                    .then((data) => data);
}

let emailsBlock = document.querySelector('#v-pills-mails');
emailsBlock.addEventListener('click', function(e){
    //check if btn-rmove button was clicked (using the target propery)
    if(e.target.classList.contains('btn-remove')){
        // delete the post by its id (we find the articlae tag inside of which input with id class)
        let id = e.target.parentNode.parentNode.querySelector('.id').value; //we found the article tag inside of which the hidden input with class is
        fetch('http://localhost:3000/emails/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})