console.log("main.js loaded");

fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
  container.innerHTML += `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" class="product-img">

      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">₹${p.price}</p>

      <div class="btn-group">
        <a href="product.html?id=${p._id}" class="view-btn">
          View Details
        </a>

        <button 
          class="add-btn"
          onclick="addToCart('${p._id}', '${p.name}', ${p.price}, '${p.image}')">
          Add to Cart
        </button>
      </div>
    </div>
  `;
});

  });

function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart 🛒");
}


// 👁️ SHOW ADMIN LINK ONLY FOR ADMIN
const adminLink = document.getElementById("admin-link");
if (adminLink && localStorage.getItem("isAdmin") === "true") {
  adminLink.style.display = "inline-block";
}
