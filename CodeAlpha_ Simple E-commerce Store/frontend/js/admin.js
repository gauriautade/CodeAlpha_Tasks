fetch("http://localhost:5000/api/orders/admin/all")
  .then(res => res.json())
  .then(orders => {
    const container = document.getElementById("admin-orders");

    if (orders.length === 0) {
      container.innerHTML = "<p>No orders yet</p>";
      return;
    }

    orders.forEach(order => {
      let products = "";

      order.products.forEach(p => {
        products += `<li>${p.name} × ${p.qty}</li>`;
      });

      container.innerHTML += `
        <div style="border:1px solid #ccc; padding:15px; margin:15px;">
          <h3>Customer: ${order.userId?.name}</h3>
          <p>Email: ${order.userId?.email}</p>
          <p>Total: ₹${order.total}</p>
          <p>Payment: ${order.payment}</p>
          <p>Address: ${order.address}</p>
          <ul>${products}</ul>
        </div>
      `;
    });
  });
