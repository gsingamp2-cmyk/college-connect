const userId = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

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

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
        savedUser &&
        userIdValue === savedUser.userId &&
        passwordValue === savedUser.password
    ) {
        alert("Login Successful");
        window.location.href = "../home page/index.html";
    } else {
        alert("Invalid User ID or Password");
    }
});