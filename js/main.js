// DOM

const txt_pag_atual = document.getElementById("pgAtual");
const div_paginacao = document.getElementById("paginacao");

let paginaAtual = 1;
const limit = 20;

async function filtrarPokemon({pg, termo}){
    const pagina = pg
    const valor_pesquisa = termo
        
    mostrarErro(false);
    
    if (valor_pesquisa){
        buscarPokemon(valor_pesquisa)
    } else {
        listarTodos(pagina)
        div_paginacao.classList.remove("hidden")
    }

}

// ------ EVENTOS ------
// ação do botão para pesquisar polemon
document.getElementById("btnBuscar").addEventListener("click", () => {
    const valor_pesquisa = document.getElementById("textoPesquisa").value.trim().toLowerCase();
    
    paginaAtual = 1;
    filtrarPokemon({pg: paginaAtual, termo: valor_pesquisa});
});

// botão próximo
document.getElementById("btnProximo").addEventListener("click", () => {
    paginaAtual++;
    filtrarPokemon({pg: paginaAtual});
});

// botão anterior
document.getElementById("btnAnterior").addEventListener("click", () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        filtrarPokemon({pg: paginaAtual});
    }
});


// inicialização
filtrarPokemon({pg: paginaAtual});