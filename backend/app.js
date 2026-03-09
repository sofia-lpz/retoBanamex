import express from 'express'
import bodyParser from 'body-parser';
import {router} from './API/routes.js'
import dotenv from 'dotenv/config'
import * as rag from './raghelper.js'

const app = express();
const PORT = process.env.PORT || 8080;

let ragStarted = true;

app.use(bodyParser.json());
app.use("/api", router);

app.use(express.static('public'));
app.use('/', express.static('public'));


if (!ragStarted) {
    rag.startupRAG().then(() => {
        console.log('RAG startup completed');
        ragStarted = true;
    }).catch((error) => {
        console.error('Error during RAG startup:', error);
    })};

app.listen(PORT, () => {
  console.log(`backend escuchando en el puerto ${PORT}`);
});

