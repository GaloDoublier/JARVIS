let btnStart = document.querySelector("#arc_container")



btnStart.addEventListener("click",()=>{
     reconocedor.start()  
})

const reconocedorVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
reconocedorVoz.lang = 'en-US';

const reconocedor = new reconocedorVoz();
let frenar = false;
reconocedor.onstart = function(){
}
reconocedor.onend = function(){
    if(frenar==false){
        reconocedor.start()
    }
}

reconocedor.onresult= function (e){
    var transcript =  e.results[0][0].transcript
    transcript = transcript.toLowerCase()
    console.log("jarvis escuchó: "+transcript)
    if (window.speechSynthesis.getVoices().length) {
        responder(transcript)
      } else {
        speechSynthesis.addEventListener('voiceschanged',responder(transcript));
      }
}

function Hablar(message){

    setTimeout(()=>{
        const Speech = new SpeechSynthesisUtterance(message);
        console.log("Jarvis dice:  "+message)
        Speech.voice = window.speechSynthesis.getVoices()[9]
        Speech.volume = 1; // 0 to 1
        Speech.rate = 1.1; // 0.1 to 10
        Speech.pitch = 0.8; //0 to 2
        window.speechSynthesis.speak(Speech);
    },50)
    



    btnStart.style.animation=" pulsate infinite 0.7s linear";
    setTimeout(()=>{
        btnStart.style.animation=" pulsate infinite 3.5s ease-in-out";
    },5000)
}


function Saludar(){
    let greetings=["hello","Hi","Hi there","Greetings","hey"]
    let complements=["I am very happy to see you again","its always nice to hear you","I am very happy to hear you","How’s everything?","What’s going on?","How are you doing today?","What have you been up to?","How are you feeling today?"]
    Hablar(greetings[Math.floor(Math.random()*greetings.length)]+" sir, " + complements[Math.floor(Math.random()*complements.length)])
}

function DecirClima(){
    console.log(document.getElementById("temp").textContent)
    Hablar("Today at your location we have a temperature of "+clima.temp+" degrees , with a maximum temperature of "+clima.tmax+" and a minimum of "+clima.tmin)
}

async function ContarChiste(){  
    let chiste = "no encontre chiste"
    await fetch('https://v2.jokeapi.dev/joke/Programming,Dark,Pun')
        .then(response => response.json())
        .then(response => {
            if(response.setup){
                chiste = response.setup+ response.delivery
            }
            else{
                chiste=response.joke
            }
        })
        .catch(err => console.error(err));
        Hablar(chiste)
}

function responder(res){
    //saludo
    if (res.includes("hello")){
        Saludar()
    }

    //clima
    if(res.includes("weather")){
        DecirClima()
    }

    //abrir youtube
    if(res.includes("open youtube")){
        Hablar("as you wish, sir")
        window.open("https://www.youtube.com/")
    }

    //buqueda de google
    if(res.includes("google search")){
        Hablar("i will search that for you on google sir!")
        res = res.split("google search")
        res = res[1].split(" ").join("+")
        window.open("https://www.google.com/search?q="+res)
    }

    //joke
    if(res.includes("joke") || res.includes("jokes")){
        ContarChiste();
    }

    //task
    if(res.includes("task") || res.includes("add")){
        res=res.split("add task")
        res = res[1]
        Hablar("adding "+res+"to your tasks")
    }

    //saludo pelicula
    if(res.includes("are you there") || res.includes("are you awake")){
        Hablar("¿for you sir?,,,       Always.")
    }

    //apagar
    if(res.includes("over")){
        Hablar("Okay sir i will be here if you need something else")
        frenar=true
        reconocedor.stop()
    }

    //buenos dias
    if(res.includes("good morning")){
        let complements=["I am very happy to see you again","its always nice to hear you","I am very happy to hear you","How’s everything?","What’s going on?","How are you doing today?","What have you been up to?","How are you feeling today?"]
        Hablar("Good morning sir, " + complements[Math.floor(Math.random(complements.length*complements.length))])
        DecirClima();
        Hablar("here you have the news for today")
        //decir tareas por hacer hoy
        Hablar("Remember you have to "+ tareas[Math.floor(Math.random(tareas.length)*tareas.length)].tarea)
        // tirar frase motivadora anashei
        Hablar("and remember sur, the effort of today is the bill of tomorrow")
        setTimeout(()=>window.open("https://www.youtube.com/watch?v=O3bhL1gPdxM"),8500)
    }

    //noticias
    if(res.includes("news")){
        Hablar("here you have some of the news for today in the US: " +noticias[Math.floor(Math.random(noticias.length)*10)].description)
    }









    //ARDUINO
    if(res.includes("close the door")){
        AccionarCerradura("ON");
    }
    if(res.includes("open the door")){
        AccionarCerradura("OFF");
    }





















    //protocolos
    //studing
    if(res.includes("school") || res.includes("college") || res.includes("study")){
        ProtocoloStuding()
    }
    //gaming
    if(res.includes("game") || res.includes("gaming") || res.includes("gamer")){
        ProtocoloGaming()
    }
}






//PROTOCOLOS

//PROTOCOLO ESTUDIO
document.querySelector("#studing").addEventListener("click",()=>{ProtocoloStuding()})

function ProtocoloStuding(){
    Hablar("Iniciating studing protocol...")
    setTimeout(()=>{
        window.open("https://campus.ort.edu.ar/secundaria/almagro/informatica/2022-ni5b")
    },1000)
    window.open("https://www.youtube.com/watch?v=sWtEYPva4A0")
    Hablar("Hope you have a wonderful study session sir, i would wish you luck, but you dont need it")
    
}

//PROTOCOLO SEGURIDAD
document.querySelector("#emergency").addEventListener("click",()=>{protocoloEmergencia()})

function protocoloEmergencia(){
    Hablar("Iniciating Emergency protocol...")
    let url = "https://www.youtube.com/watch?v=K1491Qq4Ch8"
    window.open(url, "_tab")
}

document.querySelector("#gaming").addEventListener("click",()=>{protocoloGaming()})

function protocoloGaming(){
    Hablar("Iniciating Gaming protocol...")
    let url = "https://www.youtube.com/watch?v=K1491Qq4Ch8"
    window.open(url, "_tab")
}




// let myListener = function () {
//     document.removeEventListener('mousemove', myListener, false);
//     console.log("listener")
//     reconocedor.start()
// };

// document.addEventListener('mousemove', myListener, false);