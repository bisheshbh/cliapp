"use strict";
var MESSAGES;
(function (MESSAGES) {
    MESSAGES["m1"] = "Here is your cart !";
    MESSAGES["m2"] = "Product purchased , here is the invoice!";
    MESSAGES["divider"] = "-----------------------------------------------";
})(MESSAGES || (MESSAGES = {}));
let total_users = [];
let products = [
    {
        id: 'e21',
        name: 'Laptop',
        total_remaining_items: 4,
        price: 45000
    },
    {
        id: 'e22',
        name: 'MI Redmi Pro 10',
        total_remaining_items: 4,
        price: 35000
    },
    {
        id: 'e23',
        name: 'Razer Blade',
        total_remaining_items: 4,
        price: 120000
    },
    {
        id: 'e24',
        name: 'Samsung M62',
        total_remaining_items: 4,
        price: 36000
    }
];
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
        total_users.push(created);
        return created;
    }
    removeUser(email_address) {
        console.log(email_address);
    }
    filterUser(id_value) {
        for (let user in total_users)
            if (total_users[user].id === id_value) {
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
        for (let product in products) {
            products_ids.push(products[product].id);
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
                total_users[+f_user].carts.push(product_id);
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
    view_cart_details(user_id) {
        let f_user = this.filterUser(user_id);
        if (f_user) {
            let viewing_cart = [];
            let carts_list = total_users[+f_user].carts;
            for (let i in carts_list) {
                for (let product in products) {
                    let identity = products[product];
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
    view_cart(user_id, detail = false) {
        let f_user = this.filterUser(user_id);
        if (f_user) {
            if (detail) {
            }
            return total_users[+f_user].carts;
        }
        else {
            return "Warning : Correct user id is required";
        }
    }
    buy_cart() {
        let total_amount = 0;
        let cart = this.view_cart(this.id);
        if (typeof cart != 'string') {
            for (let c in cart) {
                for (let product in products) {
                    if (cart[+c] === products[product].id) {
                        total_amount += products[product].price;
                        products[product].total_remaining_items -= 1;
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
let u1 = new Users("Bishesh", "biseshbhattaraiii@gmail.com", 94343434);
u1.createUser();
let c1 = new Cart(u1.name, u1.email_address, u1.phone_no);
c1.updateCart(c1.id, "e24");
c1.updateCart(c1.id, "e23");
c1.updateCart("u15", "e23");
console.log(MESSAGES.m1);
console.log(c1.view_cart_details("u12"));
console.log(MESSAGES.divider);
console.log(MESSAGES.m2);
console.log(MESSAGES.divider);
console.log(c1.buy_cart());
console.log(MESSAGES.divider);
//# sourceMappingURL=app.js.map