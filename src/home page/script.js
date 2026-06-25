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
    posts.slice().reverse().forEach(function(post) {
        const postCard = document.createElement("div");
        postCard.className = "card p-3 mb-3";
        postCard.innerHTML = `
            <h5>${post.name}</h5>
            <p class="text-muted">${getTimeAgo(post.time)}</p>
            <p>${post.content}</p>
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
    const newPost = {
        name: currentUser.fullName,
        content: postText,
        time: Date.now()
    };
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