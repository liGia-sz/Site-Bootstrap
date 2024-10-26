let cart = [];

// Função para adicionar itens ao carrinho e exibir toast
function addToCart(productName, productPrice) {
    const item = cart.find((i) => i.name === productName);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    showToast("Produto adicionado ao carrinho!");
    saveCart();
}

// Função para salvar o carrinho no localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Função para carregar o carrinho do localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Função para exibir conteúdo do carrinho na página de carrinho
function displayCart() {
    loadCart();  // Carrega o carrinho salvo
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = ""; // Limpa o conteúdo anterior

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Carrinho está vazio.</p>";
        return;
    }

    let total = 0;
    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartContainer.innerHTML += `<p>${item.name} (x${item.quantity}): R$${itemTotal.toFixed(2)}</p>`;
    });

    cartContainer.innerHTML += `<p><strong>Total: R$${total.toFixed(2)}</strong></p>`;
}

// Função para finalizar o pedido
function checkout() {
    if (cart.length === 0) {
        alert("O carrinho está vazio.");
        return;
    }
    alert("Pedido finalizado!");
    cart = [];
    saveCart();
    displayCart();
}

// Função para exibir o toast
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Carregar o carrinho ao carregar a página de carrinho
window.onload = () => {
    if (document.getElementById("cart")) {
        displayCart();
    }
};
