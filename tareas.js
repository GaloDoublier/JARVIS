
if(localStorage.getItem("tareas")){
    var tareas = JSON.parse(localStorage.getItem("tareas"))
}
else{
    var tareas= []
}

let a = document.querySelector(".a")
a.addEventListener("click",()=>agregarTarea())
function agregarTarea(){
    let rta=document.querySelector(".agregarTarea").value
    let unaTarea={
        tarea:rta,
        estado:false
    }
    document.getElementsByClassName('agregarTarea')[0].value="";
    if(rta==""){

      }
      else{

        tareas.push(unaTarea)
        localStorage.setItem("tareas",JSON.stringify(tareas))
      mostrarTareas();
      }
}
function eliminar(tareaAeliminar,elementoHTML){
    console.log(elementoHTML.textContent)
    elementoHTML.remove()
    tareas=tareas.filter(tarea =>tarea.tarea != tareaAeliminar.tarea)
    localStorage.setItem("tareas",JSON.stringify(tareas))
}
async function mostrarTareas(){
    let haytareas=localStorage.getItem("tareas")
    if(haytareas){
        let div=document.querySelector(".todo-list");
        div.innerHTML="";
        let tareasLS = JSON.parse(localStorage.getItem("tareas"))
        await tareasLS.forEach(tarea=>{
            let label=document.createElement("label")
            label.classList.add("todo-list__label")
            let input = document.createElement("input")
            input.type="checkbox"
            let i = document.createElement("i")
            i.classList.add("check")
            let span = document.createElement("span")
            span.textContent=tarea.tarea
            let icono=document.createElement("ion-icon")
            icono.style="margin-left: 50px;"
            icono.class="md hydrated"
            icono.name="trash-outline"
            icono.addEventListener("click",()=> eliminar(tarea,label))
            label.appendChild(input)
            label.appendChild(i)
            label.appendChild(span)
            label.appendChild(icono)
            div.appendChild(label)
            
        })
    }
    else{
        div=document.querySelector(".todo-list");
        div.innerHTML="";
        tareas.forEach(tarea=>{
            label=document.createElement("label")
            label.classList.add("todo-list__label")
            input = document.createElement("input")
            input.type="checkbox"
            i = document.createElement("i")
            i.classList.add("check")
            span = document.createElement("span")
            span.textContent=tarea.tarea
            icono=document.createElement("ion-icon")
            icono.style="margin-left: 50px;"
            icono.class="md hydrated"
            icono.name="trash-outline"
            label.appendChild(input)
            label.appendChild(i)
            label.appendChild(span)
            label.appendChild(icono)
            div.appendChild(label)
            
        })
    }
}
mostrarTareas();