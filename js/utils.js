
const loader = document.getElementById("loader");
const msg = document.getElementById("mensagens");
const lista = document.getElementById("listaPokemon");

// loader
function mostrarLoading(status) {
    if (status) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
}


// Erros
function mostrarErro(status, txtMsg) { 
    if (status){
        lista.innerHTML= "";
        msg.innerHTML =
        `
        <div id="erros" class="erros">${txtMsg}</div>
        `;
        msg.classList.remove("hidden");
        div_paginacao.classList.add("hidden");
    } else {
        msg.innerHTML = "";
        msg.classList.add("hidden");
    }
}

