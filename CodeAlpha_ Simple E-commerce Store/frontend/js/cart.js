let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("total");
const itemCountDiv = document.getElementById("item-count");

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='empty'>Your cart is empty 🛒</p>";
    totalDiv.innerText = "0";
    itemCountDiv.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        
        <div class="cart-details">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>

          <div class="qty-controls">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  totalDiv.innerText = total;
  itemCountDiv.innerText = count;
}

function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
