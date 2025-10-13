async function cargarPagina(pagina) {
    fetch(pagina)
        .then( response => {
            if (!response.ok) throw new Error("Error en la pagina");
            return response.text();
        }).then(html => {
            console.log("error la pagiana");
            console.log( html );
            document.getElementById("pagina").innerHTML = html;
        }).catch(error =>{
            document.getElementById("pagina").innerHTML = "<p>error la pagina no existe</p>";
            console.log(error);
        })
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
    cargarPagina("inicio.html");
    cargarMenu();
});
