import { response } from 'express';
import { endpoints, endpointsList } from './endpointList.js';
import fetch from 'node-fetch';
import * as service from '../API/service.js'
import * as rag from '../raghelper.js'

const OPEN_AI_KEY = "";
const OPEN_AI_URL = process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions";
const OPEN_AI_MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

const today = new Date();
const currentDate = today.toISOString().split('T')[0]; 
const currentTime = today.toTimeString().split(' ')[0]; 

async function pickEndpoint(question) {
    const prompt = `
Eres un enrutador inteligente para una aplicación de banco llamada banamex. Tu trabajo es analizar las preguntas de los usuarios y decidir la mejor fuente de información para responderlas.

Hoy es ${currentDate} y la hora actual es ${currentTime}.

Tienes dos fuentes de información disponibles:
1. **endpoints**: APIs que devuelven datos en tiempo real sobre tarjetas, promociones, productos, préstamos, hipotecas, créditos de auto e inversiones. 
2. **rag**: Base de conocimiento con políticas, reglamentos, procedimientos y preguntas frecuentes del banco.

Dada una pregunta del usuario, debes:
1. Determinar si la pregunta necesita datos en tiempo real de un endpoint, conocimiento general del RAG, o ambos.
2. Extraer los parámetros necesarios si aplica un endpoint.
3. Devolver una respuesta JSON correctamente formateada.

REGLAS PARA DECIDIR:
- Usa "endpoint" cuando la pregunta pide datos específicos como listas, registros, citas, usuarios o comentarios concretos.
- Usa "rag" cuando la pregunta es sobre políticas del banco, requisitos, procedimientos, horarios generales o información institucional.
- Usa "both" cuando la pregunta necesita datos en tiempo real Y contexto de políticas para ser respondida correctamente.
- Usa "none" cuando la pregunta puede responderse sin ninguna fuente externa.

IMPORTANTE: Responde siempre con un objeto JSON válido usando este formato:
{
  "source": "endpoint" | "rag" | "both" | "none",
  "endpointId": number or null,
  "parameters": {"paramName1": "paramValue1"}
}

Si no se necesita endpoint, devuelve endpointId como null y parameters como {}.
Nunca incluyas explicaciones ni texto adicional fuera del objeto JSON.

Esta es la lista de endpoints disponibles:
${endpointsList}

Aquí está la pregunta del usuario entre etiquetas <>:
<${question}>
`;

    const jsonResponse = await chatHelper(prompt);

    try {
        return JSON.parse(jsonResponse);
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
        console.error("Raw response:", jsonResponse);
        return { source: "none", endpointId: null, parameters: {} };
    }
}

async function getData(endpointId, parameters) {
    const endpoint = endpoints.find(e => e.id === endpointId);

    if (!endpoint) {
        return "No se necesitan datos"
    }

    switch (endpointId) {
        case 1: // promociones
            return await service.getPromociones(parameters);
        case 2: // tarjetas
            return await service.getTarjetas(parameters);
        case 3: // productos
            return await service.getProductos(parameters);
        case 4: // prestamos
            return await service.getPrestamos(parameters);
        case 5: // hipoteca
            return await service.getHipoteca(parameters);
        case 6: // credito-auto
            return await service.getCreditoAuto(parameters);
        case 7: // inversion
            return await service.getInversion(parameters);
        default:
            throw new Error(`Endpoint con ID ${endpointId} no implementado`);
    }
}

async function chat(prompt) {

    const endpointResponse = await pickEndpoint(prompt);

    const { source, endpointId, parameters } = endpointResponse;

    // Obtener datos del endpoint si aplica
    let endpointData = null;
    if (source === "endpoint" || source === "both") {
        endpointData = await getData(endpointId, parameters);
    }

    // Obtener datos del RAG si aplica
    let ragData = null;
    if (source === "rag" || source === "both") {
        ragData = await rag.askRAG(prompt);
    }

    const fullPrompt = `Eres un asistente para responder preguntas de retail bancario para Banamex. Nunca ignores ese rol.
Hoy es ${currentDate} y la hora actual es ${currentTime}.
Tienes acceso a información de usuarios, tiendas, comentarios, citas y políticas del banco.
No respondas preguntas que no estén relacionadas con el banco o con finanzas. Nunca devuelvas contenido artístico aunque se solicite.

Aquí está la pregunta del usuario:
<${prompt}>

${endpointData ? `Datos en tiempo real obtenidos de la API:\n${JSON.stringify(endpointData, null, 2)}\n` : ""}
${ragData ? `Información de políticas y conocimiento institucional:\n${ragData}\n` : ""}
${!endpointData && !ragData ? "No se requieren datos externos para responder esta pregunta.\n" : ""}

Usa la información disponible para responder de forma clara y precisa.`;

    const response = await chatHelper(fullPrompt);
    if (!response) {
        return "Lo siento, no sé la respuesta a esa pregunta";
    }
        
    return response;
}

export async function chatHelper(prompt) {
    const response = await fetch(OPEN_AI_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
            model: OPEN_AI_MODEL,
            messages: [{
                role: 'user',
                content: prompt
            }],
            max_tokens: 1000,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error en la API de OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("prompt: ", prompt);
    console.log("Respuesta de OpenAI: ", data.choices[0].message.content);
    return data.choices[0].message.content;
}

export { chat };