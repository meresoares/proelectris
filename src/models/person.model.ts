// src/models/person.model.ts
import { Model, DataTypes } from 'sequelize';
import sequelize  from '../config/mysql'; // Importa la instancia de Sequelize

class PersonModel extends Model {
  public id_person!: number;
  public name!: string;
  public address!: string;
  public phone!: string | null;
  public email!: string | null;
  public tax_id!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted!: boolean;
}

PersonModel.init(
  {
    id_person: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tax_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
      // Por defecto no esta eliminado
    }
  },
  {
    // Nombre de la tabla en la base de datos
    tableName: 'persons', 
    // Instancia de Sequelize
    sequelize,
    // Si la tabla tiene timestamps (created_at y updated_at) o no
    timestamps: false, 
  }
);

export default PersonModel;
