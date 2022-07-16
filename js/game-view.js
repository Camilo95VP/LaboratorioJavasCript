import { escogerPreguntaAleatoria, oprimir_btn, usuario, getUserLocalStorage} from "../js/controllers.js"

export const controlView = () => {

    //contenedor general de la app
    const containerApp = document.querySelector("#container-app")

    //contenedor nav
    const containerNav = document.createElement("div");
    containerNav.id = "nav";
    const category = document.createElement("h1");
    category.id = "categoria"


    const score = document.createElement("h1");
    score.id = "puntaje"
    score.textContent = "SCORE:0"


    //contenedor pregunta
    const containerQuestions = document.createElement("div");
    containerQuestions.id = "cont-questions"
    const container = document.createElement("div");
    container.id = "container";
    const questions = document.createElement("h2");
    questions.id="pregunta"


    const containerButtons = document.createElement("div");
    containerButtons.id = "container-buttons";

    const boton1 = document.createElement("div")
    boton1.classList.add("btn")
    boton1.id = "btn1"
    boton1.addEventListener("click",oprimir_btn)
    boton1.setAttribute('data-id', 0)
    const boton2 = document.createElement("div")
    boton2.classList.add("btn")
    boton2.id = "btn2"
    boton2.addEventListener("click",oprimir_btn)
    boton2.setAttribute('data-id', 1)
    // boton2.addEventListener("click",oprimir_btn(1))
    const boton3 = document.createElement("div")
    boton3.classList.add("btn")
    boton3.id = "btn3"
    boton3.addEventListener("click",oprimir_btn)
    boton3.setAttribute('data-id', 2)
    // boton3.addEventListener("click",oprimir_btn(2))
    const boton4 = document.createElement("div")
    boton4.classList.add("btn")
    boton4.id = "btn4"
    boton4.addEventListener("click",oprimir_btn)
    boton4.setAttribute('data-id', 3)
    // boton4.addEventListener("click",oprimir_btn(3))

    containerButtons.append( boton1,boton2, boton3, boton4)


    const copyRight = document.createElement("div");
    copyRight.id = "copyR"
    const copy = document.createElement("h4");
    copy.textContent="@QuienQuiereSerMillonario"
    copyRight.append(copy)

    container.append(questions);
    containerQuestions.append(container, containerButtons);
    containerNav.append(category, score);
    containerApp.append(containerNav, containerQuestions, copyRight)


    escogerPreguntaAleatoria()
    getUserLocalStorage()

    if(usuario.nombre == "") {
        const name = prompt('Ingresa el nombre: ')
        usuario.nombre = name
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
}
