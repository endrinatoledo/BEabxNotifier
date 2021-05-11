module.exports = function (sequelize, DataTypes) {
  const notificationsModel = sequelize.define('notificationsModel', {
    notId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'not_id'
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'not_type'
    },
    message: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'not_message'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'not_status'
    },
    temId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'tem_id'
    },
    usrId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'usr_id'
    }
  }, {
    tableName: 'notifications',
    timestamps: false
  })

  notificationsModel.associate = function (models) {
    notificationsModel.belongsTo(models.templateModel, {
      as: 'template',
      foreignKey: 'temId'
    })
  }

  return notificationsModel
}
