// ========================================================
// AULA ANTERIOR: Contador simples de produtos
// ========================================================
/*
const botoesComprar = document.querySelectorAll('.btn-comprar');
let contadorCarrinho = 0;

botoesComprar.forEach(function (botao) {
  botao.addEventListener('click', function (evento) {
    evento.preventDefault();
    contadorCarrinho = contadorCarrinho + 1;
    console.log(`Valor atual do carrinho: ${contadorCarrinho}`);
  });
});
*/










// ========================================================
// AULA DE HOJE: Operadores de Comparação no E-commerce
// ========================================================

const botoesComprar = document.querySelectorAll('.btn-comprar');

let contadorCarrinho = 0;
let valorTotal = 0;

const precoSuplemento = 80;            // Number
const cupomAplicado = "MASARU10";     // String
const estoqueDisponivel = 5;          // Number

botoesComprar.forEach(function (botao) {
  botao.addEventListener('click', function (evento) {
    evento.preventDefault();

    contadorCarrinho = contadorCarrinho + 1;
    valorTotal = valorTotal + precoSuplemento;

    console.log(`--- CLIQUE Nº ${contadorCarrinho} ---`);

    // 1. Estritamente Igual (===)
    let eCupomOficial = (cupomAplicado === "MASARU10");
    console.log(`O cupom aplicado é o oficial da loja? ${eCupomOficial}`); 

    // 2. Estritamente Não Igual (!==)
    let estoqueFoiAlterado = (contadorCarrinho !== estoqueDisponivel);
    console.log(`O número de itens comprados é diferente do estoque total? ${estoqueFoiAlterado}`);

    // 3. Maior ou Igual (>=)
    let atingiuFreteGratis = (valorTotal >= 150);
    console.log(`Valor Total: R$ ${valorTotal},00 | Atingiu Frete Grátis? ${atingiuFreteGratis}`);

    // 4. Menor ou Igual (<=)
    let dentroDoEstoque = (contadorCarrinho <= estoqueDisponivel);
    console.log(`Quantidade comprada está dentro do limite do estoque? ${dentroDoEstoque}`);
    
    console.log('----------------------------\n');
  });
});



const valorCompra = 120;
const clienteLogado = true;

// O frete só é liberado se AMBAS as condições forem verdadeiras
const temFreteGratis = (valorCompra >= 100) && (clienteLogado === true);

console.log("Ganhou frete grátis? " + temFreteGratis); 
// Vai retornar: true (porque os dois lados deram bom)




// Dados simulados do carrinho

const precoProduto = 90.00; // Ex: Preço da Creatina
const quantidade = 2;       // Quantidade escolhida pelo usuário
const valorFrete = 15.00;   // Taxa fixa de entrega
const desconto = 10.00;     // Cupom de desconto em reais

// 1. Multiplicação (*) para achar o subtotal dos produtos
const subtotal = precoProduto * quantidade;

// 2. Subtração (-) para aplicar o desconto
const valorComDesconto = subtotal - desconto;

// 3. Adição (+) para somar o frete ao total final
const valorTotalFinal = valorComDesconto + valorFrete;

console.log("Subtotal: R$ " + subtotal);
console.log("Total com frete: R$ " + valorTotalFinal);






























// document: É como você falar para o JS: "Olha pra folha inteira do meu arquivo HTML".

// querySelectorAll('.btn-comprar'): É a ordem específica: "Dentro dessa folha, encontra todos os elementos que estão marcados com a classe .btn-comprar".