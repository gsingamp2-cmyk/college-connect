const userData = JSON.parse(localStorage.getItem("user"));

if (userData) {
    document.getElementById("email").value = userData.email;
}

console.log(userData);

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {

    const profileData = {
        email: document.getElementById("email").value,
        branch: document.getElementById("branch").value,
        year: document.getElementById("year").value,
        college: document.getElementById("college").value,
        about: document.getElementById("about").value
    };

    console.log(profileData);

    localStorage.setItem("profile", JSON.stringify(profileData));

    window.location.href = "../home page/index.html";
});