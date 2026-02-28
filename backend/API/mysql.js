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

export async function getAlumno(matricula)
{
  let connection = null
  try
  {
    connection = await connectToDB()

    const query = `
SELECT *
FROM pronostico_simple_alumno
WHERE alumnoId = ?
    `;

    const [results, _] = await connection.query(query, [matricula])

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