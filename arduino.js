//aca va ir todo el codigo relacionado con arduino

async function AccionarCerradura(pedido){
    console.log("accionada "+pedido)
    fetch("http://192.168.0.108/LOCK="+pedido)
}