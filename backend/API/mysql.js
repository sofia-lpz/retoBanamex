import mysql from "mysql2/promise"

async function connectToDB()
{
  return await  mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'colometa',
    database: process.env.DB_DATABASE || 'banamex',
    password: process.env.DB_PASSWORD || 'colometa',
  });
}

export async function getEmbeddings()
{
  let connection = null
  try
  {
    connection = await connectToDB()

    const query = `
SELECT *
FROM embeddings
    `;

    const [results, _] = await connection.query(query)

    console.log(`${results.length} rows returned`)
    return results
  }
  catch(error)
  {
    console.log(error)
  }
  finally
  {
    if(connection !== null)
    {
      connection.end()
      console.log('Connection closed successfuly')
    }
  }
}

export async function storeEmbedding(embedding, metadata, source) {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = `
      INSERT INTO embeddings (vector, metadata, source)
      VALUES (?, ?, ?)
    `;
    const [results, _] = await connection.query(query, [
      JSON.stringify(embedding),
      JSON.stringify(metadata),
      source
    ]);
    console.log(`Embedding stored with ID ${results.insertId}`);
    return results.insertId;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
}

export const getUsers = async (filter) => {
  let connection = null;
  try {
    connection = await connectToDB();
    let query = 'SELECT * FROM cliente';
    const params = [];
    
    if (filter) {
      query += ' WHERE nombre LIKE ? OR apellido LIKE ?';
      params.push(`%${filter}%`, `%${filter}%`);
    }
    const [results, _] = await connection.query(query, params);
    return results;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};

export const getUserById = async (id) => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM cliente WHERE clienteId = ?';
    const [results, _] = await connection.query(query, [id]);
    return results[0]; // Return the first result (should be only one)
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    } 
  }
};

export const getPromociones = async () => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM promociones';
    const [results, _] = await connection.query(query);
    return results;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};

export const getPromocionById = async (id) => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM promociones WHERE promocionId = ?';
    const [results, _] = await connection.query(query, [id]);
    return results[0]; // Return the first result (should be only one)
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};

export const getTarjetas = async () => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM tarjetas';
    const [results, _] = await connection.query(query);
    return results;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};

export const getTarjetaById = async (id) => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM tarjetas WHERE tarjetaid = ?';
    const [results, _] = await connection.query(query, [id]);
    return results[0]; // Return the first result (should be only one)
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};

export const getProductos = async () => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM productos';
    const [results, _] = await connection.query(query);
    return results;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};

export const getProductoById = async (id) => {
  let connection = null;
  try {
    connection = await connectToDB();
    const query = 'SELECT * FROM productos WHERE productoId = ?';
    const [results, _] = await connection.query(query, [id]);
    return  results[0]; // Return the first result (should be only one)
  } catch (error) {
    console.log(error);
    throw error; // Re-throw to allow proper error handling in service
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Connection closed successfully');
    }
  }
};