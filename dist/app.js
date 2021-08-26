"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arguments_1 = require("./enums/arguments");
const products_1 = require("./schemas/products");
const Cart_1 = require("./models/Cart");
const prompt = require('prompt-sync')();
class Main extends Cart_1.Cart {
    constructor(name, email_address, phone_no, amount = 0) {
        super(name, email_address, phone_no, amount);
        this.command = '';
    }
    controller() {
        var _a;
        console.log(`
                    || ----Welcome to introTech---- || 

                    Usage: Press p to view products , 
                    a to add in cart ,
                    v to view your cart,
                    b to buy , 
                    c to continue , 
                    x to cancel`);
        while (true) {
            this.command = prompt(" => ");
            if (this.command) {
                switch (this.command) {
                    case arguments_1.ARGS.product:
                        console.log(products_1.products);
                        continue;
                    case arguments_1.ARGS.cancel:
                        return;
                    case arguments_1.ARGS.add:
                        let product_list;
                        let toAddProductName = prompt("Enter the product ids to add in cart [Multiple ids must be separated by space]: ");
                        product_list = toAddProductName.split(' ');
                        for (let p_item in product_list) {
                            if (p_item) {
                                this.updateCart(this.id, product_list[p_item]);
                            }
                        }
                        continue;
                    case arguments_1.ARGS.cart:
                        if (((_a = this.viewCartDetails(this.id)) === null || _a === void 0 ? void 0 : _a.length) != 0) {
                            console.log(this.viewCartDetails(this.id));
                        }
                        else {
                            console.log("Your cart looks empty. Here look at some products");
                            console.log(products_1.products);
                        }
                        continue;
                    case arguments_1.ARGS.buy:
                        console.log(this.viewCartDetails(this.id));
                        let confirm = prompt("Are you sure buy these products(y/n) => ");
                        if (confirm === 'y') {
                            console.log("Thanks for shopping from introTech . Here is your invoice . ");
                            console.log(this.buyCart());
                            this.emptyCart();
                            console.log("Have a pleasant day !");
                            continue;
                        }
                        else if (confirm === 'n') {
                            continue;
                        }
                    case arguments_1.ARGS.continue:
                        continue;
                    default:
                        console.log(`
                    Usage: Press p to view products , 
                    v to view b to buy , 
                    c to continue , 
                    x to cancel`);
                }
            }
            else {
                break;
            }
        }
        return;
    }
}
let m = new Main(Cart_1.c1.name, Cart_1.c1.email_address, Cart_1.c1.phone_no);
m.controller();
//# sourceMappingURL=app.js.map