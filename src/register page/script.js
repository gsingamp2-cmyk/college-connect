const registerBtn = document.querySelector(".btn-register");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const userId = document.getElementById("userId");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const userIdError = document.getElementById("userIdError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

registerBtn.addEventListener("click", function () {

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    userIdError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    const name = fullName.value.trim();
    const mail = email.value.trim();
    const userid = userId.value.trim();
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    // Full Name Validation
    if (name === "") {
        nameError.textContent = "Please enter your full name";
        isValid = false;
    }

    // Email Validation
    if (mail === "") {
        emailError.textContent = "Please enter your email";
        isValid = false;
    }
    else if (!mail.includes("@") || !mail.includes(".")) {
        emailError.textContent = "Please enter a valid email";
        isValid = false;
    }

    // User ID Validation
    if (userid === "") {
        userIdError.textContent = "Please enter a user ID";
        isValid = false;
    }

    // Password Validation
    if (passwordValue === "") {
        passwordError.textContent = "Please enter a password";
        isValid = false;
    }
    else if (passwordValue.length < 6) {
        passwordError.textContent = "Password must contain at least 6 characters";
        isValid = false;
    }

    // Confirm Password Validation
    if (confirmPasswordValue === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        isValid = false;
    }

    // Password Match Validation
    if (
        passwordValue !== "" &&
        confirmPasswordValue !== "" &&
        passwordValue !== confirmPasswordValue
    ) {
        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;
    }

    // Success
    if (isValid) {

    const userData = {
        fullName: fullName.value,
        email: email.value,
        userId: userId.value,
        password: password.value
    };

    localStorage.setItem("user", JSON.stringify(userData));

    window.location.href = "../profile page/index.html";
}
});