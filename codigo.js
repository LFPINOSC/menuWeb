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
            li.appendChild(a)
            menuList.appendChild(li)
        });
    } catch (error) {
        console.log("error al cargar el menu",error)
    }
    
}
cargarMenu();