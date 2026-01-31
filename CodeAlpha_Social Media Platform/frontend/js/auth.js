async function login() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  // ❌ LOGIN FAILED
  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  // ✅ LOGIN SUCCESS
  localStorage.setItem("user", JSON.stringify(data.user));
  location.href = "feed.html";
}


async function register() {
  await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value
    })
  });

  location.href = "index.html";
}
