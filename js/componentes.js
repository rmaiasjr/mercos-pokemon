function criarCards(dados) {
    
    const lista = document.getElementById('listaPokemon');
    lista.innerHTML = "";

    dados.forEach(p => {    
        const card = document.createElement("div");
        card.classList.add("card")
        
        // conversões
        p.height = (p.height / 10) + " m"; // altura em metros
        p.weight = (p.weight / 10) + " kg"; // peso em kg
        
        
        // tag com os tipos
        p.types = p.types
        .map(t => `<span class="tag-tipo ${t.type.name}">${t.type.name}</span>`).join(" ");
                
    
        // elementos do card
        card.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; text-align: center;">
                <img src="${p.sprites?.other?.['official-artwork']?.front_default || p.sprites.front_default}" alt="${p.name}">
                <div class="tipos">${p.types}</div>
                </div>
            <h4>Nome: ${p.name}</h4>
            <p><strong>Altura:</strong> ${p.height}</p>
            <p><strong>Peso:</strong> ${p.weight}</p>
        `;
        
        card.onclick = () => abrirModal(p);

        lista.appendChild(card);
    });
    
}

// modal com detalhes do pokemon
function abrirModal(pokemon) {
    let modalDetalhes = document.getElementById("detalhePokemon");
    let p = pokemon;

    modalDetalhes.innerHTML = 
    `
        <br>
        <!-- informações do card -->
        <div class="modal-info-card">
            
            <div name="col-esquerda" style="display: flex; flex-direction: column; align-items: center;">
                <img src="${p.sprites?.other?.['official-artwork']?.front_default || p.sprites.front_default}" style="max-width:140px; "/>
            </div>          
            
            <div name="col-direita" style=" text-align: center; ">
                <h2 style="margin: 0 0 15px 0;">${p.name}</h2>
                <div class="tipos">${p.types}</div>
                <p><strong>Altura:</strong> ${p.height}</p>  
                <p><strong>Peso:</strong> ${p.weight}</p>
            </div>
        
        </div>
        
        <!-- informações adicionais -->
        <div class="modal-info-adicional">
            <div>
                <h4>Habilidades:</h4> 
                ${p.abilities.map(a=>a.ability.name).join('<br>')}
            </div>

            <div>
                <h4>Base stats:</h4>
                <div setyle="text-align: left;">
                    ${p.stats.map(s=>`<div style="min-width:90px" class="muted">${s.stat.name}: <strong >${s.base_stat}</strong></div>`).join('')}
                </div>
            </div>
        </div>
    `;
    document.getElementById("modalDetalhes").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}


document.getElementById("fecharModal").onclick = function() {
    document.getElementById("modalDetalhes").classList.add("hidden");
    document.body.style.overflow = "";
}

document.getElementById("modalDetalhes").onclick = function(e) {
    if (e.target === this) {
        this.classList.add("hidden");
        document.body.style.overflow = "";
    }
}