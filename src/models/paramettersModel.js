module.exports = (sequelize, DataTypes) => {
    const paramettersModel = sequelize.define('paramettersModel', {
        parId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'par_id'
        },
        conId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'con_id'
        },
        value: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'par_value'
        },
        code: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: 'par_code'
        }
    }, {
        tableName: 'parametters',
        timestamps: false

    })

    paramettersModel.associate = (models) => {
        paramettersModel.belongsTo(models.configurationsModel, {
            as: 'configuration',
            foreignKey: 'conId'
        })
    }

    return paramettersModel
}
