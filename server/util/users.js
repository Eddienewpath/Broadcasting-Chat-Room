class Users{
    constructor(){
        this.users = [];
    }
    
    addUsers (id, name, room) {
        let newUser = {id, name, room};
        this.users.push(newUser);
        return  newUser;
    }

    getUserList (room) {
        let users = this.users.filter((user) => user.room === room);
        let nameList = users.map((user) => user.name);
        return nameList;
    }

    removeUser (id) {
        let user = this.users.filter((user) => user.id == id)[0];
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id == id)[0];
    }
}

module.exports = {Users};