

const produtos = [
  // --- Fila / Grupo de Creatinas (3 itens) ---
  { 
    nome: "Creatina Monohidratada 300g", 
    preco: 80.00, 
    estoque: 5, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0, 
    favorito: false 
  },
  { 
    nome: "Creatina Hardcore 250g", 
    preco: 70.00, 
    estoque: 8, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  { 
    nome: "Creatina Creapure 300g", 
    preco: 110.00, 
    estoque: 4, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },

  // --- Fila / Grupo de Whey Proteins (3 itens) ---
  { 
    nome: "Whey Protein Concentrado 1kg", 
    preco: 120.00, 
    estoque: 3, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  { 
    nome: "Whey Protein Isolado 900g", 
    preco: 160.00, 
    estoque: 6, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  { 
    nome: "Whey Protein zero lactose 900g", 
    preco: 160.00, 
    estoque: 6, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },

  // --- Fila / Grupo de Pré-Treinos (3 itens) ---
  { 
    nome: "Pré-Treino Explosive 250g", 
    preco: 95.00, 
    estoque: 10, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  { 
    nome: "Pré-Treino Hórus 300g", 
    preco: 105.00, 
    estoque: 7, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  },
  { 
    nome: "Pré-Treino Venom 200g", 
    preco: 115.00, 
    estoque: 2, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png",
    quantidadeComprada: 0,
    favorito: false
  }
];

// 1. Seleciona o container ANTES do loop
const containerProdutos = document.querySelector('#lista-produtos');

// 2. Loop para renderizar os cards na tela
for (let i = 0; i < produtos.length; i++) {
  let produto = produtos[i];

  containerProdutos.innerHTML += `
    <div class="card-produto">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="card-info">
        <h3>${produto.nome}</h3>
        <p class="estoque">Estoque disponível: ${produto.estoque} unidades</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        
        <span class="coracao-favorito">🤍</span> 

        <button class="btn-comprar">Comprar Produto</button>
      </div>
    </div>
  `;
}

// ------------------------------------------------------------

const botoesComprar = document.querySelectorAll('.btn-comprar');
const contadorHtml = document.querySelector('.contador-carrinho');

let contadorCarrinho = 0;
let valorTotal = 0;
const cupomAplicado = "MASARU10";

// 3. Evento de clique para os botões de compra
botoesComprar.forEach(function (botao, indice) {
  const produto = produtos[indice];

  botao.addEventListener('click', function (evento) {
    evento.preventDefault();

    if (produto.estoque <= 0) {
      console.log(`❌ Estoque esgotado para "${produto.nome}".`);
      return; 
    }

    contadorCarrinho = contadorCarrinho + 1;
    valorTotal = valorTotal + produto.preco;
    produto.estoque = produto.estoque - 1;
    produto.quantidadeComprada = (produto.quantidadeComprada || 0) + 1;

    // Atualiza o contador geral e o texto de estoque do card
    contadorHtml.textContent = contadorCarrinho;
    botao.closest('.card-produto').querySelector('.estoque').textContent =
      `Estoque disponível: ${produto.estoque} unidades`;

    // LÓGICA DO FAVORITO: Ativa só se comprou 5 ou mais
    if (produto.quantidadeComprada >= 5 && !produto.favorito) {
      produto.favorito = true;
      console.log(`⭐ O produto "${produto.nome}" foi desbloqueado nos favoritos!`);
      
      const coracao = botao.closest('.card-produto').querySelector('.coracao-favorito');
      coracao.classList.add('ativo'); 
      coracao.textContent = '❤️'; 
    }

    console.log(`--- CLIQUE Nº ${contadorCarrinho} ---`);

    let atingiuFreteGratis = (valorTotal >= 150);
    
    if (atingiuFreteGratis) {
      console.log(`🎁 Valor Total: R$ ${valorTotal.toFixed(2)} | PARABÉNS! Você ganhou FRETE GRÁTIS!`);
    } else {
      let faltaParaFrete = 150 - valorTotal;
      console.log(`📦 Valor Total: R$ ${valorTotal.toFixed(2)} | Faltam R$ ${faltaParaFrete.toFixed(2)} para o frete grátis.`);
    }

    console.log('----------------------------\n');
  });
});