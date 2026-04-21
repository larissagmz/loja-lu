// 1. Array de produtos (Simulando um banco de dados ou API)
const produtos = [
    {
        id: 1,
        nome: "Monitor Gamer 24' 144Hz",
        preco: 1299.9,
        imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        categoria: "Periféricos",
    },
    {
        id: 2,
        nome: "Teclado Mecânico RGB",
        preco: 350.0,
        imagem: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
        categoria: "Periféricos",
    },
    {
        id: 3,
        nome: "Mouse Wireless Pro",
        preco: 280.0,
        imagem: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500",
        categoria: "Periféricos",
    },
    {
        id: 4,
        nome: "Headset Noise Cancelling",
        preco: 599.0,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        categoria: "Áudio",
    },
];

// 2. Seleção do container
const productGrid = document.getElementById("product-grid");

// 3. Função para renderizar os produtos
// Defina o número do WhatsApp (formato: DDI + DDD + Número, apenas dígitos)
const SEU_NUMERO_WHATSAPP = "5543985558908"; // Exemplo para Londrina (43)

function enviarWhatsApp(id) {
    // 1. Encontra o produto no array pelo ID
    const produto = produtos.find((p) => p.id === id);

    if (produto) {
        // 2. Cria a mensagem personalizada
        // encodeURIComponent garante que espaços e caracteres especiais funcionem na URL
        const mensagem = encodeURIComponent(
            `Olá! Gostaria de comprar o seguinte item: *${produto.nome}*\n` +
                `Preço: R$ ${produto.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })}`,
        );

        // 3. Monta o link final
        const urlWhatsApp = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${mensagem}`;

        // 4. Redireciona o usuário para o link (abre em uma nova aba)
        window.open(urlWhatsApp, "_blank");
    }
}

// Lembre-se de atualizar a chamada dentro da função renderizarProdutos:
// Onde estava: onclick="adicionarAoCarrinho(${produto.id})"
// Ficará assim:
function renderizarProdutos(lista) {
    productGrid.innerHTML = "";
    lista.forEach((produto) => {
        const card = `
            <article class="product-card">
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
                <div class="product-info">
                    <span style="font-size: 0.8rem; color: #666">${produto.categoria}</span>
                    <h2 class="product-name">${produto.nome}</h2>
                    <p class="product-price">R$ ${produto.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
                    <button class="btn-buy" onclick="enviarWhatsApp(${produto.id})">
                        Comprar via WhatsApp
                    </button>
                </div>
            </article>
        `;
        productGrid.innerHTML += card;
    });
}

const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// 1. Lógica de Expandir no Mobile
searchButton.addEventListener("click", (e) => {
    // Se estiver no mobile e não estiver ativo, abre o campo
    if (
        window.innerWidth <= 600 &&
        !searchContainer.classList.contains("active")
    ) {
        searchContainer.classList.add("active");
        searchInput.focus();
        e.preventDefault(); // Evita disparar a busca antes de digitar
    }
});

// Fecha o campo se clicar fora dele
document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
        searchContainer.classList.remove("active");
    }
});

// 2. Lógica de Pesquisa (Filtro)
searchInput.addEventListener("input", (e) => {
    const termoBusca = e.target.value.toLowerCase();

    // Filtra o array original baseado no nome ou categoria
    const produtosFiltrados = produtos.filter(
        (produto) =>
            produto.nome.toLowerCase().includes(termoBusca) ||
            produto.categoria.toLowerCase().includes(termoBusca),
    );

    // Re-renderiza apenas os produtos que batem com a busca
    renderizarProdutos(produtosFiltrados);
});

// [O restante do código de renderização permanece o mesmo do passo anterior]

// 4. Função de exemplo para o botão
function adicionarAoCarrinho(id) {
    const item = produtos.find((p) => p.id === id);
    alert(`O produto "${item.nome}" foi adicionado ao carrinho!`);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(produtos);
});
