// we need to create event listener to post handlers, but since posts are generated dynamically we can not attache event listener directly to them
// we do it by event delegation (adding the event listener to an element that exist in the page in which the posts are generated dynamically)
let articlesBlock = document.querySelector('.articles');
articlesBlock.addEventListener('click', function(e){
    //check if btn-rmove button was clicked (using the target propery)
    if(e.target.classList.contains('btn-remove')){
        // delete the post by its id (we find the articlae tag inside of which input with id class)
        let id = e.target.parentNode.parentNode.querySelector('.id').value; //we found the article tag inside of which the hidden input with class is
        fetch('http://localhost:3000/posts/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})