import express from 'express';

/*
HTTP VERBS:
GET POST PUT PATCH DELETE
*/

const app = express();

app.get("/", (req, res) =>{

    return res.json({message: "NLW 04"})

})

app.post("/", (req, res) =>{

    return res.json({message: "DADOS SALVOS COM SUCESSO!"})

})

app.listen(3333, () => console.log("Server  up!"));