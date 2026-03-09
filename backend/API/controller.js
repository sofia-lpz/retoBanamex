import * as chatbot from '../loopita/loopita.js';
import * as service from './service.js';

export const chat = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt is required' 
      });
    }

    const response = await chatbot.chatHelper(prompt);
    
    return res.status(200).json({
      success: true,
      response: response
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while processing your request'
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { filter } = req.query;
    const users = await service.getUsers(filter);

    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error in getUsers endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching users'
    });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in getUserById endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the user'
    });
  }
} 

export const getPromociones = async (req, res) => {
  try {
    const promociones = await service.getPromociones();

    return res.status(200).json({
      success: true,
      data: promociones
    });
  } catch (error) {
    console.error('Error in getPromociones endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching promociones'
    });
  }
}

export const getPromocionById = async (req, res) => {
  try {
    const { id } = req.params;
    const promocion = await service.getPromocionById(id);

    if (!promocion) {
      return res.status(404).json({
        success: false,
        error: 'Promocion not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: promocion
    });
  } catch (error) {
    console.error('Error in getPromocionById endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the promocion'
    });
  }
}

export const getTarjetas = async (req, res) => {
  try {
    const tarjetas = await service.getTarjetas();

    return res.status(200).json({
      success: true,
      data: tarjetas
    });
  } catch (error) {
    console.error('Error in getTarjetas endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching tarjetas'
    });
  }
}

export const getTarjetaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarjeta = await service.getTarjetaById(id);

    if (!tarjeta) {
      return res.status(404).json({
        success: false,
        error: 'Tarjeta not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: tarjeta
    });
  } catch (error) {
    console.error('Error in getTarjetaById endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the tarjeta'
    });
  }
}

export const getProductos = async (req, res) => {
  try {
    const productos = await service.getProductos();

    return res.status(200).json({
      success: true,
      data: productos
    });
  } catch (error) {
    console.error('Error in getProductos endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching productos'
    });
  }
}

export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await service.getProductoById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: producto
    });
  } catch (error) {
    console.error('Error in getProductoById endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the producto'
    });
  }
} 

export const getPrestamos = async (req, res) => {
  try {
    const prestamos = await service.getPrestamos();

    return res.status(200).json({
      success: true,
      data: prestamos
    });
  } catch (error) {
    console.error('Error in getPrestamos endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching prestamos'
    });
  }
}

export const getHipoteca = async (req, res) => {
  try {
    const hipoteca = await service.getHipoteca();

    return res.status(200).json({
      success: true,
      data: hipoteca
    });
  } catch (error) {
    console.error('Error in getHipoteca endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching hipoteca'
    });
  }
}

export const getCreditoAuto = async (req, res) => {
  try {
    const creditoAuto = await service.getCreditoAuto();

    return res.status(200).json({
      success: true,
      data: creditoAuto
    });
  } catch (error) {
    console.error('Error in getCreditoAuto endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching credito auto'
    });
  }
}

export const getInversion = async (req, res) => {
  try {
    const inversion = await service.getInversion();

    return res.status(200).json({
      success: true,
      data: inversion
    });
  } catch (error) {
    console.error('Error in getInversion endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching inversion'
    });
  }
} 

export const getPromocionesByEmpresa = async (req, res) => {
  try {
    const { nombre } = req.params;
    const promociones = await service.getPromocionesByEmpresa(nombre);

    return res.status(200).json({
      success: true,
      data: promociones
    });
  } catch (error) {
    console.error('Error in getPromocionesByEmpresa endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching promociones by empresa'
    });
  }
}
