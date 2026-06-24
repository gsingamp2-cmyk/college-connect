const userData = JSON.parse(localStorage.getItem("user"));

if (userData) {
    document.getElementById("email").value = userData.email;
}

const profileData = JSON.parse(localStorage.getItem("profile"));

if (profileData) {
    document.getElementById("branch").value = profileData.branch || "";
    document.getElementById("year").value = profileData.year || "";
    document.getElementById("college").value = profileData.college || "";
    document.getElementById("about").value = profileData.about || "";
}

console.log(userData);
console.log(profileData);




const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillsContainer = document.getElementById("skillsContainer");
let skills = JSON.parse(localStorage.getItem("skills")) || [];

function displaySkills() {

    skillsContainer.innerHTML = "";

    skills.forEach(function(skill, index) {

        const skillBadge = document.createElement("span");

        skillBadge.className =
            "badge bg-primary me-2 mb-2";

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

    skills.splice(index, 1);

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

    displaySkills();
}

addSkillBtn.addEventListener("click", function() {
    const skill = skillInput.value.trim();
    if(skill === ""){
        return;
    }
    skills.push(skill);
    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
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

let projects = JSON.parse(localStorage.getItem("projects")) || [];

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
    projects.splice(index, 1);
    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );
    displayProjects();
}

addProjectBtn.addEventListener("click", function() {
    const project = {
        name: projectName.value,
        description: projectDescription.value,
        github: githubLink.value
    };
    projects.push(project);
    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
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

let certifications =
    JSON.parse(localStorage.getItem("certifications")) || [];

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
        name: certificationName.value,
        issuer: issuedBy.value
    };
    certifications.push(certification);
    localStorage.setItem(
        "certifications",
        JSON.stringify(certifications)
    );
    displayCertifications();
    certificationName.value = "";
    issuedBy.value = "";
});


function deleteCertification(index) {
    certifications.splice(index, 1);
    localStorage.setItem(
        "certifications",
        JSON.stringify(certifications)
    );
    displayCertifications();
}
displayCertifications();






const activityName = document.getElementById("activityName");
const activityDescription = document.getElementById("activityDescription");
const addActivityBtn = document.getElementById("addActivityBtn");
const activitiesContainer = document.getElementById("activitiesContainer");

let activities =
    JSON.parse(localStorage.getItem("activities")) || [];

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
        name: activityName.value,
        description: activityDescription.value
    };
    activities.push(activity);
    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );
    displayActivities();
    activityName.value = "";
    activityDescription.value = "";
});

function deleteActivity(index) {
    activities.splice(index, 1);
    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );
    displayActivities();
}
displayActivities();













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

    window.location.href = "../profile page/index.html";
});