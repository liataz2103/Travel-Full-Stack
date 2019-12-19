// all functions for the admin page

let addPostBtn = document.querySelector(".add-post-btn");
//those functions are called when admin page is loaded
//how do we know that the page is loaded?

document.addEventListener('DOMContentLoaded', async function(){
    addPosts();
    addCallbackRequests();
    addEmails();
})

addPostBtn.addEventListener("click", function(){
    let articlesTab = document.getElementById("v-pills-articles");
    articlesTab.classList.remove("show");
    articlesTab.classList.remove("active");
    let createPostTab = document.getElementById("v-pills-create-post");
    createPostTab.classList.add("show");
    createPostTab.classList.add("active");
});

async function addPosts(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    // we need to make sure that this div is empty so we can fill it
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${post._id}">
            <div class="name w30">${post.title}</div>
            <div class="date w30">${post.date}</div>
            <div class="country w20">${post.country}</div>
            <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        </article>`;
    articles.insertAdjacentHTML('beforeend', postHTML)
    })
}

async function addCallbackRequests(){
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-callBack');
    // we need to make sure that this div is empty so we can fill it
    requestsBlock.innerHTML = '';
    let i =1;
    requests.forEach((request) => {
        let requestHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${request._id}">
            <div class="name w60">${request.phoneNumber}</div>
            <div class="date w30">${request.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        </article>`;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML)
    })
}

async function addEmails(){
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails');
    // we need to make sure that this div is empty so we can fill it
    emailsBlock.innerHTML = '';
    let i =1;
    emails.forEach((email) => {
        let requestHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${email._id}">
            <div class="name w30">${email.name}</div>
            <div class="date w30">${email.email}</div>
            <div class="date w30">${email.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
            <div class="date w100">${email.text}</div>
            
        </article>`;
        emailsBlock.insertAdjacentHTML('beforeend', requestHTML)
    })

}