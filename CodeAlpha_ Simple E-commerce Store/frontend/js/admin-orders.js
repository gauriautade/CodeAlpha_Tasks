// 🔐 LOGIN CHECK
if (!localStorage.getItem("token")) {
  alert("Please login as admin");
  window.location.href = "login.html";
}

// 📦 FETCH ADMIN ORDERS
fetch("http://localhost:5000/api/admin/orders", {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
})
.then(res => {
  if (res.status === 403) {
    alert("Access denied. Admin only.");
    window.location.href = "index.html";
    return;
  }
  return res.json();
})
.then(orders => {
  // render orders
});
