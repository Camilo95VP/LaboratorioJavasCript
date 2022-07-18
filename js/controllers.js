import { data } from "../js/base-questions.js";
/**
 * Control general a traves de funciones para manipular la vista y correcto funcionamiento
 * del aplicativo, teniendo en cuenta la exportacion de cada una de las funciones necesarias en la vista.
 * @author Camilo Castañeda 
 */
let pregunta;              // Almacena las preguntas que vienen de la base de datos (base-questions)
let posibles_respuestas;   // Array que almacena las 4 opciones de respuestas por cada pregunta
let btn_correspondiente;   // Array que selecciona por id cada boton pulsado por el usuario
let miPuntaje;             // Puntaje acumulado a lo largo del juego
export let nombre = "";    // Nombre que sera almacenado en el LocalStorage()
export let puntaje = 0;    // Puntaje que sera almacenado en el localStorage()

/**
 * funcion encargada de seleccionar de la base de datos alguna pregunta aleatoria
 * se hace uso de la libreria Math.random() que genera un numero aleatorio
 */
export function escogerPreguntaAleatoria() {
  escogerPregunta(Math.floor(Math.random() * data.length));
}
/**
 * @param {int} posicionAleatoria - indice a consultar
 * esta funcion selecciona una pregunta aleatoria, una vez seleccionada
 * se indican las etiquetas html donde se pintaran la categoria y la pregunta
 * dentro de esta funcion se llama otra funcion (desordenarPreguntas) encargada de
 * desordenar las preguntas
 */
export function escogerPregunta(posicionAleatoria) {
  pregunta = data[posicionAleatoria];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  desordenarRespuestas(pregunta); 
}
/**
 * @param {string} pregunta - parametro que recibe la pregunta,
 * funcion que desordena las respuestas, se guardan en el array posibles_respuestas[], 
 * luego con el metodo sort() se desordenan
 * se selecciona cada etiqueta hatml donde se pintaran las respuestas
 */
export function desordenarRespuestas(pregunta) {

  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];

  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}
/**
 * @param {String} id - identificacion de la etiqueta html
 * @return {String} - getElementById()
 * funcion encargada de seleccionar por id cada etiqueta html que correspoda
 * de la funcion.
 */
export function select_id(id) {
  return document.getElementById(id);
}
/**
 * @param {string} id - identificacion de la etiqueta html
 * @returns {String} etiqueta seleccionada para aplicarle estilos
 */
export function style(id) {
  return select_id(id).style;
}
/**
 * @param {String} event - evento que se producira al pulsar un boton,
 * funcion encargada de verificar si la respuesta es correcta o no,
 * si es correcta el jugador obtendra 1000 puntos,
 * si no es correcta le restara 1000 setPuntos,
 * recibe la funcion setPuntos() actualiza puntos
 * recibe la funcion reiniciar() vuelve y genera una pregunta
 * se aplica setTimeout para tener la espera de 1 segundo y luego continuar
 */
export function oprimir_btn(event) {

  const score = select_id("puntaje");

  btn_correspondiente = [                                                        //arra que obtiene los botones pulsados
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4"),
  ];

  if (posibles_respuestas[event.target.dataset.id] == pregunta.respuesta) {      //respuesta correcta
    btn_correspondiente[event.target.dataset.id].style.background = "lightgreen";// si es correcta se pinta el boton en verde
    let splitScore = score.innerHTML.split(":");
    miPuntaje = parseInt(splitScore[1]) + 1000;
    score.innerHTML = splitScore[0] + " : " + miPuntaje;
  }

  if (posibles_respuestas[event.target.dataset.id] != pregunta.respuesta) {      //respuesta incorrecta
    btn_correspondiente[event.target.dataset.id].style.background = "pink";      // si es incorrecta se pinta el boton en rojo
    if(miPuntaje>0){
      let splitScore = score.innerHTML.split(":");
      miPuntaje = parseInt(splitScore[1]) - 1000;
      score.innerHTML = splitScore[0] + " : " + miPuntaje;
    } else if(miPuntaje<0){
        miPuntaje = 0;
        if(puntaje == 'undefined'){
           puntaje = 0
        }
    }
  }

  setPuntos(miPuntaje);                                                           //llamado de funcion externa

  setTimeout(() => {
    reiniciar();
  }, 3000);
}
/**
 * @param {int} puntos - puntos que se almacenaran,
 * funcion local envia los puntos acumulados al localStorage
 */
function setPuntos(puntos) {
  puntaje = puntos;
  localStorage.setItem("puntos", puntaje);
}
/**
 * reinicia el juego cada vez que se ha seleccionado una respuesta,
 * a traves del llamado a la funcion escogerPreguntaAleatoria();
 */
export function reiniciar() {
  for (const btn of btn_correspondiente) { //recorre cada boton del array y le aplica el color blanco
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}
/**
 * @return {String} nombre del usuario guardado
 * funcion que obtiene el usuario guardado en el localStorage()
 */
export function getUserLocalStorage() {
  let tempUser = localStorage.getItem("nombre") || null;
  if(!tempUser) { //verifica que el usuario exista
    localStorage.setItem("nombre", nombre);
    setPuntos(miPuntaje);
  } else {
    nombre = tempUser;
  }

  return nombre;  //nombre del usuario
}
/**
 * funcion encargada de mostrar los datos que se van almacenando,
 * como el nombre de usuario y el puntaje
 */
export function mostrarInfo() {

  const nJugador = select_id("info-jugador");
  let splitJugador = nJugador.innerHTML.split(":");
  let miNombre = localStorage.getItem("nombre");
  nJugador.innerHTML = splitJugador[0] + " : " + miNombre;
  const historialJugador = select_id("historial");
  let miHistorial = localStorage.getItem("puntos");

  if (miHistorial == 'undefined') {
    let splitHistorial = historialJugador.innerHTML.split(":");
    historialJugador.innerHTML = splitHistorial[0] + " : " + 0;
    puntaje = 0
  } else {
    let splitHistorial = historialJugador.innerHTML.split(":");
    historialJugador.innerHTML = splitHistorial[0] + " : " + miHistorial;
  }
}
/**
 * cierra la sesion, primero se limpia el local Storage y luego se reinica,
 * para pedir de nuevo el nombre de usuario
 */
export function cerrarSesion() {
  localStorage.clear();
  location.reload();
}
