const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

async function loadFollowers() {
  const res = await fetch(`http://localhost:5000/api/user/${userId}/followers`);
  const users = await res.json();

  document.getElementById("list").innerHTML = users.map(u => `
    <div class="user-row" onclick="openProfile('${u._id}')">
      <img src="${u.profilePic
        ? `http://localhost:5000/uploads/${u.profilePic}`
        : 'https://via.placeholder.com/40'}">
      <span>${u.username}</span>
    </div>
  `).join("");
}

function openProfile(id) {
  location.href = `profile.html?id=${id}`;
}

loadFollowers();
