
let numeroDePregunta = 0;
const botonSi = document.getElementById("si");
const botonNo = document.getElementById("no");
const botonAtras = document.getElementById("siguiente");


function actualizarPregunta() {
switch(numeroDePregunta) {
     case 0:
  document.querySelector(".recomendaciones").style.display = "none";
  document.querySelector(".correcto").style.display = "none";
  document.querySelector(".texto").style.display = "none";
  document.querySelector(".resumen").style.display = "none";




     document.querySelector(".chiquito").textContent = "Pregunta 1 de 6";
      document.querySelector(".barra").src="/img/barra1.png"
      document.querySelector(".chiquito2").textContent = "17%";
      document.querySelector(".equilibrio").textContent = "Equilibrio Vital";
       document.querySelector(".pregunta").textContent = "¿Te han indicado que tienes sobrepeso, glucosa elevada, colesterol alto o presión alta?";
         document.querySelector(".siguiente").textContent = "";
       break;
  case 1:
     document.querySelector(".chiquito").textContent = "Pregunta 2 de 6";
      document.querySelector(".barra").src="/img/barra2.png"
      document.querySelector(".chiquito2").textContent = "33%";
      document.querySelector(".equilibrio").textContent = "Bienestar interior";
       document.querySelector(".pregunta").textContent = "¿Presentas inflamación abdominal, estreñimiento o digestión pesada con frecuencia?";
       document.querySelector(".siguiente").textContent = "← Pregunta anterior";
    break;
  case 2:
 document.querySelector(".chiquito").textContent = "Pregunta 3 de 6";
   document.querySelector(".chiquito2").textContent = "50%";
     document.querySelector(".barra").src="/img/barra3.png"
         document.querySelector(".equilibrio").textContent = "Control & Balance Energía";
          document.querySelector(".pregunta").textContent = "¿Sientes fatiga frecuente o bajo nivel de energía durante el día?";

  break;
 case 3:
  document.querySelector(".chiquito").textContent = "Pregunta 4 de 6";
    document.querySelector(".chiquito2").textContent = "67%";
      document.querySelector(".barra").src="/img/barra4.png"
        document.querySelector(".equilibrio").textContent = "Control & Balance Estrés";
           document.querySelector(".pregunta").textContent = "¿Tu nivel de estrés es alto o duermes menos de 6–7 horas regularmente?";
    break;
     case 4:
 document.querySelector(".chiquito").textContent = "Pregunta 5 de 6";   
   document.querySelector(".chiquito2").textContent = "83%";
     document.querySelector(".barra").src="/img/barra5.png"
       document.querySelector(".equilibrio").textContent = "Rendimiento";
        document.querySelector(".pregunta").textContent = "¿Entrenas al menos 3 veces por semana o realizas actividad física intensa?";
 break;
     case 5:
 document.querySelector(".chiquito").textContent = "Pregunta 6 de 6";    
   document.querySelector(".chiquito2").textContent = "100%";
     document.querySelector(".barra").src="/img/barra6.png"
       document.querySelector(".equilibrio").textContent = "Movimiento Articular";
          document.querySelector(".pregunta").textContent = "¿Sientes molestias articulares, rigidez o recuperación lenta después de entrenar?";
 break;
     case 6:
                 document.querySelector(".container-abajo").style.height = "733px";

         document.querySelector(".resumen").style.display = "flex";
  document.querySelector(".recomendaciones").style.display = "flex";
    document.querySelector(".acomodar").style.display = "flex";
  document.querySelector(".final").style.display = "block";

  document.querySelector(".correcto").style.display = "block";
  document.querySelector(".texto").style.display = "flex";
     document.querySelector(".correcto").src="/img/correcto.png"
       document.querySelector(".equilibrio")?.remove();
              document.querySelector(".pregunta")?.remove();

       document.querySelector(".final").textContent = "¡Cuestionario Completado!";
              document.querySelector(".texto").textContent = "Hemos analizado tus respuestas y preparado recomendaciones personalizadas para ti.";
document.querySelector(".resumenTitulo").textContent =  "Resumen de tus respuestas:";
 document.querySelector(".resumenTexto1").textContent =  "¿Te han indicado que tienes sobrepeso, glucosa elevada, colesterol alto o presión alta?";
 
 document.querySelector(".resumenTexto2").textContent =  "¿Presentas inflamación abdominal, estreñimiento o digestión pesada con frecuencia?";
 
 document.querySelector(".resumenTexto3").textContent =  "¿Sientes fatiga frecuente o bajo nivel de energía durante el día?";
 
 document.querySelector(".resumenTexto4").textContent =  "¿Tu nivel de estrés es alto o duermes menos de 6–7 horas regularmente?";
 
 document.querySelector(".resumenTexto5").textContent =  "¿Entrenas al menos 3 veces por semana o realizas actividad física intensa?";
 document.querySelector(".resumenTexto6").textContent =  "¿Sientes molestias articulares, rigidez o recuperación lenta después de entrenar?";


         document.querySelector(".si")?.remove();     
         document.querySelector(".no")?.remove();     
           document.querySelector(".siguiente")?.remove();


    break;   
}}
function avanzar() {
   
   
  numeroDePregunta++;
  console.log(numeroDePregunta);
  actualizarPregunta();
  
}
function retroceder() {
   
    if (numeroDePregunta <= 0) return; 
  numeroDePregunta--;
  console.log(numeroDePregunta);
  actualizarPregunta();
  
}


let bloqueado = false;

function ejecutarSeguro(callback) {
  if (bloqueado) return;
  bloqueado = true;

  callback();

  setTimeout(() => {
    bloqueado = false;
  }, 120); 
}

botonSi.addEventListener("click", () => ejecutarSeguro(avanzar));
botonNo.addEventListener("click", () => ejecutarSeguro(avanzar));
botonAtras.addEventListener("click", () => ejecutarSeguro(retroceder));

