import { data } from '../js/base-questions.js'


export const fnButton = () => {
    const questions = document.querySelector('#pregunta');
    questions.textContent = "cambiando ..." 

}

export function escogerPreguntaAleatoria() {
     escogerPregunta(Math.floor(Math.random() * data.length));
}

export function escogerPregunta(n){
   let pregunta =data[n]
   console.log(pregunta)
   select_id('categoria').innerHTML = pregunta.categoria
   select_id('pregunta').innerHTML = pregunta.pregunta
}

export function select_id(id) {
    return document.getElementById(id);  
  }
  
export function style(id) {
    return select_id(id).style;
  }
  