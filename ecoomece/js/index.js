const produtos = [
  // Creatinas
  {
    nome: "Creatina Monohidratada 300g",
    preco: 80.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Creatina"
  },
  {
    nome: "Creatina Hardcore 250g",
    preco: 70.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Creatina"
  },
  {
    nome: "Creatina Creapure 300g",
    preco: 110.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Creatina"
  },

  // Whey proteins
  {
    nome: "Whey Protein Concentrado 1kg",
    preco: 120.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Whey"
  },
  {
    nome: "Whey Protein Isolado 900g",
    preco: 160.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Whey"
  },
  {
    nome: "Whey Protein zero lactose 900g",
    preco: 160.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Whey"
  },

  // Pre-treinos
  {
    nome: "Pré-Treino Explosive 250g",
    preco: 95.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Pré-Treino"
  },
  {
    nome: "Pré-Treino Hórus 300g",
    preco: 105.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Pré-Treino"
  },
  {
    nome: "Pré-Treino Venom 200g",
    preco: 115.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false,
    categoria: "Pré-Treino"
  }
];

const LIMITE_FRETE_GRATIS = 150;
const COMPRAS_PARA_FAVORITO = 5;
const containerProdutos = document.querySelector("#lista-produtos");
const contadorCarrinhoHtml = document.querySelectorAll(".contador-carrinho"); // Pega todos os contadores do carrinho
const contadorFavoritosHtml = document.querySelector(".contador-favoritos");

let contadorCarrinho = 0;
let valorTotal = 0;

// ==========================================
// RENDERIZAR PRODUTOS
// ==========================================
function renderizarProdutos(listaProdutos = produtos) {
  if (!containerProdutos) return;

  containerProdutos.innerHTML = listaProdutos.map((produto) => `
    <div class="card-produto">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="card-info">
        <h3>${produto.nome}</h3>
        <p class="estoque">Estoque disponível: ${produto.estoque} unidades</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <span class="coracao-favorito ${produto.favorito ? 'favoritado' : ''}"></span>
        <button class="btn-comprar">Comprar Produto</button>
      </div>
    </div>
  `).join("");

  containerProdutos.querySelectorAll(".card-produto").forEach((card, indice) => {
    const produto = listaProdutos[indice];

    card.querySelector(".btn-comprar").addEventListener("click", (evento) => {
      evento.preventDefault();
      comprarProduto(produto, card);
    });

    card.querySelector(".coracao-favorito").addEventListener("click", (evento) => {
      alternarFavorito(produto, evento.currentTarget);
    });
  });
}

function comprarProduto(produto, card) {
  if (produto.estoque <= 0) {
    console.log(`❌ Estoque esgotado para "${produto.nome}".`);
    return;
  }

  contadorCarrinho += 1;
  valorTotal += produto.preco;
  produto.estoque -= 1;
  produto.quantidadeComprada += 1;

  // Atualiza todos os contadores de carrinho na tela
  contadorCarrinhoHtml.forEach(el => el.textContent = contadorCarrinho);

  card.querySelector(".estoque").textContent =
    `Estoque disponível: ${produto.estoque} unidades`;

  if (produto.quantidadeComprada >= COMPRAS_PARA_FAVORITO && !produto.favorito) {
    produto.favorito = true;
    card.querySelector(".coracao-favorito").classList.add("favoritado");
    atualizarBadgeFavoritos();
    console.log(`⭐ O produto "${produto.nome}" foi desbloqueado nos favoritos!`);
  }

  console.log(`--- CLIQUE Nº ${contadorCarrinho} ---`);

  if (valorTotal >= LIMITE_FRETE_GRATIS) {
    console.log(`🎁 Valor Total: R$ ${valorTotal.toFixed(2)} | PARABÉNS! Você ganhou FRETE GRÁTIS!`);
  } else {
    const faltaParaFrete = LIMITE_FRETE_GRATIS - valorTotal;
    console.log(`📦 Valor Total: R$ ${valorTotal.toFixed(2)} | Faltam R$ ${faltaParaFrete.toFixed(2)} para o frete grátis.`);
  }

  console.log("----------------------------\n");
}

function alternarFavorito(produto, coracao) {
  produto.favorito = !produto.favorito;
  coracao.classList.toggle("favoritado", produto.favorito);

  if (produto.favorito) {
    console.log(`⭐ ${produto.nome} foi adicionado aos favoritos manualmente!`);
  } else {
    console.log(`❌ ${produto.nome} foi removido dos favoritos!`);
  }

  atualizarBadgeFavoritos();
}

function atualizarBadgeFavoritos() {
  if (!contadorFavoritosHtml) return;
  contadorFavoritosHtml.textContent = produtos.filter((produto) => produto.favorito).length;
}


// ==========================================
// PAINEL DE FAVORITOS
// ==========================================
const btnFavoritosTopo = document.querySelector('#btn-favoritos');
const painelFavoritos = document.querySelector('#painel-favoritos');
const btnFecharFavoritos = document.querySelector('#btn-fechar-favoritos');
const overlayFavoritos = document.querySelector('#overlay-favoritos');
const listaFavoritosPainel = document.querySelector('#lista-favoritos-painel');

function abrirPainelFavoritos(e) {
  if (e) e.preventDefault();
  if (painelFavoritos) painelFavoritos.classList.add('ativo');
  if (overlayFavoritos) overlayFavoritos.classList.add('ativo');
  renderizarProdutosFavoritos(); 
}

function fecharPainelFavoritos() {
  if (painelFavoritos) painelFavoritos.classList.remove('ativo');
  if (overlayFavoritos) overlayFavoritos.classList.remove('ativo');
}

if (btnFavoritosTopo) btnFavoritosTopo.addEventListener('click', abrirPainelFavoritos);
if (btnFecharFavoritos) btnFecharFavoritos.addEventListener('click', fecharPainelFavoritos);
if (overlayFavoritos) overlayFavoritos.addEventListener('click', fecharPainelFavoritos);

function renderizarProdutosFavoritos() {
  if (!listaFavoritosPainel) return;
  listaFavoritosPainel.innerHTML = '';

  const produtosFavoritados = produtos.filter(p => p.favorito === true);

  if (produtosFavoritados.length === 0) {
    listaFavoritosPainel.innerHTML = '<p style="color: #aaa; text-align: center; margin-top: 20px;">Nenhum favorito ainda.</p>';
    return;
  }

  produtosFavoritados.forEach((prod) => {
    const indiceReal = produtos.indexOf(prod); 
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-favorito-card');
    
    itemDiv.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}" class="img-fav-painel">
      <div class="info-fav-painel">
        <h4>${prod.nome}</h4>
        <p>R$ ${prod.preco.toFixed(2)}</p>
      </div>
      <button class="btn-remover-fav" onclick="removerFavoritoPorIndice(${indiceReal})">❌</button>
    `;

    listaFavoritosPainel.appendChild(itemDiv);
  });
}

function removerFavoritoPorIndice(indiceReal) {
  const produto = produtos[indiceReal];
  produto.favorito = false;
  renderizarProdutos();
  atualizarBadgeFavoritos();
  renderizarProdutosFavoritos();
}


// ==========================================
// FILTRO DE CATEGORIAS
// ==========================================
const selectOpcao = document.querySelector('#opcao');

if (selectOpcao) {
  selectOpcao.addEventListener('change', (evento) => {
    const categoriaSelecionada = evento.target.value;
    if (categoriaSelecionada === 'todos' || categoriaSelecionada === '') {
      renderizarProdutos(produtos);
    } else {
      const produtosFiltrados = produtos.filter(p => p.categoria === categoriaSelecionada);
      renderizarProdutos(produtosFiltrados);
    }
  });
}


// ==========================================
// BARRA DE PESQUISA DINÂMICA
// ==========================================
const inputBusca = document.querySelector('#input-busca');

if (inputBusca) {
  inputBusca.addEventListener('input', (evento) => {
    const normalizar = (texto) => {
      return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };

    const termoBusca = normalizar(evento.target.value.trim());
    const produtosFiltrados = produtos.filter(p => 
      normalizar(p.nome).includes(termoBusca)
    );
    renderizarProdutos(produtosFiltrados);
  });
}


// ==========================================
// PAINEL DO CARRINHO DE COMPRAS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const btnCarrinhoTopo = document.querySelector('#btn-carrinho');
  const painelCarrinho = document.querySelector('#painel-carrinho');
  const btnFecharCarrinho = document.querySelector('#btn-fechar-carrinho');
  const overlayCarrinho = document.querySelector('#overlay-carrinho');

  function abrirPainelCarrinho(e) {
    if (e) e.preventDefault();
    if (painelCarrinho) painelCarrinho.classList.add('ativo');
    if (overlayCarrinho) overlayCarrinho.classList.add('ativo');
    renderizarCarrinhoPainel();
  }

  function fecharPainelCarrinho() {
    if (painelCarrinho) painelCarrinho.classList.remove('ativo');
    if (overlayCarrinho) overlayCarrinho.classList.remove('ativo');
  }

  if (btnCarrinhoTopo) btnCarrinhoTopo.addEventListener('click', abrirPainelCarrinho);
  if (btnFecharCarrinho) btnFecharCarrinho.addEventListener('click', fecharPainelCarrinho);
  if (overlayCarrinho) overlayCarrinho.addEventListener('click', fecharPainelCarrinho);

  // Inicializações na carga da página
  renderizarProdutos(produtos);
  atualizarBadgeFavoritos();
});

function renderizarCarrinhoPainel() {
  const listaCarrinhoPainel = document.querySelector('#lista-carrinho-painel');
  const precoTotalCarrinhoHtml = document.querySelector('#preco-total-carrinho');
  
  if (!listaCarrinhoPainel) return;

  listaCarrinhoPainel.innerHTML = '';

  const produtosNoCarrinho = produtos.filter(p => p.quantidadeComprada > 0);

  if (produtosNoCarrinho.length === 0) {
    listaCarrinhoPainel.innerHTML = '<p style="color: #aaa; text-align: center; margin-top: 20px;">Seu carrinho está vazio.</p>';
    if (precoTotalCarrinhoHtml) precoTotalCarrinhoHtml.textContent = 'R$ 0,00';
    return;
  }

  produtosNoCarrinho.forEach((prod) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-carrinho-card');

    const subtotal = prod.preco * prod.quantidadeComprada;

    itemDiv.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}" class="img-carrinho-painel">
      <div class="info-carrinho-painel">
        <h4>${prod.nome}</h4>
        <p>R$ ${prod.preco.toFixed(2)} x ${prod.quantidadeComprada}</p>
        <p class="subtotal">Subtotal: R$ ${subtotal.toFixed(2)}</p>
      </div>
    `;

    listaCarrinhoPainel.appendChild(itemDiv);
  });

  if (precoTotalCarrinhoHtml) {
    precoTotalCarrinhoHtml.textContent = `R$ ${valorTotal.toFixed(2)}`;
  }
}