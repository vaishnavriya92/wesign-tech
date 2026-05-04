// =======================
// SIGNUP
// =======================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("newUser").value;
    const password = document.getElementById("newPass").value;
    const role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.username === username);

    if (exists) {
      document.getElementById("msg").innerText = "User already exists!";
      return;
    }

    users.push({ username, password, role });

localStorage.setItem("users", JSON.stringify(users));

alert("Registered successfully! Please login.");
window.location.href = "login.html";
  });
}

// =======================
// LOGIN
// =======================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => 
  (u.username === username || u.name === username) &&
  u.password === password
);
    if (user) {
      // ✅ SAVE SESSION
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", user.role);
      sessionStorage.setItem("username", user.username);

      // ✅ REDIRECT LOGIC
      const redirect = sessionStorage.getItem("redirectAfterLogin");

      if (redirect) {
        sessionStorage.removeItem("redirectAfterLogin");
        window.location.href = redirect;
      } else {
        window.location.href = "index.html";
      }

    } else {
      document.getElementById("error").innerText = "Invalid credentials!";
    }
  });
}

// =======================
// PROTECT ALL PAGES
// =======================
function protectPage() {
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    sessionStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.replace("login.html");
  }
}
// =======================
// ADMIN ONLY ACCESS
// =======================
function protectAdmin() {
  protectPage();

  if (sessionStorage.getItem("role") !== "admin") {
    alert("Admins only!");
    window.location.replace("index.html");
  }
}

// =======================
// LOGOUT
// =======================
function logout() {
  sessionStorage.clear();
  window.location.replace("login.html");
}