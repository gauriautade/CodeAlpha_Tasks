const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.body.innerHTML = "<h2>Product not found</h2>";
}

fetch(`http://localhost:5000/api/products/${id}`)
  .then(res => res.json())
  .then(p => {
    const div = document.getElementById("product-details");

    div.innerHTML = `
      <div class="details-card">
        <img src="${p.image}">
        <div class="info">
          <h1>${p.name}</h1>
          <p class="price">₹${p.price}</p>
          <p>${p.description}</p>

          <button onclick="addToCart('${p._id}', '${p.name}', ${p.price}, '${p.image}')">
            Add to Cart
          </button>
        </div>
      </div>
    `;
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
