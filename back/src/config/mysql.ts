import { Sequelize } from 'sequelize-typescript';

interface SequelizeError extends Error {
  parent?: Error;
  original?: Error;
  sql?: string;
  errno?: number;
  code?: string;
  sqlState?: string;
  sqlMessage?: string;
}

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'proelectris',
  username: process.env.DB_USER || 'tomato',
  password: process.env.DB_PASSWORD || 'admin2',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
});


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa');
  } catch (error) {
    const sequelizeError = error as SequelizeError; 
    // Aseguramos a TypeScript que error es de tipo SequelizeError
    console.error('Error de conexión:', sequelizeError.message);
    if (sequelizeError.parent) {
      console.error('Error padre:', sequelizeError.parent.message);
    }
    if (sequelizeError.sql) {
      console.error('Consulta SQL:', sequelizeError.sql);
    }
    if (sequelizeError.code) {
      console.error('Código de error:', sequelizeError.code);
    }
    // Puedes agregar más propiedades del error de Sequelize según tus necesidades
  }
};

testConnection();

export default sequelize;
