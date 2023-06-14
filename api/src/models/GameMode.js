const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('GameMode', {
        id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:DataTypes.INTEGER},
      
        name:{
        type:DataTypes.STRING,
        allowNull:false}
    },
    {
        timestamps:false
    }
    )
}