// 🔐 AUTH CHECK (ONLY ONCE)
if (!localStorage.getItem("token")) {
  alert("Please login first");
  window.location.href = "login.html";
}

// 📦 GET CART DATA (DECLARE ONCE)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🔧 NORMALIZE CART (fix old broken items)
cart = cart.map(item => ({
  ...item,
  qty: item.qty || item.quantity || 1
}));

localStorage.setItem("cart", JSON.stringify(cart));

const summaryDiv = document.getElementById("summary-items");
const totalEl = document.getElementById("total");

let total = 0;

// 🛑 EMPTY CART CHECK
if (cart.length === 0) {
  summaryDiv.innerHTML = "<p>Your cart is empty</p>";
  totalEl.innerText = "₹0";
} else {
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    summaryDiv.innerHTML += `
      <div class="summary-item">
        <span>${item.name} × ${item.qty}</span>
        <span>₹${itemTotal}</span>
      </div>
    `;
  });

  totalEl.innerText = "₹" + total;
}

// 🧾 PLACE ORDER
async function placeOrder() {
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const payment = document.getElementById("payment").value;

  if (!address || !phone) {
    alert("Please fill all details");
    return;
  }

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      products: cart,
      total,
      address,
      phone,
      payment
    })
  });

  const data = await res.json();
  alert(data.message || "Order placed successfully");

  // 🧹 CLEAR CART
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}
