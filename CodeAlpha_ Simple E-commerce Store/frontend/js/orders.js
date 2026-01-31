// 🔐 AUTH CHECK
if (!localStorage.getItem("token")) {
  alert("Please login first");
  window.location.href = "login.html";
}

const ordersList = document.getElementById("orders-list");

// 📦 FETCH ORDERS
fetch("http://localhost:5000/api/orders", {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
})
.then(res => res.json())
.then(orders => {

  // 🛑 NO ORDERS
  if (!orders || orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty">
        <h2>No orders yet 🛒</h2>
        <p>Start shopping to see your orders here.</p>
      </div>
    `;
    return;
  }

  // 🔄 LATEST FIRST
  orders.reverse().forEach(order => {

    // ✅ USE CORRECT FIELD: order.date
    const orderDate = order.date
      ? new Date(order.date).toLocaleDateString()
      : "Date not available";

    let productsHTML = "";
    order.products.forEach(p => {
      productsHTML += `
        <div class="order-product">
          <span>${p.name} × ${p.qty}</span>
          <span>₹${p.price * p.qty}</span>
        </div>
      `;
    });

    ordersList.innerHTML += `
      <div class="order-card">
        <div class="order-header">
          <span>Order Date: ${orderDate}</span>
          <span>Payment: ${order.payment}</span>
        </div>

        <div class="order-products">
          ${productsHTML}
        </div>

        <div class="order-total">
          Total: ₹${order.total || 0}
        </div>
      </div>
    `;
  });
})
.catch(err => {
  console.error(err);
  ordersList.innerHTML = "<p>Error loading orders</p>";
});
