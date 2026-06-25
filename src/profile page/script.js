const loggedInUser = localStorage.getItem("loggedInUser");

const users = JSON.parse(localStorage.getItem("users")) || [];

const currentUser = users.find(function(user) {
    return user.userId === loggedInUser;
});

if (currentUser) {

    document.getElementById("email").value = currentUser.email;

    document.getElementById("branch").value =
        currentUser.profile.branch;

    document.getElementById("year").value =
        currentUser.profile.year;

    document.getElementById("college").value =
        currentUser.profile.college;

    document.getElementById("about").value =
        currentUser.profile.about;
}

console.log(currentUser);
console.log(currentUser.profile);




const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillsContainer = document.getElementById("skillsContainer");
let skills = currentUser.skills;

function displaySkills() {

    skillsContainer.innerHTML = "";

    skills.forEach(function(skill, index) {

        const skillBadge = document.createElement("span");

        skillBadge.className =
            "badge skillclass me-2 mb-2";

        skillBadge.innerHTML = `
            ${skill}
            <button
                class="btn-close btn-close-white ms-2"
                onclick="deleteSkill(${index})"
            ></button>
        `;

        skillsContainer.appendChild(skillBadge);
    });
}

function deleteSkill(index) {
    const confirmDelete = confirm("Are you sure you want to delete this skill?");
    if (!confirmDelete) {
        return;
    }
    skills.splice(index, 1);
    currentUser.skills = skills;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displaySkills();
}

addSkillBtn.addEventListener("click", function() {
    const skill = skillInput.value.trim();
    if(skill === ""){
        return;
    }
    skills.push(skill);
    currentUser.skills = skills;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displaySkills();
    skillInput.value = "";
});
displaySkills();





const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");
const githubLink = document.getElementById("githubLink");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectsContainer = document.getElementById("projectsContainer");

let projects = currentUser.projects;

function displayProjects() {
    projectsContainer.innerHTML = "";
    projects.forEach(function(project, index) {
        const projectCard = document.createElement("div");
        projectCard.className = "card p-3 mb-3";
        projectCard.innerHTML = `
            <h5>${project.name}</h5>
            <p>${project.description}</p>
            <a href="${project.github}" target="_blank">
                GitHub Repository
            </a>
            <br><br>
            <button
                class="btn btn-danger btn-sm w-25"
                onclick="deleteProject(${index})"
            >
                Delete
            </button>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

function deleteProject(index) {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) {
        return;
    }
    projects.splice(index, 1);
    currentUser.projects = projects;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayProjects();
}

addProjectBtn.addEventListener("click", function() {
    const project = {
        name: projectName.value.trim(),
        description: projectDescription.value.trim(),
        github: githubLink.value.trim()
    };
    if (
        project.name === "" ||
        project.description === "" ||
        project.github === ""
    ) {
        alert("Please fill all project details.");
        return;
    }
    projects.push(project);
    currentUser.projects = projects;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayProjects();
    projectName.value = "";
    projectDescription.value = "";
    githubLink.value = "";
});

displayProjects();






const certificationName = document.getElementById("certificationName");
const issuedBy = document.getElementById("issuedBy");
const addCertificationBtn = document.getElementById("addCertificationBtn");
const certificationsContainer = document.getElementById("certificationsContainer");

let certifications = currentUser.certifications;

function displayCertifications() {
    certificationsContainer.innerHTML = "";
    certifications.forEach(function(certification, index) {
        const certificationCard = document.createElement("div");
        certificationCard.className = "card p-3 mb-3";
        certificationCard.innerHTML = `
            <h5>${certification.name}</h5>
            <p>Issued By: ${certification.issuer}</p>
            <button
                class="btn btn-danger btn-sm w-25"
                onclick="deleteCertification(${index})"
            >
                Delete
            </button>
        `;
        certificationsContainer.appendChild(certificationCard);
    });
}

addCertificationBtn.addEventListener("click", function() {
    const certification = {
        name: certificationName.value.trim(),
        issuer: issuedBy.value.trim()
    };
    if (
        certification.name === "" ||
        certification.issuer === ""
    ) {
        alert("Please fill all certification details.");
        return;
    }
    certifications.push(certification);
    currentUser.certifications = certifications;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayCertifications();
    certificationName.value = "";
    issuedBy.value = "";
});

function deleteCertification(index) {
    const confirmDelete = confirm("Are you sure you want to delete this certification?");
    if (!confirmDelete) {
        return;
    }
    certifications.splice(index, 1);
    currentUser.certifications = certifications;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayCertifications();
}
displayCertifications();






const activityName = document.getElementById("activityName");
const activityDescription = document.getElementById("activityDescription");
const addActivityBtn = document.getElementById("addActivityBtn");
const activitiesContainer = document.getElementById("activitiesContainer");

let activities = currentUser.activities;

function displayActivities() {
    activitiesContainer.innerHTML = "";
    activities.forEach(function(activity, index) {
        const activityCard = document.createElement("div");
        activityCard.className = "card p-3 mb-3";
        activityCard.innerHTML = `
            <h5>${activity.name}</h5>
            <p>${activity.description}</p>
            <button
                class="btn btn-danger btn-sm w-25"
                onclick="deleteActivity(${index})"
            >
                Delete
            </button>
        `;
        activitiesContainer.appendChild(activityCard);
    });
}

addActivityBtn.addEventListener("click", function() {
    const activity = {
        name: activityName.value.trim(),
        description: activityDescription.value.trim()
    };
    if (
        activity.name === "" ||
        activity.description === ""
    ) {
        alert("Please fill all activity details.");
        return;
    }
    activities.push(activity);
    currentUser.activities = activities;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayActivities();
    activityName.value = "";
    activityDescription.value = "";
});

function deleteActivity(index) {
    const confirmDelete = confirm("Are you sure you want to delete this activity?");
    if (!confirmDelete) {
        return;
    }
    activities.splice(index, 1);
    currentUser.activities = activities;
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    displayActivities();
}
displayActivities();













const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {
    currentUser.profile = {
        branch: document.getElementById("branch").value,
        year: document.getElementById("year").value,
        college: document.getElementById("college").value,
        about: document.getElementById("about").value
    };
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
    window.location.href = "../profile page/index.html";

});