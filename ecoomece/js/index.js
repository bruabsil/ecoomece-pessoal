const produtos = [
  // Creatinas
  {
    nome: "Creatina Monohidratada 300g",
    preco: 80.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  {
    nome: "Creatina Hardcore 250g",
    preco: 70.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  {
    nome: "Creatina Creapure 300g",
    preco: 110.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },

  // Whey proteins
  {
    nome: "Whey Protein Concentrado 1kg",
    preco: 120.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  {
    nome: "Whey Protein Isolado 900g",
    preco: 160.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  {
    nome: "Whey Protein zero lactose 900g",
    preco: 160.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },

  // Pre-treinos
  {
    nome: "Pré-Treino Explosive 250g",
    preco: 95.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  {
    nome: "Pré-Treino Hórus 300g",
    preco: 105.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  {
    nome: "Pré-Treino Venom 200g",
    preco: 115.00,
    estoque: 20,
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  }
];

const LIMITE_FRETE_GRATIS = 150;
const COMPRAS_PARA_FAVORITO = 5;
const containerProdutos = document.querySelector("#lista-produtos");
const contadorCarrinhoHtml = document.querySelector(".contador-carrinho");
const contadorFavoritosHtml = document.querySelector(".contador-favoritos");

let contadorCarrinho = 0;
let valorTotal = 0;

function renderizarProdutos() {
  containerProdutos.innerHTML = produtos.map((produto) => `
    <div class="card-produto">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="card-info">
        <h3>${produto.nome}</h3>
        <p class="estoque">Estoque disponível: ${produto.estoque} unidades</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <span class="coracao-favorito"></span>
        <button class="btn-comprar">Comprar Produto</button>
      </div>
    </div>
  `).join("");

  containerProdutos.querySelectorAll(".card-produto").forEach((card, indice) => {
    const produto = produtos[indice];

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

  contadorCarrinhoHtml.textContent = contadorCarrinho;
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
  if (!contadorFavoritosHtml) {
    return;
  }

  contadorFavoritosHtml.textContent = produtos.filter((produto) => produto.favorito).length;
}

renderizarProdutos();
atualizarBadgeFavoritos();



// ------------------------------------------------------//////////////////------------------------------------------------------------

const btnWhatsapp = document.querySelector('#btn-whatsapp');

if (btnWhatsapp) {
  btnWhatsapp.addEventListener('click', function (evento) {
    evento.preventDefault();

    if (contadorCarrinho === 0) {
      alert("O carrinho está vazio.");
      return;
    }

    // Número do WhatsApp do seu amigo (quem vai RECEBER o pedido)
    let telefoneLoja = ""; 

    // Mensagem base para a loja
    let mensagem = `🚨 *Novo Pedido Realizado no Site!*%0A%0A`;

    // Varre a lista de produtos para ver quais foram comprados
    let temItens = false;
    for (let i = 0; i < produtos.length; i++) {
      let prod = produtos[i];
      // Se comprou pelo menos 1 unidade deste produto nesta sessão
      if (prod.quantidadeComprada && prod.quantidadeComprada > 0) {
        mensagem += `• ${prod.quantidadeComprada}x ${prod.nome} (R$ ${(prod.preco * prod.quantidadeComprada).toFixed(2)})%0A`;
        temItens = true;
      }
    }

    if (!temItens) {
      alert("Nenhum produto foi selecionado ainda.");
      return;
    }

    mensagem += `%0A💰 *Valor Total:* R$ ${valorTotal.toFixed(2)}`;
    
    if (valorTotal >= 150) {
      mensagem += `%0A🎁 *Frete:* Grátis!`;
    }

    // Abre o WhatsApp do lojista já com o pedido mastigado
    window.open(`https://wa.me/${5516997013245}?text=${pedido}`, '_blank');
  });
}
