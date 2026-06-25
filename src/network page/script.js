console.log("Network Page Loaded");
const users = JSON.parse(localStorage.getItem("users")) || [];
const studentsContainer = document.getElementById("studentsContainer");
const searchInput = document.getElementById("searchInput");

displayUsers(users);

function displayUsers(usersList) {
    studentsContainer.innerHTML = "";
    usersList.forEach(function(user) {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
            <div class="card student-card shadow-sm h-100">
                <div class="card-body">
                    <h4>${user.fullName}</h4>
                    <p class="text-muted">
                        ${user.profile.branch}
                    </p>
                    <p>
                        <strong>Year:</strong>
                        ${user.profile.year}
                    </p>
                    <p>
                        <strong>College:</strong>
                        ${user.profile.college}
                    </p>
                    <div class="mt-3">
                        <strong>Skills</strong>
                        <div class="mt-2">
                            ${
                                user.skills.length > 0
                                ?
                                user.skills.map(function(skill) {
                                    return `
                                        <span class="badge bg-primary me-1 mb-1">
                                            ${skill}
                                        </span>
                                    `;
                                }).join("")
                                :
                                `<span class="text-muted">No skills added</span>`
                            }
                        </div>
                    </div>
                    <button
                        class="btn btn-primary mt-3" onclick="viewProfile('${user.userId}')">
                        View Profile
                    </button>
                </div>
            </div>
        `;
        studentsContainer.appendChild(card);
    });

}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase().trim();
    const filteredUsers = users.filter(function(user) {
        const name = user.fullName.toLowerCase();
        const branch = (user.profile.branch || "").toLowerCase();
        const college = (user.profile.college || "").toLowerCase();
        const skills = (user.skills || []).join(" ").toLowerCase();
        const year = (user.profile.year || "").toLowerCase();
        return (
            name.includes(searchText) ||
            branch.includes(searchText) ||
            college.includes(searchText) ||
            skills.includes(searchText) ||
            year.includes(searchText)
        );
    });
    displayUsers(filteredUsers);
});



function viewProfile(userId) {
    localStorage.setItem("selectedUser", userId);
    window.location.href = "../student profile page/index.html";
}