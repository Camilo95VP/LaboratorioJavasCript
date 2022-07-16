import { data } from "../js/base-questions.js";

let pregunta;
let posibles_respuestas;
let  btn_correspondiente;
let miPuntaje;
export let usuario = {nombre: "", 
                 puntos: 0}

export const fnButton = () => {
  const questions = document.querySelector("#pregunta");
  questions.textContent = "cambiando ...";
};

export function escogerPreguntaAleatoria() {
  escogerPregunta(Math.floor(Math.random() * data.length));
  //localStorage.setItem('pregunta', pregunta.pregunta);
  // let preguntaa = localStorage.getItem('pregunta')
  // console.log(preguntaa)
}

export function escogerPregunta(n) {
  pregunta = data[n];
  console.log(pregunta);
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  desordenarRespuestas(pregunta);

}



export function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];

  console.log(posibles_respuestas);
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

export function select_id(id) {
  return document.getElementById(id);
}

export function style(id) {
  return select_id(id).style;
}

export function oprimir_btn(event) {
  
 btn_correspondiente  = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4"),
  ];
  if (posibles_respuestas[event.target.dataset.id] == pregunta.respuesta) {
     btn_correspondiente[event.target.dataset.id].style.background = "lightgreen"
     const score = select_id("puntaje")
     let splitScore = score.innerHTML.split(':')
     miPuntaje = parseInt(splitScore[1])+10;
     score.innerHTML = splitScore[0]+' : ' + miPuntaje;

  } else {
     btn_correspondiente[event.target.dataset.id].style.background = "pink" 
     const score = select_id("puntaje")
     let splitScore = score.innerHTML.split(':')
     miPuntaje = parseInt(splitScore[1])-10;
     score.innerHTML = splitScore[0]+' : ' + miPuntaje;
  }
  setTimeout(() => {
    reiniciar()
  }, 2000);

}

export function reiniciar(){
  for(const btn of btn_correspondiente){
    btn.style.background = 'white'
  } 
  escogerPreguntaAleatoria();
}


export function getUserLocalStorage(){

  let tempUser = JSON.parse(localStorage.getItem("usuario")) || null;
  

  if(!tempUser){
    localStorage.setItem("usuario", JSON.stringify(usuario));
 } else {
   usuario = tempUser;
 }

 return usuario
}

export function mostrarInfo(){

  const nJugador = select_id("info-jugador")
  let splitJugador = nJugador.innerHTML.split(':')
  let miNombre = usuario.nombre;
  nJugador.innerHTML = splitJugador[0]+' : ' + miNombre;
  
  const historialJugador = select_id("historial")
  let splitHistorial = historialJugador.innerHTML.split(':')
  let miHistorial = usuario.puntos;
  historialJugador.innerHTML = splitHistorial[0]+' : ' + miHistorial;

}

export function cerrarSesion(){
  localStorage.clear();
  location.reload();
}


