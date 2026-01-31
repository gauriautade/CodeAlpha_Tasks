const API = "http://localhost:5000/api/auth";

/* =========================
   REGISTER
========================= */
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message || "Registered successfully");
  window.location.href = "login.html";
}

/* =========================
   LOGIN (ADMIN + USER)
========================= */
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    // 🔐 SAVE TOKEN
    localStorage.setItem("token", data.token);

    // 🔐 SAVE ROLE (ADMIN / USER)
    if (data.role === "admin") {
      localStorage.setItem("isAdmin", "true");
    } else {
      localStorage.setItem("isAdmin", "false");
    }

    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}
