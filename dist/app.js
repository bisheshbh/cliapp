"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./enums/messages");
const arguments_1 = require("./enums/arguments");
const users_1 = require("./schemas/users");
const products_1 = require("./schemas/products");
const readline_1 = __importDefault(require("readline"));
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
class Cart extends Users {
    constructor(name, email_address, phone_no, amount = 0) {
        super(name, email_address, phone_no);
        this.amount = amount;
    }
    generateInvoice(amount, carts) {
        return Object.assign(Object.assign({}, this), { carts,
            amount });
    }
    checkProductId(product_id) {
        let products_ids = [];
        for (let product in products_1.products) {
            products_ids.push(products_1.products[product].id);
        }
        if (products_ids.includes(product_id)) {
            return true;
        }
        return false;
    }
    updateCart(id, product_id) {
        if (this.checkProductId(product_id)) {
            let f_user = this.filterUser(id);
            if (f_user) {
                users_1.total_users[+f_user].carts.push(product_id);
            }
            else {
                console.log("Error : Correct user id is required");
            }
        }
        else {
            console.log("Error : Correct product id is required .");
        }
        return;
    }
    viewCartDetails(user_id) {
        let f_user = this.filterUser(user_id);
        if (f_user) {
            let viewing_cart = [];
            let carts_list = users_1.total_users[+f_user].carts;
            for (let i in carts_list) {
                for (let product in products_1.products) {
                    let identity = products_1.products[product];
                    if (carts_list[i] === identity.id) {
                        viewing_cart.push({ id: identity.id, name: identity.name, price: identity.price });
                    }
                }
            }
            return viewing_cart;
        }
        else {
            return "Error : Correct user id is required";
        }
        return;
    }
    viewCart(user_id, detail = false) {
        let f_user = this.filterUser(user_id);
        if (f_user) {
            if (detail) {
            }
            return users_1.total_users[+f_user].carts;
        }
        else {
            return "Warning : Correct user id is required";
        }
    }
    buyCart() {
        let total_amount = 0;
        let cart = this.viewCart(this.id);
        if (typeof cart != 'string') {
            for (let c in cart) {
                for (let product in products_1.products) {
                    if (cart[+c] === products_1.products[product].id) {
                        total_amount += products_1.products[product].price;
                        products_1.products[product].total_remaining_items -= 1;
                    }
                }
            }
        }
        if (typeof cart != 'string') {
            return this.generateInvoice(total_amount, cart);
        }
        return;
    }
}
class Arguments {
    constructor(name, email, phoneno, args = []) {
        this.args = args;
        this.name = name;
        this.email = email;
        this.phoneno = phoneno;
        this.initReadline = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    monitorAns(answer) {
        if (answer === arguments_1.ARGS.product) {
            console.log(products_1.products);
        }
    }
    controllers() {
        this.initReadline.question('Press p to see products list', (answer) => {
            this.monitorAns(answer);
        });
    }
}
let u1 = new Users("Bishesh", "biseshbhattaraiii@gmail.com", 94343434);
let a = new Arguments(u1.name, u1.email_address, u1.phone_no);
a.controllers();
let c1 = new Cart(u1.name, u1.email_address, u1.phone_no);
c1.updateCart(c1.id, "e24");
c1.updateCart(c1.id, "e23");
c1.updateCart("u2", "e23");
console.log(messages_1.MESSAGES.m1);
console.log(c1.viewCartDetails("u12"));
console.log(messages_1.MESSAGES.divider);
console.log(messages_1.MESSAGES.m2);
console.log(messages_1.MESSAGES.divider);
console.log(c1.buyCart());
console.log(messages_1.MESSAGES.divider);
//# sourceMappingURL=app.js.map