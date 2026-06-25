const userId = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const eyeIcon = document.getElementById("eyeIcon");
let isPinned = false;


eyeIcon.addEventListener("mouseenter", function () {
    if (!isPinned) {
        passwordInput.type = "text";
    }
});
eyeIcon.addEventListener("mouseleave", function () {
    if (!isPinned) {
        passwordInput.type = "password";
    }
});
eyeIcon.addEventListener("click", function () {
    isPinned = !isPinned;
    if (isPinned) {
        passwordInput.type = "text";
        eyeIcon.classList.remove("bi-eye");
        eyeIcon.classList.add("bi-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("bi-eye-slash");
        eyeIcon.classList.add("bi-eye");
    }
});



loginBtn.addEventListener("click", function () {

    const userIdValue = userId.value;
    const passwordValue = passwordInput.value;

    if (userIdValue === "") {
        alert("Please enter User ID");
        return;
    }

    if (passwordValue === "") {
        alert("Please enter Password");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedInUser = users.find(function(user) {
        return (
            user.userId === userIdValue &&
            user.password === passwordValue
        );
    });
    if (loggedInUser) {
        // Temporary (for compatibility with current pages)
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        // New system
        localStorage.setItem("loggedInUser", loggedInUser.userId);
        alert("Login Successful");
        window.location.href = "../home page/index.html";
    } else {
        alert("Invalid User ID or Password");
    }
});