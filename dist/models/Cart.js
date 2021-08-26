"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c1 = exports.Cart = void 0;
const products_1 = require("../schemas/products");
const User_1 = require("./User");
const users_1 = require("../schemas/users");
class Cart extends User_1.Users {
    constructor(name, email_address, phone_no, amount = 0) {
        super(name, email_address, phone_no);
        this.amount = amount;
    }
    generateInvoice(amount, carts) {
        return {
            id: this.id,
            name: this.name,
            email_address: this.email_address,
            phoneno: this.phone_no,
            carts: carts,
            amount: amount
        };
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
    emptyCart() {
        let f_user = this.filterUser(this.id);
        if (f_user) {
            users_1.total_users[+f_user].carts = [];
        }
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
exports.Cart = Cart;
exports.c1 = new Cart(User_1.u1.name, User_1.u1.email_address, User_1.u1.phone_no);
//# sourceMappingURL=Cart.js.map