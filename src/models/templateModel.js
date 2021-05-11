module.exports = (sequelize, DataTypes) => {
  const templateModel = sequelize.define('templateModel', {
    temId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'tem_id'
    },
    products: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'tem_products'
    },
    actions: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'tem_actions'
    },
    subject: {
      type:DataTypes.STRING(100),
      allowNull: false,
      field: 'tem_subject'
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'tem_body'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'tem_status'
    },
    conId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'con_id'
    }
  }, {
    tableName: 'template',
    timestamps: false
  })

  templateModel.associate = function (models) {
    templateModel.belongsTo(models.configurationsModel, {
      as: 'configuration',
      foreignKey: 'conId'
    })

  }

  return templateModel
}
