import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('bookish', 'mainUser', 'password', {
    host: 'localhost',
    dialect: 'mssql'
});
try {
    sequelize.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export const Book = sequelize.define('books', {
    ISBN: {type: DataTypes.INTEGER, primaryKey: true},
    Title: DataTypes.STRING,
    Authors: DataTypes.STRING,
    noCopies: DataTypes.INTEGER }, {
    timestamps: false
    });



export const User = sequelize.define('Users', {
    ID: {type: DataTypes.UUID ,primaryKey: true},
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(50)
}, {
    timestamps: false
    });



export const CheckedOut = sequelize.define('CheckedOut', {
    ID: {type: DataTypes.UUID ,primaryKey: true},
    ISBN: DataTypes.INTEGER,
    UserID: DataTypes.UUID,
    dueDate: DataTypes.DATEONLY,
    returned: DataTypes.BOOLEAN
}, {
    timestamps: false
    });