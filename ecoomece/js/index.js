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



































// document: É como você falar para o JS: "Olha pra folha inteira do meu arquivo HTML".

// querySelectorAll('.btn-comprar'): É a ordem específica: "Dentro dessa folha, encontra todos os elementos que estão marcados com a classe .btn-comprar".