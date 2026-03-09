import express from 'express'
import * as controller from '../API/controller.js'

const endpoints = [
  {
    id: 1,
    name: "promociones",
    description: "Get promotion information with optional filtering",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "descripcion", type: "string" },
      { name: "empresa", type: "string" },
      { name: "fecha_inicio", type: "date" },
      { name: "fecha_fin", type: "date" }
    ]
  },
  {
    id: 2,
    name: "tarjetas",
    description: "Get card information with optional filtering",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "tipo", type: "string" },
      { name: "tasa_interes", type: "decimal" },
      { name: "limite_credito", type: "decimal" },
      { name: "anualidad", type: "decimal" }
    ]
  },
  {
    id: 3,
    name: "productos",
    description: "Get product information with optional filtering",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "tipo", type: "string" },
      { name: "descripcion", type: "string" },
      { name: "tasa", type: "decimal" },
      { name: "plazo", type: "number" }
    ]
  },
  {
    id: 4,
    name: "prestamos",
    description: "Get loan product details",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "monto_minimo", type: "decimal" },
      { name: "monto_maximo", type: "decimal" },
      { name: "tasa_interes", type: "decimal" },
      { name: "plazo_meses", type: "number" }
    ]
  },
  {
    id: 5,
    name: "hipoteca",
    description: "Get mortgage product details",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "monto_minimo", type: "decimal" },
      { name: "monto_maximo", type: "decimal" },
      { name: "tasa_interes", type: "decimal" },
      { name: "plazo_anios", type: "number" },
      { name: "enganche_minimo", type: "decimal" }
    ]
  },
  {
    id: 6,
    name: "credito-auto",
    description: "Get auto credit product details",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "monto_minimo", type: "decimal" },
      { name: "monto_maximo", type: "decimal" },
      { name: "tasa_interes", type: "decimal" },
      { name: "plazo_meses", type: "number" },
      { name: "enganche_minimo", type: "decimal" }
    ]
  },
  {
    id: 7,
    name: "inversion",
    description: "Get investment product details",
    column: [
      { name: "id", type: "number" },
      { name: "nombre", type: "string" },
      { name: "monto_minimo", type: "decimal" },
      { name: "rendimiento", type: "decimal" },
      { name: "plazo_dias", type: "number" },
      { name: "tipo", type: "string" }
    ]
  }
];

const createEndpointsList = () => {
  return endpoints.map(endpoint => {
    let params = "No parameters required";
    
    if (endpoint.column.length > 0) {
      const paramDetails = endpoint.column.map(p => {
        return `${p.name} (${p.type})`;
      }).join('\n   - ');
      
      params = `Columns:\n   - ${paramDetails}`;
    }
    
    return `${endpoint.id}. ${endpoint.name}: ${endpoint.description}
   ${params}`;
  }).join('\n\n');
};

export const endpointsList = createEndpointsList();
export default { endpointsList };
export { endpoints };