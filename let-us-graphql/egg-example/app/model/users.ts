module.exports = (app) => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "users",
    }
  );

  Model.associate = function () {};

  return Model;
};
