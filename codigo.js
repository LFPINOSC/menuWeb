
async function cargarPagina(pagina) {
    try {
       const response = await fetch(pagina);
       if (!response.ok) throw new Error("Error en la página");
       const html = await response.text();
       document.getElementById("pagina").innerHTML = html;
       if (pagina === "noticias.html") {
            if (window.initNoticias) {
                window.initNoticias();
            } else {
                console.error("initNoticias no está definido todavía");
            }
        }
    } catch (error) {
        document.getElementById("pagina").innerHTML = "<p>Error: la página no existe</p>";
        console.log(error);
    }
}


async function cargarMenu() {
    try {
        const response = await fetch("http://localhost:9090/api/menu", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            }
        });
        const data= await response.json();
        console.log(data)
        const menuList=document.getElementById("menu_principal")
        menuList.innerHTML="";
        data.forEach(element => {
            const li=document.createElement("li")
            const a=document.createElement("a")
            a.textContent = element.nombre
            a.href="#"
            a.onclick=()=>cargarPagina(element.url)
            li.appendChild(a)
            menuList.appendChild(li)
        });
    } catch (error) {
        console.log("error al cargar el menu",error)
    }
    
}


document.addEventListener("DOMContentLoaded", () => {
    
    const anterior=document.getElementById("anterior");
    const paginaActual=document.getElementById("paginaActual");
    const siguiente=document.getElementById("siguiente");
    
    
    cargarPagina("inicio.html");
    cargarMenu();
    
});
