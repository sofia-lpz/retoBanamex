import * as mysql from './mysql.js'

export const getUsers = async (filter = {}) => {
  try {
    const users = await mysql.getUsers(filter);
    return users;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getUserById = async (id) => {
  try {
    const user = await mysql.getUserById(id);
    return user;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getPromociones = async () => {
  try {
    const promociones = await mysql.getPromociones();
    return promociones;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getPromocionById = async (id) => {
  try {
    const promocion = await mysql.getPromocionById(id);
    return promocion;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getTarjetas = async () => {
  try {
    const tarjetas = await mysql.getTarjetas();
    return tarjetas;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getTarjetaById = async (id) => {
  try {
    const tarjeta = await mysql.getTarjetaById(id);
    return tarjeta;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getProductos = async () => {
  try {
    const productos = await mysql.getProductos();
    return productos;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getProductoById = async (id) => {
  try {
    const producto = await mysql.getProductoById(id);
    return producto;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getPrestamos = async () => {
  try {
    const prestamos = await mysql.getPrestamos();
    return prestamos;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getHipoteca = async () => {
  try {
    const hipoteca = await mysql.getHipoteca();
    return hipoteca;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getCreditoAuto = async () => {
  try {
    const creditoAuto = await mysql.getCreditoAuto();
    return creditoAuto;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getInversion = async () => {
  try {
    const inversion = await mysql.getInversion();
    return inversion;
  } catch ( err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
}

export const getPromocionesByEmpresa = async (nombre) => {
  try {
    const promociones = await mysql.getPromocionesByEmpresa(nombre);
    return promociones;
  } catch (err) {
    console.error(err)
    throw err; // Re-throw to allow proper error handling in controller
  }
} 
