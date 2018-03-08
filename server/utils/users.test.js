const expect = require('expect');

const {
    Users
} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '1',
                name: 'Andre',
                room: 'nodeCourse'
            },
            {
                id: '2',
                name: 'Batman',
                room: 'Superheros'
            },
            {
                id: '3',
                name: 'Superman',
                room: 'nodeCourse'
            }
        ]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: "a name",
            room: 'my chatroom'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId= '2';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    });

    it('should not remove a user', () => {
        var userId= '99';
        var user = users.removeUser(userId);
        expect(users.getUser(userId)).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '2';

        var user = users.getUser(userId);
        console.log(user);
        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId= '4';

        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should return names for nodeCourse', () => {
        var userList = users.getUserList('nodeCourse');
        expect(userList).toEqual(['Andre','Superman']);
    });
})