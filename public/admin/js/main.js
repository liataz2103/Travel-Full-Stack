// all functions for the admin page

let addPostBtn = document.querySelector(".add-post-btn");
//those functions are called when admin page is loaded
//how do we know that the page is loaded?

document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    // we need to make sure that this div is empty so we can fill it
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${post.id}">
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    articles.insertAdjacentHTML('beforeend', postHTML)
    })
})

addPostBtn.addEventListener("click", function(){
    let articlesTab = document.getElementById("v-pills-articles");
    articlesTab.classList.remove("show");
    articlesTab.classList.remove("active");
    let createPostTab = document.getElementById("v-pills-create-post");
    createPostTab.classList.add("show");
    createPostTab.classList.add("active");
});