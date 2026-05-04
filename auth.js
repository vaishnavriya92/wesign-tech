// =======================
// SIGNUP
// =======================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("newUser").value.trim();
    const password = document.getElementById("newPass").value;
    const role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    const exists = users.find(u => u.username === username);

    if (exists) {
      document.getElementById("msg").innerText = "User already exists!";
      return;
    }

    // add new user
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

    // FIXED: removed wrong 'u.name' check
    const user = users.find(u =>
      u.username === username && u.password === password
    );

    if (user) {
      // save login session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);

      const redirect = localStorage.getItem("redirectAfterLogin");

      if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
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
  if (localStorage.getItem("isLoggedIn") !== "true") {
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.replace("login.html");
  }
}

// =======================
// ADMIN ONLY ACCESS
// =======================
function protectAdmin() {
  protectPage();

  // FIXED: use localStorage (not sessionStorage)
  if (localStorage.getItem("role") !== "admin") {
    alert("Admins only!");
    window.location.replace("index.html");
  }
}

// =======================
// LOGOUT
// =======================
function logout() {
  localStorage.clear(); // cleaner logout
  window.location.replace("login.html");
}
