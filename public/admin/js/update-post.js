// we need to create a scope because we use variables that already been declared on other js files in the admin section
// the way to do this is by {}
{
    let articlesBlock = document.querySelector('.articles');
    let titleInp = document.querySelector('#update-title');
    let textArea = document.querySelector ('#update-text');
    let id;


    articlesBlock.addEventListener("click", async function(e){
        if(e.target.classList.contains('btn-edit')){
            //get the id value from the form and ask request to the server to get the post info
            id = e.target.parentNode.parentNode.querySelector('.id').value; //we found the article tag inside of which the hidden input with class is
            //we get the data from the db thats way await
            let postInfo = await fetch('http://localhost:3000/posts/'+ id)
                        .then((resp) => resp.json())
                        .then((data) => data)
            //when data has arrived:
            titleInp.value = postInfo.title;
            textArea.value = postInfo.description;

            let articlesTab = document.getElementById("v-pills-articles");
            articlesTab.classList.remove("show");
            articlesTab.classList.remove("active");
            let updatePostTab = document.getElementById("v-pills-update-post");
            updatePostTab.classList.add("show");
            updatePostTab.classList.add("active");
        } 
    });



    let updateForm = document.querySelector('.update-post-form');

    updateForm.addEventListener('submit', function(e){
        e.preventDefault();
        //we send the updates to the server:
        fetch('http://localhost:3000/posts/'+id, {
            //we specify the method and the headers and the body(excluded in get requests)
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInp.value,
                description: textArea.value
            })
            // finally send request and reresh the page
        }).then((resp) => resp.text())
        .then(() => window,history.go());

    });

}