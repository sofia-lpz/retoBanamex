import { readFile } from 'node:fs/promises';

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import * as mysql from './API/mysql.js';
import * as loopita from './loopita/loopita.js';

const OPEN_AI_KEY = 
const OPEN_AI_URL = process.env.OPENAI_API_URL || "https://api.openai.com/v1/embeddings";
const OPEN_AI_MODEL = process.env.OPENAI_MODEL || "text-embedding-3-small";

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { json } from 'node:stream/consumers';

async function extractTextFromPDF(pdfBuffer) {
    const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
    }
    return text;
}

async function chunkText(text, maxTokens = 4000) { //max for chat4 is 128,000 tokens
    //chunks the text into smaller pieces using the RecursiveCharacterTextSplitter from langchain
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: maxTokens, chunkOverlap: 0 })
    const chunks = await splitter.splitText(text);

    return chunks;
}

async function embedText(text) {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_KEY}`
        },
        body: JSON.stringify({
            model: "text-embedding-3-small",
            input: text
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`OpenAI error ${response.status}: ${err.error?.message}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
}

async function storeEmbeddings(embedding, metadata, source) {
    mysql.storeEmbedding(embedding, metadata, source);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function startupRAG() {
    const pdfFiles = ["./data/cuento.pdf", "./data/mencho.pdf"];
    for (const pdfFile of pdfFiles) {
        const pdfBuffer = await readFile(pdfFile);
        const text = await extractTextFromPDF(new Uint8Array(pdfBuffer));
        const chunks = await chunkText(text);
        for (const chunk of chunks) {
            try {
                const embeddings = await embedText(chunk);
                await storeEmbeddings(embeddings, { source: pdfFile }, chunk);
            } catch (err) {
                console.error(`Failed to embed chunk: ${err.message}`);
            } finally {
                await sleep(500); // always runs, even if embedText throws
            }
        }
    }
}

async function find_most_similar_embeddings(query) {
    //embed the query using the same embedding model you used for the documents
    const queryEmbedding = await embedText(query);

    const embeddings = await mysql.getEmbeddings();

    //calculate the cosine similarity between the query embedding and each document embedding
    const similarities = embeddings.map(embedding => {
        return {
            source: embedding.source,
            similarity: cosineSimilarity(queryEmbedding, embedding.vector)
        }
    });

    //sort the embeddings by similarity and return the top 5
    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, 5);
}

export async function askRAG(query) {
    const similarEmbeddings = await find_most_similar_embeddings(query);
    const context = similarEmbeddings.map(embedding => embedding.source).join("\n");

    const prompt = `Answer the following question using the context provided. 
    \n\nContext:\n${context}\n\nQuestion:\n${query}`;

    console.log("Prompt for LLM:", prompt);

    const response = await loopita.chatHelper(prompt);
    return response;
}

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}



