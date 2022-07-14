import { fnButton } from "../js/controllers.js"

export const controlView = () => {
    //contenedor general de la app
    const containerApp = document.querySelector("#container-app")

    //contenedor nav
    const containerNav = document.createElement("div");
    containerNav.id = "nav";
    const gamer = document.createElement("h1");
    gamer.textContent = "GAMER:juan"
    const score = document.createElement("h1");
    score.textContent = "SCORE:0"
    const round = document.createElement("h1");
    round.textContent = "ROUND:1"

    //contenedor preguntas
    const containerQuestions = document.createElement("div");
    containerQuestions.id = "cont-questions"
    const container = document.createElement("div");
    container.id = "container";
    const questions = document.createElement("h1");
    questions.id="preguntas"
    questions.textContent = "¿Capital de Rusia?"
    questions.addEventListener('click', fnButton)


    const buttonContinue = document.createElement("button")
    buttonContinue.id = "button"
    buttonContinue.textContent= "Next"

    const copyRight = document.createElement("div");
    copyRight.id = "copyR"
    const copy = document.createElement("h4");
    copy.textContent="@QuienQuiereSerMillonario"
    copyRight.append(copy)

    container.append(questions);
    containerQuestions.append(container, buttonContinue);
    containerNav.append(gamer, score,round);
    containerApp.append(containerNav, containerQuestions, copyRight)


}
