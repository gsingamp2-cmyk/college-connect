console.log("Student Profile Loaded");
const selectedUser = localStorage.getItem("selectedUser");
const users = JSON.parse(localStorage.getItem("users")) || [];
const viewedUser = users.find(function(user) {
    return user.userId === selectedUser;
});

if (viewedUser) {
    document.getElementById("studentName").textContent =
        viewedUser.fullName;
    document.getElementById("studentEmail").textContent =
        viewedUser.email;
    document.getElementById("studentBranch").textContent =
        viewedUser.profile.branch;
    document.getElementById("studentYear").textContent =
        viewedUser.profile.year;
    document.getElementById("studentCollege").textContent =
        viewedUser.profile.college;
    document.getElementById("studentAbout").textContent =
        viewedUser.profile.about;
    displaySkills();
    displayProjects();
    displayCertifications();
    displayActivities();
}

function displaySkills() {
    const skillsContainer =
        document.getElementById("skillsContainer");
    skillsContainer.innerHTML = "";

    if (viewedUser.skills.length === 0) {
        skillsContainer.innerHTML="<span class='text-muted'>No skills added</span>";
        return;
    }

    viewedUser.skills.forEach(function(skill) {
        const badge = document.createElement("span");
        badge.className =
            "badge bg-primary me-2 mb-2";
        badge.textContent = skill;
        skillsContainer.appendChild(badge);
    });

}

function displayProjects() {
    const projectsContainer = document.getElementById("projectsContainer");
    projectsContainer.innerHTML = "";

    if (viewedUser.projects.length === 0) {
        projectsContainer.innerHTML = "<p class='text-muted'>No projects added</p>";
        return;
    }

    viewedUser.projects.forEach(function(project) {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.innerHTML = `
            <h5>${project.name}</h5>
            <p>${project.description}</p>
            <a href="${project.github}" target="_blank">GitHub Repository</a>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

function displayCertifications() {
    const certificationsContainer = document.getElementById("certificationsContainer");
    certificationsContainer.innerHTML = "";

    if (viewedUser.certifications.length === 0) {
        certificationsContainer.innerHTML = "<p class='text-muted'>No certifications added</p>";
        return;
    }

    viewedUser.certifications.forEach(function(certification) {
        const certificationCard = document.createElement("div");
        certificationCard.className = "certification-card";
        certificationCard.innerHTML = `
            <h5>${certification.name}</h5>
            <p>Issued By: ${certification.issuer}</p>
        `;
        certificationsContainer.appendChild(certificationCard);
    });
}

function displayActivities() {
    const activitiesContainer = document.getElementById("activitiesContainer");
    activitiesContainer.innerHTML = "";

    if (viewedUser.activities.length === 0) {
        activitiesContainer.innerHTML = "<p class='text-muted'>No activities added</p>";
        return;
    }

    viewedUser.activities.forEach(function(activity) {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";
        activityCard.innerHTML = `
            <h5>${activity.name}</h5>
            <p>${activity.description}</p>
        `;
        activitiesContainer.appendChild(activityCard);
    });
}