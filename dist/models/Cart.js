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
        let valid = 0;
        products_1.products.map((product, index) => {
            if (products_1.products[index].id === product_id && product) {
                valid = 1;
            }
        });
        if (valid) {
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
            carts_list.map((cart_item) => {
                products_1.products.map((_product_item, index) => {
                    if (cart_item === products_1.products[index].id) {
                        viewing_cart.push({ id: products_1.products[index].id, name: products_1.products[index].name, price: products_1.products[index].price });
                    }
                });
            });
            return viewing_cart;
        }
        return "Error : Correct user id is required";
    }
    viewCart(user_id) {
        let f_user = this.filterUser(user_id);
        if (f_user) {
            return users_1.total_users[+f_user].carts;
        }
        return "Warning : Correct user id is required";
    }
    buyCart() {
        let cart = this.viewCart(this.id);
        if (typeof cart != 'string') {
            cart.map((c) => {
                products_1.products.map((product, index) => {
                    if (c === products_1.products[index].id) {
                        this.amount += products_1.products[index].price;
                        console.log(product);
                    }
                });
            });
        }
        if (typeof cart != 'string') {
            return this.generateInvoice(this.amount, cart);
        }
        return;
    }
}
exports.Cart = Cart;
exports.c1 = new Cart(User_1.u1.name, User_1.u1.email_address, User_1.u1.phone_no);
//# sourceMappingURL=Cart.js.map