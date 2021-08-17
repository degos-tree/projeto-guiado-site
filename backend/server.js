const podcasts = require("./data/podcasts.json")

const express = require("express")
const app = express()
const fs = require('fs');

app.get("/", (request, response)=>{
    response.status(200).send({
        mensagem: "Enviados podcasts com sucesso"
    })
});

app.get("/podcasts", (request, response)=>{
    response.status(200).send(podcasts)
});

app.post('/biografias', (request, response) => { // cria novos objetos e dados para salvar na base de dados
    const { id, nome, profissao, biografia } = request.body;
    biografias.push//biografia vai receber esses objetos

    fs.writeFile("./biografias.json",JSON.stringify(biografias),'utf8', function(err){
        if(err){
            return response.status(424).send({mensagem:err});
        }
        console.log("Base de dados atualizada.");
});

app.delete("/podcasts/:id", (request, response)=>{
    const idRequest = request.params.id
    let podcastFiltrado = podcasts.find(podcast => podcast.id == idRequest)

    let indice = podcasts.indexOf(podcastFiltrado)
    podcasts.splice(indice, 1)
    
    response.status(200).send({
        mensagem: "podcast deletado",
        podcastFiltrado
    })

});

app.listen(6060,()=>{
    console.log("A porta 6060 está ligada")
})})
