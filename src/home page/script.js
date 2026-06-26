console.log("Home Page Loaded");

const loggedInUser = localStorage.getItem("loggedInUser");

const users = JSON.parse(localStorage.getItem("users")) || [];

const currentUser = users.find(function(user) {
    return user.userId === loggedInUser;
});

if (currentUser) {
    document.getElementById("welcomeText").textContent =
        `Welcome, ${currentUser.fullName} 👋`;
}






const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const imageInput = document.getElementById("imageInput");
const feedContainer = document.getElementById("feedContainer");

let posts = currentUser.posts;





function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) {
        return "Just now";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
}

function displayPosts() {
    feedContainer.innerHTML = "";
    let allPosts = [];
    users.forEach(function(user) {
        user.posts.forEach(function(post) {
            allPosts.push(post);
        });
    });
    allPosts.sort(function(a, b) {
        return b.time - a.time;
    });
    allPosts.forEach(function(post) {
        const postCard = document.createElement("div");
        postCard.className = "card shadow mb-4";
        postCard.innerHTML = `
            <div class="card-header text-white" style="background-color:#8B2E2E;">
                <h5 class="mb-0">${post.name}</h5>
                <small>${getTimeAgo(post.time)}</small>
            </div>
            <div class="card-body">
                ${post.image ? `<img src="${post.image}" class="post-image img-fluid rounded mt-2">` : ""}
                <p class="card-text">${post.content}</p>
            </div>
        `;
        feedContainer.appendChild(postCard);
    });
}


postBtn.addEventListener("click", function() {
    const postText = postInput.value.trim();
    if (postText === "") {
        alert("Please enter a post");
        return;
    }
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const newPost = {
                name: currentUser.fullName,
                content: postText,
                image: reader.result,
                time: Date.now()
            };
            posts.push(newPost);
            currentUser.posts = posts;
            localStorage.setItem("users", JSON.stringify(users));
            displayPosts();
            postInput.value = "";
            imageInput.value = "";
        };
        reader.readAsDataURL(file);
    }
    else {
        const newPost = {
            name: currentUser.fullName,
            content: postText,
            image: "",
            time: Date.now()
        };
        posts.push(newPost);
        currentUser.posts = posts;
        localStorage.setItem("users", JSON.stringify(users));
        displayPosts();
        postInput.value = "";
    }
    posts.push(newPost);
    currentUser.posts = posts;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayPosts();
    postInput.value = "";
});

displayPosts();