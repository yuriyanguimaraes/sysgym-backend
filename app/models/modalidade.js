module.exports = (sequelize, DataTypes) => {

    const ModalidazeModel = sequelize.define('ModalidazeModel', {

        id_modalidade: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.VARCHAR,
            required: true,
            max: 80,
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL(10,2),
            required: true,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            allowNull: true
        }
    },
        {
            tableName: 'modalidade'
        }
    )
    return ModalidazeModel
}