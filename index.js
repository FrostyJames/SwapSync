document.addEventListener("DOMContentLoaded", () => {
  const introPage = document.getElementById("intro-page");
  const mainApp = document.getElementById("main-app");
  const hasVisited = localStorage.getItem("hasVisited");

  //  if (hasVisited) {
  //  introPage.classList.add("hidden");
  //  mainApp.classList.remove("hidden");
  // }

  const getStartedBtn = document.getElementById("get-started-btn");// --- IGNORE ---
  getStartedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    introPage.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => {
      introPage.classList.add("hidden");
      mainApp.classList.remove("hidden");
      localStorage.setItem("hasVisited", "true"); //  Remember the user
    }, 500);
  });
});
// --- NAVBAR DROPDOWN TOGGLE ---
const toggleButton = document.getElementById('user-menu-button');
const menu = document.getElementById('user-menu');

toggleButton.addEventListener('click', () => { // Toggle the visibility of the dropdown menu
  menu.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  if (!toggleButton.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add('hidden');
  }
});

// --- REFERENCES ---
const form = document.getElementById('skill-form');
const grid = document.getElementById('skills-grid');

// --- LOAD SAVED SKILLS ---
window.addEventListener('DOMContentLoaded', () => {
  const savedSkills = JSON.parse(localStorage.getItem('skills')) || [];
  savedSkills.forEach(skill => createSkillCard(skill));
});

// --- SUBMIT NEW SKILL ---
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = e.target.elements;
  const title = inputs[0].value;
  const description = inputs[1].value;
  const category = inputs[2].value;
  const availability = inputs[3].value;
  const postedBy = document.getElementById('user-select')?.value || "Anonymous";

  const skill = { title, description, category, availability, postedBy };

  createSkillCard(skill);

  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  skills.push(skill);
  localStorage.setItem('skills', JSON.stringify(skills));

  e.target.reset();
});

// --- CREATE SKILL CARD ---
function createSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow p-4 border border-gray-200';
  card.innerHTML = `
    <h3 class="text-xl font-semibold text-blue-700 mb-2">${skill.title}</h3>
    <p class="text-gray-700 mb-2">${skill.description}</p>
    <p class="text-sm text-gray-500"><strong>Category:</strong> ${skill.category}</p>
    <p class="text-sm text-gray-500"><strong>Availability:</strong> ${skill.availability}</p>
    <div class="mt-3 flex gap-2">
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 request-btn">Request Skill</button>
      <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 remove-btn">Remove</button>
    </div>
  `;
  grid.appendChild(card);

  const requestBtn = card.querySelector('.request-btn');
  requestBtn.addEventListener('click', () => {
    document.getElementById('request-modal').classList.remove('hidden');
    const modalTitle = document.getElementById('modal-skill-title');
    if (modalTitle) modalTitle.textContent = skill.title;
  });

  const removeBtn = card.querySelector('.remove-btn'); // Add event listener to the remove button
  removeBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove this skill?')) {
      card.remove();

      const allSkills = JSON.parse(localStorage.getItem('skills')) || [];
      const updatedSkills = allSkills.filter(s =>
        !(s.title === skill.title &&
          s.description === skill.description &&
          s.category === skill.category &&
          s.availability === skill.availability &&
          s.postedBy === skill.postedBy)
      );
      localStorage.setItem('skills', JSON.stringify(updatedSkills));
    }
  });
}

// --- MODAL BEHAVIOR ---
document.getElementById('cancel-request').addEventListener('click', () => {
  document.getElementById('request-modal').classList.add('hidden');
});

document.getElementById('request-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Request sent!');
  document.getElementById('request-modal').classList.add('hidden');
  e.target.reset();
});

// --- SECTION SWITCHING ---
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('data-target');

      // Hide all sections
      document.querySelectorAll('section[id$="-section"]').forEach(section => {
        section.classList.add('hidden');
      });

      // Show the selected section
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.remove('hidden');
      }

      // Remove highlight from all links
      navLinks.forEach(link => {
        link.classList.remove('bg-gray-900', 'text-white');
        link.classList.add('text-gray-300');
      });

      // Highlight the active link
      event.currentTarget.classList.add('bg-gray-900', 'text-white');
      event.currentTarget.classList.remove('text-gray-300');
    });
  });
});

//TEAM SECTION
const people = [
  { name: "James Otieno", skill: "Web Design" },
  { name: "Rita Mwende", skill: "Public Speaking" },
  { name: "Brian Kimani", skill: "Python Programming" },
  { name: "Esther Njeri", skill: "Graphic Design" },
  { name: "James Kamanda", skill: "Violin Playing" },
  { name: "Lilian Muthoni", skill: "Mobile App Development" },
  { name: "Kevin Maina", skill: "3D Animation" },
  { name: "Mercy Atieno", skill: "Photography" },
  { name: "David Wambua", skill: "Data Analysis" },
  { name: "Lucy Njeri", skill: "UX/UI Design" },
  { name: "Samuel Mwanzia", skill: "Java Programming" },
  { name: "Cynthia Wairimu", skill: "Social Media Marketing" },
  { name: "Allan Kiptoo", skill: "Cybersecurity" },
  { name: "Diana Njoki", skill: "Event Planning" },
  { name: "Felix Barasa", skill: "Game Development" },
  { name: "Grace Chebet", skill: "Interior Design" },
  { name: "Ben Kirwa", skill: "Motion Graphics" },
  { name: "Naomi Achieng", skill: "Podcast Hosting" },
  { name: "Eric Otieno", skill: "Blockchain Development" },
  { name: "Janet Wambui", skill: "Digital Illustration" },
  { name: "Michael Oduor", skill: "AI/Machine Learning" },
  { name: "Brenda Cherono", skill: "Fashion Design" },
  { name: "Victor Muli", skill: "Voice Acting" },
  { name: "Irene Mutheu", skill: "Cloud Computing" },
  { name: "Peter Njoroge", skill: "Technical Writing" },
  { name: "Angela Mwikali", skill: "Film Editing" },
  { name: "Tom Ochieng", skill: "SEO Optimization" },
  { name: "Faith Kendi", skill: "Front-End Development" },
  { name: "Ronald Kipchumba", skill: "Network Administration" },
  { name: "Joy Wakesho", skill: "Product Management" },
  { name: "Edwin Simiyu", skill: "Augmented Reality Design" },
  { name: "Sandra Wafula", skill: "Music Production" },
  { name: "Kennedy Kinyua", skill: "Software Architecture" },
  { name: "Zippy Nzilani", skill: "Content Strategy" },
  { name: "Timothy Mumo", skill: "Character Illustration" }
];

const availableContainer = document.getElementById('available-people');
const selectedContainer = document.getElementById('selected-team');
const teamNameInput = document.getElementById('team-name');
const saveButton = document.getElementById('save-team');
const savedTeamsContainer = document.getElementById('saved-teams');

let selectedTeam = []; // Array to hold selected team members

function renderAvailablePeople() { // Render available people who are not in the selected team
  availableContainer.innerHTML = ''; // Clear the available people container
  people.forEach(person => {
    const isSelected = selectedTeam.find(p => p.name === person.name);
    if (!isSelected) {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
      card.innerHTML = `
        <div>
          <h3 class="font-bold text-gray-800">${person.name}</h3>
          <p class="text-sm text-gray-600">${person.skill}</p>
        </div>
        <button class="bg-green-600 text-white px-3 py-1 rounded add-btn">Add</button>
      `;
      card.querySelector('.add-btn').addEventListener('click', () => {
        selectedTeam.push(person);
        renderAvailablePeople();
        renderSelectedTeam();
      });
      availableContainer.appendChild(card);
    }
  });
}

function renderSelectedTeam() { // Render the selected team members
  selectedContainer.innerHTML = '';
  if (selectedTeam.length === 0) {
    selectedContainer.innerHTML = '<p class="text-sm text-gray-500">No members yet.</p>';
    return;
  }

  selectedTeam.forEach(person => { // Create a card for each selected team member
    const card = document.createElement('div');
    card.className = 'bg-white p-3 rounded shadow flex justify-between items-center';
    card.innerHTML = `
      <div>
        <h3 class="font-semibold text-gray-800">${person.name}</h3>
        <p class="text-sm text-gray-600">${person.skill}</p>
      </div>
      <button class="bg-red-600 text-white px-3 py-1 rounded remove-btn">Remove</button>
    `;
    card.querySelector('.remove-btn').addEventListener('click', () => {
      selectedTeam = selectedTeam.filter(p => p.name !== person.name);
      renderAvailablePeople();
      renderSelectedTeam();
    });
    selectedContainer.appendChild(card);
  });
}

function renderSavedTeam(team) {  // Render the saved team in the saved teams section
  const wrapper = document.createElement('div');
  wrapper.className = 'bg-white p-4 rounded-lg shadow border border-gray-200 mb-4';

  const title = document.createElement('h3');
  title.className = 'text-xl font-bold text-blue-700 mb-2';
  title.textContent = team.name;

  const list = document.createElement('ul');
  list.className = 'list-disc list-inside text-gray-700';
  team.members.forEach(member => {
    const li = document.createElement('li');
    li.textContent = `${member.name} — ${member.skill}`;
    list.appendChild(li);
  });

  wrapper.appendChild(title);
  wrapper.appendChild(list);
  savedTeamsContainer.appendChild(wrapper);
}

saveButton.addEventListener('click', () => { // Save the team when the save button is clicked
  const teamName = teamNameInput.value.trim();
  if (!teamName || selectedTeam.length === 0) {
    alert("Please give your team a name and add at least one member.");
    return;
  }

  const team = {
    name: teamName,
    members: [...selectedTeam]
  };

  renderSavedTeam(team);
  alert(`Team "${teamName}" saved successfully!`);

  selectedTeam = [];
  teamNameInput.value = '';
  renderAvailablePeople();
  renderSelectedTeam();
});

renderAvailablePeople();
renderSelectedTeam();
// Kick things off
renderAvailablePeople();
renderSelectedTeam();

//PROJECT SECTION
const projectForm = document.getElementById('project-form');
const projectList = document.getElementById('projects-list');

let postedProjects = JSON.parse(localStorage.getItem('projects')) || [];
let editingIndex = null;

function renderProjects() {
  projectList.innerHTML = '';

  if (postedProjects.length === 0) {
    projectList.innerHTML = '<p class="text-gray-500 text-sm">No projects posted yet.</p>';
    return;
  }

  postedProjects.forEach((proj, index) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-lg shadow border border-gray-200';
    card.innerHTML = `
      <h4 class="text-lg font-bold text-blue-700">${proj.title}</h4>
      <p class="text-gray-700 mb-2">${proj.goal}</p>
      <p class="text-sm text-gray-600"><strong>Skills Needed:</strong> ${proj.skills}</p>
      <div class="mt-4 flex space-x-2">
        <button class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm" data-index="${index}">Edit</button>
        <button class="delete-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm" data-index="${index}">Delete</button>
      </div>
    `;

    // DELETE
    card.querySelector('.delete-btn').addEventListener('click', () => {
      postedProjects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(postedProjects));
      renderProjects();
    });

    // EDIT
    card.querySelector('.edit-btn').addEventListener('click', () => {
      document.getElementById('project-title').value = proj.title;
      document.getElementById('project-goal').value = proj.goal;
      document.getElementById('project-skills').value = proj.skills;
      editingIndex = index;
    });

    projectList.appendChild(card);
  });
}

if (projectForm) {
  projectForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('project-title').value.trim();
    const goal = document.getElementById('project-goal').value.trim();
    const skills = document.getElementById('project-skills').value.trim();

    if (!title || !goal || !skills) return; // Exit if any input is empty

    const project = { title, goal, skills }; // Create a project object

    if (editingIndex !== null) {
      postedProjects[editingIndex] = project;
      editingIndex = null;
    } else {
      postedProjects.push(project);
    }

    localStorage.setItem('projects', JSON.stringify(postedProjects));
    e.target.reset();
    renderProjects();
  });
}

renderProjects();

//CALENDAR SECTION
const calendarForm = document.getElementById('calendar-form');
const eventList = document.getElementById('event-list');
let storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

function renderEvents() {
  eventList.innerHTML = '';
  if (storedEvents.length === 0) {
    eventList.innerHTML = '<p class="text-sm text-gray-500">No events yet.</p>';
    return;
  }

  storedEvents.forEach((event) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow border border-gray-200';
    const date = new Date(event.datetime).toLocaleString();

    card.innerHTML = `
      <h4 class="text-lg font-bold text-blue-700">${event.title}</h4>
      <p class="text-gray-600">${date}</p>
      <div class="mt-2 flex gap-2">
        <button class="edit-event bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
        <button class="delete-event bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
      </div>
    `;

    // DELETE
    card.querySelector('.delete-event').addEventListener('click', () => {
      storedEvents = storedEvents.filter(e => e.id !== event.id);
      localStorage.setItem('calendarEvents', JSON.stringify(storedEvents));
      renderEvents();
    });

    // EDIT
    card.querySelector('.edit-event').addEventListener('click', () => {
      document.getElementById('event-title').value = event.title; // Populate the input field for the event title with the selected event's title

      document.getElementById('event-date').value = event.datetime;

      // Remove so it can be re-submitted as an updated version
      storedEvents = storedEvents.filter(e => e.id !== event.id);
      localStorage.setItem('calendarEvents', JSON.stringify(storedEvents));
      renderEvents();
    });

    eventList.appendChild(card);
  });
}

// Form submission
if (calendarForm) {
  calendarForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const datetime = document.getElementById('event-date').value;

    const newEvent = {
      id: Date.now(),
      title,
      datetime
    };

    storedEvents.push(newEvent);
    localStorage.setItem('calendarEvents', JSON.stringify(storedEvents));

    e.target.reset();
    renderEvents();
  });
}

renderEvents();

// localStorage.removeItem("hasVisited");
//if (hasVisited) {
//   introPage.classList.add("hidden");
//   mainApp.classList.remove("hidden");
// }