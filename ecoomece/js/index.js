
const produtos = [
  // --- Fila / Grupo de Creatinas (3 itens) ---
  { 
    nome: "Creatina Monohidratada 300g", 
    preco: 80.00, 
    estoque: 5, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },

  { 
    nome: "Creatina Hardcore 250g", 
    preco: 70.00, 
    estoque: 8, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },

  { 
    nome: "Creatina Creapure 300g", 
    preco: 110.00, 
    estoque: 4, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },

  // --- Fila / Grupo de Whey Proteins (2 itens) ---
  { 
    nome: "Whey Protein Concentrado 1kg", 
    preco: 120.00, 
    estoque: 3, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },

  { 
    nome: "Whey Protein Isolado 900g", 
    preco: 160.00, 
    estoque: 6, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },

  { 
    nome: "Whey Protein zero lactose 900g", 
    preco: 160.00, 
    estoque: 6, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },

  // --- Fila / Grupo de Pré-Treinos (3 itens) ---
  { 
    nome: "Pré-Treino Explosive 250g", 
    preco: 95.00, 
    estoque: 10, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },
  { 
    nome: "Pré-Treino Hórus 300g", 
    preco: 105.00, 
    estoque: 7, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  },
  { 
    nome: "Pré-Treino Venom 200g", 
    preco: 115.00, 
    estoque: 2, 
    imagem: "./imagms/Captura de tela 2026-10-08 201829.png" 
  }
];



const containerProdutos = document.querySelector('#lista-produtos');


for (let i = 0; i < produtos.length; i++) {
  let produto = produtos[i];

  containerProdutos.innerHTML += `
    <div class="card-produto">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="card-info">
        <h3>${produto.nome}</h3>
        <p class="estoque">Estoque disponível: ${produto.estoque} unidades</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-comprar">Comprar Produto</button>
      </div>
    </div>
  `;
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\separando\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const botoesComprar = document.querySelectorAll('.btn-comprar');
const contadorHtml = document.querySelector('.contador-carrinho');

let contadorCarrinho = 0;
let valorTotal = 0;

const precoSuplemento = 80;         // Number
const cupomAplicado = "MASARU10";     // String
const estoqueDisponivel = 100;          // Number

botoesComprar.forEach(function (botao) {
  botao.addEventListener('click', function (evento) {
    evento.preventDefault();

    // 1. Condicional para verificar o estoque antes de adicionar
    if (contadorCarrinho >= estoqueDisponivel) {
      console.log("❌ Estoque esgotado! Não é possível adicionar mais itens.");
      return; // Para a execução aqui se o estoque acabou
    }

    contadorCarrinho = contadorCarrinho + 1;
    valorTotal = valorTotal + precoSuplemento;

    contadorHtml.textContent = contadorCarrinho;

    console.log(`--- CLIQUE Nº ${contadorCarrinho} ---`);

    // 2. Condicional para verificar o frete grátis e dar um feedback
    let atingiuFreteGratis = (valorTotal >= 150);
    
    if (atingiuFreteGratis) {
      console.log(`🎁 Valor Total: R$ ${valorTotal},00 | PARABÉNS! Você ganhou FRETE GRÁTIS!`);
    } else {
      let faltaParaFrete = 150 - valorTotal;
      console.log(`📦 Valor Total: R$ ${valorTotal},00 | Faltam R$ ${faltaParaFrete},00 para o frete grátis.`);
    }
    
    console.log('----------------------------\n');
  });
});


