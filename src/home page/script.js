console.log("Home Page Loaded");


const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const feedContainer = document.getElementById("feedContainer");

postBtn.addEventListener("click", function(){

    const postText = postInput.value.trim();

    if(postText === ""){
        alert("Please enter a post");
        return;
    }

    const postCard = document.createElement("div");

    postCard.className = "card p-3 mb-3";

    postCard.innerHTML = `
        <h5>Govardhan</h5>
        <p class="text-muted">Just now</p>
        <p>${postText}</p>
    `;

    feedContainer.prepend(postCard);

    postInput.value = "";

});