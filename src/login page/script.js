const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");

let isPinned = false;

// Hover: show password temporarily
eyeIcon.addEventListener("mouseenter", function () {
    if (!isPinned) {
        passwordInput.type = "text";
    }
});

// Hover out: hide password again
eyeIcon.addEventListener("mouseleave", function () {
    if (!isPinned) {
        passwordInput.type = "password";
    }
});

// Click: permanently toggle
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





const userId=document.getElementById("userId");
const loginBtn=document.getElementById("loginBtn");

loginBtn.addEventListener("click",function(){
    const userIdValue=userId.value;
    const passwordValue=passwordInput.value;

    if (userIdValue === "") {
        alert("Please enter User ID");
        return;

    }
    if (passwordValue === "") {
        alert("Please enter Password");
        return;
    }

    alert("Login Successful");

    window.location.href="../home page/index.html";
})