// PRELOADER
window.onload = function () {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
};

// SCROLL PROGRESS BAR
window.onscroll = function () {
  const progressBar = document.getElementById("progress-bar");
  if (!progressBar) return;

  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;

  progressBar.style.width = scrolled + "%";
};

// TYPING EFFECT (only if exists)
if (document.querySelector("#typed") && typeof Typed !== "undefined") {
  new Typed("#typed", {
    strings: ["Web Applications", "Cloud Systems", "AI Solutions"],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
  });
}

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");
if (counters.length > 0) {
  counters.forEach(counter => {
    counter.innerText = "0";

    const update = () => {
      const target = +counter.getAttribute("data-target");
      const c = +counter.innerText;
      const increment = target / 200;

      if (c < target) {
        counter.innerText = Math.ceil(c + increment);
        setTimeout(update, 10);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
}

// DARK MODE TOGGLE
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.onclick = function () {
    document.body.classList.toggle("dark-mode");
  };
}

// =======================
// CONTACT FORM (SAVE DATA)
// =======================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    let data = JSON.parse(localStorage.getItem("contacts")) || [];

    data.push({ name, email, message });

    localStorage.setItem("contacts", JSON.stringify(data));

    alert("Form submitted successfully!");
    contactForm.reset();
  });
}

// =======================
// ADMIN PANEL (LOAD DATA)
// =======================
function loadData() {
  const dataContainer = document.getElementById("data");
  if (!dataContainer) return;

  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  let output = "";

  data.forEach((item, index) => {
    output += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px; border-radius:8px;">
        <p><b>Name:</b> ${item.name}</p>
        <p><b>Email:</b> ${item.email}</p>
        <p><b>Message:</b> ${item.message}</p>
        <button onclick="deleteData(${index})" style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;">
          Delete
        </button>
      </div>
    `;
  });

  dataContainer.innerHTML = output;
}
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { username: "admin", password: "admin123", role: "admin" }
  ]));
}

// DELETE DATA
function deleteData(index) {
  let data = JSON.parse(localStorage.getItem("contacts")) || [];
  data.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(data));
  loadData();
}

// Load only if admin page
if (document.getElementById("data")) {
  loadData();
}
