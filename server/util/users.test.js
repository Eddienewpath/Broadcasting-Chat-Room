const {Users} = require('./users');
const expect = require('expect');

describe('Users', ()=> {
    let users; 
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name:'eddie',
            room: 'node course'
        }, {
            id: '2',
            name: 'suki',
            room: 'react course'
        }, {
            id: '3',
            name: 'dong',
            room: 'node course'
        }];
    });
    
    it('should add user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'eddie',
            room: 'room1'
        };
       let resUser =  users.addUsers(user.id, user.name, user.room);
       expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userId = '4';
        let user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId ='2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        let userId ='99';
        let user = users.getUser(userId);
        expect(user).toBeFalsy();
    }); 

    it('should return name for node course', () => {
        let userList = users.getUserList('node course');
        expect(userList).toEqual(['eddie', 'dong']);
    });

    it('should return name for react course', () => {
        let userList = users.getUserList('react course');
        expect(userList).toEqual(['suki']);
    });
});