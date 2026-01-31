// AUTH CHECK
if (!localStorage.getItem("user")) {
  location.href = "index.html";
}

const user = JSON.parse(localStorage.getItem("user"));

// USERNAME
document.getElementById("username").innerText = user.username;

// SET PROFILE PICS SAFELY
const navPic = document.querySelector(".nav-avatar");
const sidePic = document.querySelector(".avatar");

if (navPic) {
  navPic.src = user.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : "https://via.placeholder.com/80";
}

if (sidePic) {
  sidePic.src = user.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : "https://via.placeholder.com/80";
}

// NAV
function logout() {
  localStorage.clear();
  location.href = "index.html";
}

function openMyProfile() {
  location.href = `profile.html?id=${user._id}`;
}

function openProfile(id) {
  location.href = `profile.html?id=${id}`;
}

// CREATE POST
async function createPost() {
  const text = document.getElementById("content").value.trim();
  const file = document.getElementById("postImage").files[0];

  if (!text && !file) return;

  const fd = new FormData();
  fd.append("userId", user._id);
  fd.append("content", text);
  if (file) fd.append("image", file);

  await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    body: fd
  });

  document.getElementById("content").value = "";
  document.getElementById("postImage").value = "";

  loadPosts();
}




// LOAD POSTS (ALWAYS)
async function loadPosts() {
  const res = await fetch("http://localhost:5000/api/posts", {
    cache: "no-store"
  });
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  for (const p of posts) {
    // fetch comments for each post
    const cRes = await fetch(`http://localhost:5000/api/comments/${p._id}`);
    const comments = await cRes.json();

    container.innerHTML += `
  <div class="post">
    <div class="post-header">
      <img class="post-avatar"
        src="${p.userId.profilePic
          ? `http://localhost:5000/uploads/${p.userId.profilePic}`
          : 'https://via.placeholder.com/40'}"
        onclick="openProfile('${p.userId._id}')">

      <strong onclick="openProfile('${p.userId._id}')">
        @${p.userId.username}
      </strong>

      ${
        p.userId._id === user._id
          ? `<span class="delete-btn" onclick="deletePost('${p._id}')">🗑️</span>`
          : ""
      }
    </div>

    ${p.content ? `<p>${p.content}</p>` : ""}

    ${p.image && p.image !== ""
  ? `<img class="post-image"
          src="http://localhost:5000/uploads/${p.image}"
          style="width:100%;border-radius:14px;margin-top:10px;">`
  : ""}



    <button onclick="likePost('${p._id}')">
      ❤️ ${p.likes.length}
    </button>

    <div class="comments">
      <div class="comment-input">
        <input id="comment-${p._id}" placeholder="Write a comment...">
        <button onclick="addComment('${p._id}')">Post</button>
      </div>

      ${comments.map(c => `
        <div class="comment">
          <strong>@${c.userId.username}</strong> ${c.text}
        </div>
      `).join("")}
    </div>
  </div>
`;

  }
}

async function addComment(postId) {
  const input = document.getElementById(`comment-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  await fetch("http://localhost:5000/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      userId: user._id,
      text
    })
  });

  input.value = "";
  loadPosts();
}

// LIKE
async function likePost(id) {
  await fetch(`http://localhost:5000/api/posts/${id}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user._id })
  });

  loadPosts();
}

async function searchUsers() {
  const q = document.getElementById("navSearch").value.trim();
  const box = document.getElementById("navResults");

  if (!q) {
    box.innerHTML = "";
    return;
  }

  const res = await fetch(
    `http://localhost:5000/api/user/search/${q}`
  );
  const users = await res.json();

  box.innerHTML = users.map(u => `
    <div class="nav-search-user" onclick="openProfile('${u._id}')">
      <img src="${
        u.profilePic
          ? `http://localhost:5000/uploads/${u.profilePic}`
          : 'https://via.placeholder.com/30'
      }">
      <span>${u.username}</span>
    </div>
  `).join("");
}

async function deletePost(postId) {
  if (!confirm("Delete this post?")) return;

  await fetch(`http://localhost:5000/api/posts/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user._id })
  });

  loadPosts();
}

/* LOAD STORIES */
async function loadStories() {
  const res = await fetch("http://localhost:5000/api/story");
  const stories = await res.json();

  const box = document.getElementById("stories");
  if (!box) return;

  box.innerHTML = "";

  stories.forEach(s => {
    box.innerHTML += `
      <div class="story" onclick="viewStory('${s.image}')">
        <img src="http://localhost:5000/uploads/${s.image}">
        <span>@${s.userId.username}</span>
      </div>
    `;
  });
}

/* VIEW STORY */
function viewStory(img) {
  const w = window.open();
  w.document.write(`
    <img src="http://localhost:5000/uploads/${img}"
         style="width:100%;height:100%;object-fit:contain;">
  `);
}


// 🔥 ALWAYS LOAD POSTS ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
  loadStories();
});
