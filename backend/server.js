const podcasts = require("./data.json");
const express = require("express");
const app = express();

//GET - exibe lista com todos os podcasts

app.get("/todos", (request, response) => {
    response.status(200).send(podcasts)
})

// DELETE - apaga podcast por id 

app.delete("/todos/:id", (request, response) => {
    const idRequest = request.params.id;
    let podcastFiltrado = podcasts.find(podcast => podcast.id == idRequest);
    
    let indice = podcasts.indexOf(podcastFiltrado);
    podcasts.splice(indice, 1);

    response.status(200).send("podcast deletado");  
    
})

// POST - adiciona podcast ao banco de dados

const fs = require("fs");
app.use(express.json());

app.post("/add", (request, response) => { // cria novos objetos e dados para salvar na base de dados
    const { id, Titulo, Programa, Descricao, Link } = request.body;
    podcasts.push({ id, Titulo, Programa, Descricao, Link }); //podcast vai receber esses objetos

    fs.writeFile("./data.json", JSON.stringify(podcasts),'utf8', function(err){
        if(err){
            return response.status(424).send({ "mensagem":err });
        }
        console.log("Base de dados atualizada.");
})

});

app.listen(6060, () => {
    console.log("rodando na porta 6060")
})

