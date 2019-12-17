let createForm = document.querySelector(".create-post-form");
let createTitle = document.querySelector("#create-title");
let createCountry = document.querySelector("#create-country");
let createImageURL = document.querySelector("#create-image-URL");
let createText = document.querySelector("#create-text");
let createImageFile = document.querySelector("#create-image-file"); // we get the files as array

// The event listener for binary infor to transfer 
createForm.addEventListener("submit", function(e){
    e.preventDefault();
    let text = createText.value;
    // in our case we have the possibility to add image as file (instead of url) so we need to create a data object rateher use json
    let data = new FormData(); // created an empty object
    data.append('title', createTitle.value);
    data.append('country', createCountry.value);
    data.append('imageUrl', createImageURL.value);
    data.append('text', text.value);
    data.append('description', text.substring(0, text.indexOf('.') + 1));
    data.append('imageFile', createImageFile.files[0]);

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
        //when we get the response from the server we need to convert it to text, use it and refresh the page so it display immediately 
    }).then((response) => response.text()).then((data) => window.history.go());
});

// function that make sure we use only one of the options (adding image via url / file)
function disableInput(input1, input2){
    if (input1.value){
        input2.disabled = true;
    }else{
        input2.disabled = false;
    }
}

createImageURL.addEventListener('change', function() {disableInput(this, createImageFile)});
createImageFile.addEventListener('change', function() {disableInput(this, createImageURL)});



// the event listener for text format to transfer (in this case we use JSON)
// for the event submit the browser has default event handler that we need to disabele
// createForm.addEventListener("submit", function(e){
    //prevent default event handler for submit
    // e.preventDefault();
   
    //take all inputs from the form and send it to the server as post request that the srever will then transfer to db
    // fetch('http://localhost:3000/posts', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         title: createTitle.value, 
    //         country: createCountry.value,
    //         imageUrl:createImageURL.value,
    //         text: text,
    //         description: text.substring(0, text.indexOf('.') + 1)
    //     })
        //when we get the response from the server we need to convert it to text, use it and refresh the page so it display immediately 
//     }).then((response) => response.text()).then((data) => window.history.go());
// });