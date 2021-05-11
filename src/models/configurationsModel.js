module.exports = (sequelize, DataTypes) => {
    const configurationsModel = sequelize.define('configurationsModel', {
        conId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'con_id'
        },
        products: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'con_products'
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'con_type'
        }
    }, {
        tableName: 'configurations',
        timestamps: false
    })
    configurationsModel.associate = (models) => {
        configurationsModel.hasMany(models.paramettersModel,{
            as: 'parametters',
            foreignKey: 'conId'
        })
    }
    configurationsModel.associate = function (models) {
        configurationsModel.hasMany(models.templateModel, {
            as: 'template',
            foreignKey: 'conId'
        })
    }

    return configurationsModel
}
