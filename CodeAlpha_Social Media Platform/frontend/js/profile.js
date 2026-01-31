if (!localStorage.getItem("user")) {
  location.href = "index.html";
}

const currentUser = JSON.parse(localStorage.getItem("user"));
const params = new URLSearchParams(window.location.search);
const profileUserId = params.get("id");

const followBtn = document.getElementById("followBtn");

/* LOAD PROFILE */
async function loadProfile() {
  const res = await fetch(`http://localhost:5000/api/user/${profileUserId}`);
  const user = await res.json();

  document.getElementById("profile-username").innerText = user.username;
  document.getElementById("profile-bio").innerText = user.bio || "";

  document.getElementById("followers-count").innerText = user.followers.length;
  document.getElementById("following-count").innerText = user.following.length;

  document.getElementById("profile-pic").src =
    user.profilePic
      ? `http://localhost:5000/uploads/${user.profilePic}`
      : "https://via.placeholder.com/110";

  // owner vs other user
  if (profileUserId === currentUser._id) {
    followBtn.style.display = "none";
  } else {
    followBtn.style.display = "block";
    const isFollowing = user.followers
      .map(u => u._id)
      .includes(currentUser._id);
    followBtn.innerText = isFollowing ? "Unfollow" : "Follow";
  }
}

/* LOAD USER POSTS (GRID) */
async function loadUserPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  const posts = await res.json();

  const grid = document.getElementById("user-posts");
  grid.innerHTML = "";

  posts.forEach(p => {
    if (p.userId._id === profileUserId && p.image) {
      grid.innerHTML += `
       <img src="http://localhost:5000/uploads/${p.image}"
     onerror="this.style.display='none'">

        >
      `;
    }
  });
}

function viewImage(img) {
  const w = window.open();
  w.document.write(`
    <img src="http://localhost:5000/uploads/${img}"
         style="width:100%;height:100%;object-fit:contain;">
  `);
}

/* FOLLOW / UNFOLLOW */
async function toggleFollow() {
  const action =
    followBtn.innerText === "Follow" ? "follow" : "unfollow";

  await fetch(
    `http://localhost:5000/api/user/${profileUserId}/${action}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id })
    }
  );

  loadProfile();
}

/* NAV */
function logout() {
  localStorage.clear();
  location.href = "index.html";
}

function openMyProfile() {
  location.href = `profile.html?id=${currentUser._id}`;
}

/* LOAD EVERYTHING */
document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadUserPosts();
});
