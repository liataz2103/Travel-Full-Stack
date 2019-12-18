//all functionst to working with callback requests
// since getCallbackRequests is async and fetch is sync (wait for the response) - we need to use sync await
async function getCallbackRequests() {
    // each time this function is called a get request to the server should be sent
    return await fetch('http://localhost:3000/callback-requests')
                    // the rsponse is a json file with the calbacks
                    .then((response) => response.json())
                    .then((data) => data);
}