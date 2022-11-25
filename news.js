
var noticias=[]

var noticiaRandom = ""

async function  traerInfo() {
 fetch("https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=02f04623c6d34c5caf381dee5616d474")
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    noticias = data.articles
    noticiaRandom = noticias[Math.floor(Math.random(noticias.length)*10)]
    console.table(noticiaRandom)
  })
}
traerInfo();