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
}

PersonModel.init(
  {
    id_person: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tax_id: {
      type: DataTypes.STRING,
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
    }
  },
  {
    sequelize,
    modelName: 'Person',
    tableName: 'persons', // Reemplaza 'persons' con el nombre de tu tabla
    timestamps: false, // Si tienes columnas 'created_at' y 'updated_at', configúralas aquí
  }
);

export default PersonModel;
