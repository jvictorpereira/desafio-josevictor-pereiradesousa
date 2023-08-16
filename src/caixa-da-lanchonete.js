export default class CaixaDaLanchonete {
    
    calcularValorDaCompra(formaDePagamento, itens) {
      const cardapio = {
        'cafe': { descricao: 'Café', valor: 3.00 },
        'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        'suco': { descricao: 'Suco Natural', valor: 6.20 },
        'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
        'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        'salgado': { descricao: 'Salgado', valor: 7.25 },
        'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
      };
  
      const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];
  
      if (!formasDePagamentoValidas.includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      let totalCompra = 0;
      const itensPrincipais = new Set();
  
      for (const itemInfo of itens) {
        const [codigo, quantidade] = itemInfo.split(',');
        const item = cardapio[codigo];
  
        if (!item) {
          return "Item inválido!";
        }
  
        if (!item.descricao.includes("extra")) {
          itensPrincipais.add(codigo);
        }
  
        totalCompra += item.valor * quantidade;
      }
  
      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      if (totalCompra === 0) {
        return "Quantidade inválida!";
      }
  
      for (const itemInfo of itens) {
        const [codigo, _] = itemInfo.split(',');
  
        if (cardapio[codigo].descricao.includes("extra")) {
            const codigoPrincipal = cardapio[codigo].descricao.split(" (")[1].split(" do ")[1].replace(")", "");
  
            if (!itensPrincipais.has(codigoPrincipal)) {
                return `Item extra ${cardapio[codigo].descricao} não pode ser pedido sem o principal`;
            }
        }
      }
    
      if (formaDePagamento === 'dinheiro') {
        totalCompra *= 0.95; // Desconto de 5% para pagamento em dinheiro
      } else if (formaDePagamento === 'credito') {
        totalCompra *= 1.03; // Acréscimo de 3% para pagamento a crédito
      }
  
      return `R$ ${totalCompra.toFixed(2).replace('.', ',')}`;
    }
  }
  