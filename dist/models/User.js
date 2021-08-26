"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.u1 = exports.Users = void 0;
const users_1 = require("../schemas/users");
class Users {
    constructor(name, email_address, phone_no, carts = []) {
        this.id = "u12";
        this.name = name;
        this.email_address = email_address;
        this.phone_no = phone_no;
        this.carts = carts;
    }
    createUser() {
        let created = {
            id: this.id,
            name: this.name,
            email_address: this.email_address,
            phone_no: this.phone_no,
            carts: this.carts
        };
        users_1.total_users.push(created);
        return created;
    }
    removeUser(email_address) {
        console.log(email_address);
    }
    filterUser(id_value) {
        for (let user in users_1.total_users)
            if (users_1.total_users[user].id === id_value) {
                return user;
            }
        return;
    }
}
exports.Users = Users;
exports.u1 = new Users("Bishesh", "biseshbhattaraiii@gmail.com", 94343434);
exports.u1.createUser();
//# sourceMappingURL=User.js.map