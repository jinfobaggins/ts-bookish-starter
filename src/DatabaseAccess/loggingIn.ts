import {User, Book, CheckedOut} from '../sequelizeDefines'


export async function correctUserAndPassword(username: string, password: string){
    const user = await User.findOne({where: { username: username, password: password}});
    return user.get('ID');
}


export async function findUserByID(ID: string){
    const user = await User.findOne({where: {ID: ID}});
    return user;
};