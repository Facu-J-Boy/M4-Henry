// Example cardinality sequelize

/*
RELACIONES CORRECTAS A USAR
​
UNO A UNO
Foo.hasOne(Bar);
Bar.belongsTo(Foo);
​
DE UNO A MUCHOS
Team.hasMany(Player, {
  foreignKey: 'clubId'
});
Player.belongsTo(Team);
​
DE MUCHOS A MUCHOS
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
*/
const User = {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
};
const Product = {
  name: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
};
/*
La A.hasOne(B)asociación significa que existe una relación uno a uno 
entre A y B, con la clave externa definida en el modelo de destino (B).
*/
User.hasOne(Product, { through: "UserProduct" })
// En este caso el through no es necesario y no causa ningún efecto
// User table    --> id | firstName | lastName 
// Product table --> id | name | stock | UserId

/*
La A.belongsTo(B)asociación significa que existe una relación uno a uno 
entre A y B, con la clave externa definida en el modelo fuente (A).
*/
User.belongsTo(Product, { through: "UserProduct" }) // el through idem en hasOne
// User table    --> id | firstName | lastName | ProductId
// Product table --> id | name | stock 

/*
La A.hasMany(B)asociación significa que existe una relación de uno a muchos 
entre A y B, con la clave externa definida en el modelo de destino (B).
*/
User.hasMany(Product)
// User table    --> id | firstName | lastName 
// Product table --> id | name | stock | UserId

User.hasMany(Product);
Product.hasMany(User);
// User table    --> id | firstName | lastName | ProductId
// Product table --> id | name | stock | UserId

/*
La A.belongsToMany(B, { through: 'C' })asociación significa que existe una 
relación Many-To-Many (muchos a muchos) entre A y B, utilizando table C como 
tabla de unión, que tendrá las claves foráneas ( aId y bId, por ejemplo). 
Sequelize creará automáticamente este modelo C (a menos que ya exista) y 
definirá las claves externas apropiadas en él.
*/
User.belongsToMany(Product, { through: "UserProduct" });
// User table    --> id | firstName | lastName 
// Product table --> id | name | stock 
// UserProduct   --> actualizado | UserId | ProductId // actualizado es del model user

User.belongsToMany(Product, { through: "UserProduct" });
Product.belongsToMany(User, { through: "UserProduct" });
// User table    --> id | firstName | lastName 
// Product table --> id | name | stock 
// UserProduct   --> actualizado | UserId | ProductId // actualizado es del model user​

// https://sequelize.org/docs/v6/core-concepts/assocs/