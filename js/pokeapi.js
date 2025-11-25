

async function buscarPokemon(txtPesquisa) {
    mostrarLoading(true);   
    try {
    
        if (!txtPesquisa) {
            mostrarErro(true, "Digita um nome ou iD");
            return;
        }

        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${txtPesquisa}`)

        // trata erros
        if(resposta.status == 404) {
            throw new Error("Pokemon não encontrado!");
        }

        const dados = await resposta.json();

        //montar lista
        criarCards([dados])
        txt_pag_atual.innerHTML = `Página 1`;
        div_paginacao.classList.add("hidden");

        
    } catch (erro) {
        mostrarErro(true, erro.message);
        
    } finally {
        mostrarLoading(false);
    }
}

async function listarTodos(pagina) {
    const offset = (pagina - 1) * limit;
    mostrarLoading(true);
    
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const dados = await resposta.json();

        // buscar item individualmente
        const itens = await Promise.all(
            dados.results.map(async iten => {
                const r = await fetch(iten.url);
                return r.json();
            })
        );
        
        criarCards(itens);

        txt_pag_atual.innerHTML = `Página ${pagina}`;

    } catch(erro) {
        mostrarErro(true, "Erro ao carregar pagina");
    } finally {
        mostrarLoading(false);
    }

}