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
        (user.posts || []).forEach(function(post) {

            if (!post.likes) {
                post.likes = [];
            }

            if (!post.comments) {
                post.comments = [];
            }

            allPosts.push(post);

        });
    });

    allPosts.sort(function(a, b) {
        return b.time - a.time;
    });

    allPosts.forEach(function(post) {
    const liked = post.likes.includes(currentUser.userId);

    const postCard = document.createElement("div");

    postCard.className = "card shadow mb-4";

    postCard.innerHTML = `
        <div class="card-header text-white post-header">
            <h5 class="mb-0">${post.name}</h5>
            <small>${getTimeAgo(post.time)}</small>
        </div>

        <div class="card-body">
            ${post.image ? `<img src="${post.image}" class="post-image img-fluid rounded mt-2">` : ""}
            <p class="card-text">${post.content}</p>
        </div>

        <div class="card-footer bg-white">

            <div class="post-actions">

                <span class="${liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
                    ${liked ? "♥" : "♡"} ${post.likes.length} 
                </span>

                <span onclick="showComments(${post.id})">
                    💬 ${post.comments.length}
                </span>

                ${post.name === currentUser.fullName ? `
                    <span onclick="deletePost(${post.id})">
                        🗑
                    </span>
                ` : ""}

            </div>

            <div class="mt-3">
                <input type="text" id="comment-${post.id}" class="form-control" placeholder="Write a comment...">
                <button type="button" class="btn btn-post mt-2" onclick="addComment(${post.id})">Add Comment</button>
            </div>

            <div class="mt-3">
                ${(post.comments || []).map(function(comment, index) {
                    return `
                        <div class="comment-box d-flex justify-content-between align-items-start">
                            <div>
                                <strong>${comment.name}</strong>
                                <small class="comment-time">
                                    ${comment.time ? getTimeAgo(comment.time) : ""}
                                </small><br>
                                ${comment.text}
                            </div>

                            ${comment.name === currentUser.fullName ? `
                                <span class="delete-comment" onclick="deleteComment(${post.id}, ${index})">
                                    🗑
                                </span>
                            ` : ""}
                        </div>
                    `;
                }).join("")}
            </div>
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
                id: Date.now(),
                name: currentUser.fullName,
                content: postText,
                image: reader.result,
                time: Date.now(),
                likes: [],
                comments: []
            };
            posts.push(newPost);
            currentUser.posts = posts;
            localStorage.setItem("users", JSON.stringify(users));
            displayPosts();
            postInput.value = "";
            imageInput.value = "";
        };

        reader.readAsDataURL(file);
    } else {
        const newPost = {
            id: Date.now(),
            name: currentUser.fullName,
            content: postText,
            image: "",
            time: Date.now(),
            likes: [],
            comments: []
        };
        posts.push(newPost);
        currentUser.posts = posts;
        localStorage.setItem("users", JSON.stringify(users));
        displayPosts();
        postInput.value = "";
    }
});

displayPosts();

function toggleLike(postId) {
    users.forEach(function(user) {
        user.posts.forEach(function(post) {
            if (post.id === postId) {

                if (!post.likes) {
                    post.likes = [];
                }

                const alreadyLiked = post.likes.includes(currentUser.userId);

                if (alreadyLiked) {
                    post.likes = post.likes.filter(function(id) {
                        return id !== currentUser.userId;
                    });
                } else {
                    post.likes.push(currentUser.userId);
                }

            }
        });
    });

    localStorage.setItem("users", JSON.stringify(users));
    displayPosts();
}



function deletePost(postId) {

    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) {
        return;
    }

    currentUser.posts = currentUser.posts.filter(function(post) {
        return post.id !== postId;
    });

    posts = currentUser.posts;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    displayPosts();

}


function addComment(postId) {

    const commentInput = document.getElementById(`comment-${postId}`);
    const commentText = commentInput.value.trim();


    if (commentText === "") {
        alert("Empty");
        return;
    }

    users.forEach(function(user) {
        (user.posts || []).forEach(function(post) {
            if (post.id === postId) {

                if (!post.comments) {
                    post.comments = [];
                }

                post.comments.unshift({
                    name: currentUser.fullName,
                    text: commentText,
                    time: Date.now()
                });
            }
        });
    });

    localStorage.setItem("users", JSON.stringify(users));
    displayPosts();
}



function deleteComment(postId, commentIndex) {
    alert("Are you sure you want to delete the comment");
    users.forEach(function(user) {
        (user.posts || []).forEach(function(post) {
            if (post.id === postId) {
                post.comments.splice(commentIndex, 1);
            }
        });
    });

    localStorage.setItem("users", JSON.stringify(users));
    displayPosts();
}