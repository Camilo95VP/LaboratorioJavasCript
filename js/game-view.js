import { escogerPreguntaAleatoria, oprimir_btn, nombre,getUserLocalStorage, mostrarInfo, cerrarSesion} from "../js/controllers.js"
/**
 * vista general del aplicativo, contiene toda la estructura html,
 * en este apartado se importan las funciones necesarias declaradas el el archivo controllers
 * @author Camilo Castañeda 
 */
export const controlView = () => { //funcion que inicia la aplicacion
    //contenedor principal de la app
    const containerApp = document.querySelector("#container-app")

    //contenedor nav y sus elementos 
    const containerNav = document.createElement("div");
    containerNav.id = "nav";
    const category = document.createElement("h1");
    category.id = "categoria"
    const score = document.createElement("h1");
    score.id = "puntaje"
    score.textContent = "SCORE:0"


    //contenedor de la pregunta
    const containerQuestions = document.createElement("div");
    containerQuestions.id = "cont-questions"
    const container = document.createElement("div");
    container.id = "container";
    const questions = document.createElement("h2");
    questions.id="pregunta"

    //Contenedor para los botones de respuestas
    const containerButtons = document.createElement("div");
    containerButtons.id = "container-buttons";
    const boton1 = document.createElement("div")
    boton1.classList.add("btn")
    boton1.id = "btn1"
    boton1.addEventListener("click",oprimir_btn) //evento click que llama la funcion oprimir_btn
    boton1.setAttribute('data-id', 0)            //se settea el atributo data-id con su respectivo indice
    const boton2 = document.createElement("div")
    boton2.classList.add("btn")
    boton2.id = "btn2"
    boton2.addEventListener("click",oprimir_btn) //evento click que llama la funcion oprimir_btn
    boton2.setAttribute('data-id', 1)            //se settea el atributo data-id con su respectivo indice
    const boton3 = document.createElement("div")
    boton3.classList.add("btn")
    boton3.id = "btn3"
    boton3.addEventListener("click",oprimir_btn) //evento click que llama la funcion oprimir_btn
    boton3.setAttribute('data-id', 2)            //se settea el atributo data-id con su respectivo indice
    const boton4 = document.createElement("div")
    boton4.classList.add("btn")
    boton4.id = "btn4"
    boton4.addEventListener("click",oprimir_btn) //evento click que llama la funcion oprimir_btn
    boton4.setAttribute('data-id', 3)            //se settea el atributo data-id con su respectivo indice

    containerButtons.append( boton1,boton2, boton3, boton4) //se agregan los botones al contenedor padre 
    
    //contenedor donde se almacenara la informacion, jugador y puntaje
    const containerInfo = document.createElement("div")
    containerInfo.id = 'container-info'
    const jugador = document.createElement("h3")
    jugador.id = 'info-jugador'
    jugador.innerHTML = "Jugador: "
    const historial = document.createElement('h3')
    historial.id = 'historial'
    historial.innerHTML = "Ultimo puntaje: " 

    containerInfo.append(jugador,historial)//se agrega jugador y historial(puntaje)

    //contenedor para cerrar la sesion
    const cerrarSesionContenedor = document.createElement("div")
    cerrarSesionContenedor.id = "cont-cerrar"
    const cerrarSesionBoton = document.createElement("h3")
    cerrarSesionBoton.id = "cerrar"
    cerrarSesionBoton.innerHTML = "Borrar historial"
    cerrarSesionBoton.addEventListener("click", cerrarSesion)//llamado a la funcion cerrarSesion
    cerrarSesionContenedor.append(cerrarSesionBoton)

    //contenedor de etiqueta #hashTag
    const copyRight = document.createElement("div");
    copyRight.id = "copyR"
    const copy = document.createElement("h6");
    copy.textContent="@QuienQuiereSerMillonario"
    copyRight.append(copy) //se agrega etiqueta a contendor padre

    const login = document.createElement("div")
    login.id = 'log'

    //seccion donde se arma la estructura en el orden correspondiente 
    container.append(questions);
    containerQuestions.append(container, containerButtons, containerInfo);
    containerNav.append(category, score);
    containerApp.append(containerNav, containerQuestions, cerrarSesionContenedor, copyRight)


    escogerPreguntaAleatoria() //funcion importada desde el archivo controllers, selecciona preguntas aleatorias
    getUserLocalStorage()     //funcion importada desde el archivo controllers, obtiene el usuario almacenado en el localStorage

    if(nombre == "") { //flujo de control para el registro de jugador
        alert("BIENVENID@ AL JUEGO INTERACTIVO DE PREGUNTAS Y RESPUESTAS, A CONTINUACION ESCRIBE TU NOMBRE DE JUGADOR -> ")
        const name = prompt("NOMBRE JUGADOR:")
        let nombre = name
        localStorage.setItem('nombre', nombre);
    }

    mostrarInfo()//muestra por pantalla la diferente informacion
}
