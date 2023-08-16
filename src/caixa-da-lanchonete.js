class CaixaDaLanchonete {
    cardapio = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50
    };

    formasDePagamento = ["dinheiro", "debito", "credito"];

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let valorTotal = 0;
        const itensComQuantidade = {};

        for (const itemStr of itens) {
            const [codigo, quantidade] = itemStr.split(",");
            const itemValor = this.cardapio[codigo];

            if (!itemValor) {
                return "Item inválido!";
            }

            if (codigo !== "chantily" && codigo !== "queijo") {
                valorTotal += itemValor * quantidade;
                itensComQuantidade[codigo] = quantidade;
            } else if (!itensComQuantidade[codigo.replace("extra", "")] && codigo !== "extra") {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (Object.keys(itensComQuantidade).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (formaDePagamento === "dinheiro") {
            valorTotal *= 0.95; // Desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === "credito") {
            valorTotal *= 1.03; // Acréscimo de 3% para pagamento a crédito
        }

        return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };
