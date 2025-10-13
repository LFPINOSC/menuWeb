window.initNoticias = function() {
    const noticia = document.getElementById('noticia');
    const anterior = document.getElementById("anterior");
    const paginaActual = document.getElementById("paginaActual");
    const siguiente = document.getElementById("siguiente");

    let noticias = [];
    let pagina_Actual = 1;
    const paginaPorPaginado = 4;

    async function cargarDataNoticias() {
        const response = await fetch("http://localhost:9090/api/noticia");
        noticias = await response.json();
        cargarNoticias();
    }

    function cargarNoticias() {
        noticia.innerHTML = '';
        const inicio = (pagina_Actual - 1) * paginaPorPaginado;
        const fin = inicio + paginaPorPaginado;
        const noticiasPorPagina = noticias.slice(inicio, fin);

        noticiasPorPagina.forEach(item => {
            const contenedor = document.createElement('div');
            contenedor.classList.add('producto');

            const titulo = document.createElement('h2');
            titulo.textContent = item.nombre;

            const img = document.createElement('img');
            img.src = item.urlImagen;

            const descripcion = document.createElement('p');
            descripcion.textContent = item.descripcion;

            contenedor.appendChild(titulo);
            contenedor.appendChild(img);
            contenedor.appendChild(descripcion);

            noticia.appendChild(contenedor);
        });
    }

    siguiente.addEventListener("click", () => {
        if ((pagina_Actual * paginaPorPaginado) < noticias.length) {
            pagina_Actual++;
            paginaActual.textContent = pagina_Actual;
            cargarNoticias();
        }
    });

    anterior.addEventListener("click", () => {
        if (pagina_Actual > 1) {
            pagina_Actual--;
            paginaActual.textContent = pagina_Actual;
            cargarNoticias();
        }
    });

    cargarDataNoticias();
}
