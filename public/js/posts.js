//all functionst tp working with posts
// since getPosts is async and fetch is sync (wait for the response) - we need to use sync await
async function getPosts() {
    // each time this function is called a get request to the server should be sent
    return await fetch('http://localhost:3000/posts')
                    .then((response) => response.json())
                    .then((data) => data);
}