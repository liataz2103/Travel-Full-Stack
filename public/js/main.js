let callMeForm = document.querySelector('.call-me-form');

document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    // we need to make sure that this div is empty so we can fill it
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
        <div class="col-4">	
        <div class="card">
            <img class="card-img-top" src="${post.imageURL}" alt="${post.title}">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a href="/sight?id=${post._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;
    articles.insertAdjacentHTML('beforeend', postHTML)
    });
});

callMeForm.addEventListener('submit', function (e){
    e.preventDefault();
    let phoneImp = callMeForm.querySelector('input');
    console.log(phoneImp);
    // send the server the data from the form
    fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneImp.value
        })
    }).then((resp) => resp.text()).then(() => alert('We will call you back as soon as possible'));
})