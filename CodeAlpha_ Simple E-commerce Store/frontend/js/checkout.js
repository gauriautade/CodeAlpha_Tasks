if (!localStorage.getItem("token")) {
  alert("Please login first");
  window.location.href = "login.html";
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summary = document.getElementById("summary-items");
const totalEl = document.getElementById("total");

let total = 0;

cart.forEach(item => {
  total += item.price * item.quantity;
  summary.innerHTML += `
    <div class="summary-item">
      <span>${item.name} x ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
    </div>
  `;
});

totalEl.innerText = "₹" + total;

async function placeOrder() {
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const payment = document.getElementById("payment").value;

  if (!address || !phone) {
    alert("Fill all details");
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
  alert(data.message);

  localStorage.removeItem("cart");
  window.location.href = "success.html";
}
