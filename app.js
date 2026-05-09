let medicamentos = [];
const buscador = document.getElementById("buscador");

async function cargarMedicamentos() {
    try {
        const response = await fetch('medicamentos.json?t=' + Date.now());
        medicamentos = await response.json();
        mostrarMedicamentos(medicamentos);
        localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
    } catch(error) {
        const guardados = localStorage.getItem('medicamentos');
        if (guardados) {
            medicamentos = JSON.parse(guardados);
            mostrarMedicamentos(medicamentos);
        } else {
            document.getElementById('estado-carga').textContent = "⚠️ Sin conexión. Intenta de nuevo más tarde.";
        }
    }

    setTimeout(function(){
        if (medicamentos.length === 0) {
            document.getElementById('estado-carga').textContent = "⚠️ Sin conexión. Intenta de nuevo más tarde.";
        }
    }, 15000);
}

function mostrarMedicamentos(lista) {
    const container = document.getElementById("lista-medicamentos");
    container.innerHTML = "";
    document.getElementById('estado-carga').style.display = "none";

    lista.forEach(function(medicamento){
        container.innerHTML += `
<div class="tarjeta">
    <h3>${medicamento.Nombre}</h3>
    <p class="info">${medicamento.Presentacion} · ${medicamento.Dosis}</p>
    <p class="precio">${medicamento.Precio} CUP</p>
    <p class="${medicamento.Estado === 'Disponible' ? 'disponible' : 'proximamente'}">
        ${medicamento.Estado === 'Disponible' ? '✅ Disponible' : '🕐 ' + medicamento.Fecha}
    </p>
    <a class="btn-whatsapp" href="https://wa.me/+5358270890?text=Hola,%20quiero%20comprar%20${encodeURIComponent(medicamento.Nombre)}%20${encodeURIComponent(medicamento.Dosis)}" target="_blank">📲 Pedir por WhatsApp</a>
</div>`;
    });
}

cargarMedicamentos();

buscador.addEventListener('input', function(event){
    const texto = event.target.value;
    const filtrados = medicamentos.filter(function(medicamento){
        return medicamento.Nombre.toLowerCase().includes(texto.toLowerCase());
    });
    mostrarMedicamentos(filtrados);
});
