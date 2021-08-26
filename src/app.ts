import {ARGS} from './enums/arguments'
import { products } from './schemas/products'
import {c1, Cart} from './models/Cart'
const prompt = require('prompt-sync')();



class Main extends Cart {
    command :string;
    constructor(name:string , email_address:string, phone_no:number , amount : number = 0){
        super(name , email_address, phone_no , amount);
        this.command = ''
    }
    controller(){
        console.log(`
                    || ----Welcome to introTech---- || 

                    Usage: Press p to view products , 
                    a to add in cart ,
                    v to view your cart,
                    b to buy , 
                    c to continue , 
                    x to cancel`)
        while(true){
        this.command = prompt(" => ")
        if(this.command){
            switch(this.command){
                case ARGS.product:
                    console.log(products)
                    continue
                case ARGS.cancel:
                    return
                case ARGS.add:
                    let product_list : string[];
                    let toAddProductName : string = prompt("Enter the product ids to add in cart [Multiple ids must be separated by space]: ")
                    product_list = toAddProductName.split(' ')
                    for (let p_item in product_list){
                        if(p_item){
                            
                            this.updateCart(this.id , product_list[p_item])
                        }
                    }
                    continue
                case ARGS.cart:
                    if(this.viewCartDetails(this.id)?.length != 0){
                        console.log(this.viewCartDetails(this.id))
                    }else{
                        console.log("Your cart looks empty. Here look at some products")
                        console.log(products)
                    }
                    continue
                case ARGS.buy:
                   console.log(this.viewCartDetails(this.id)) 
                   let confirm : string = prompt("Are you sure buy these products(y/n) => ")
                   if(confirm === 'y'){
                        console.log("Thanks for shopping from introTech . Here is your invoice . ")
                        console.log(this.buyCart())
                        this.emptyCart()
                        console.log("Have a pleasant day !")
                        continue
                   }else if(confirm === 'n'){
                       continue
                   }
                case ARGS.continue:
                    continue
                default:
                    console.log(`
                    Usage: Press p to view products , 
                    v to view b to buy , 
                    c to continue , 
                    x to cancel`)
            }
            
        }else{
            break 
        }
        }
        return 
    }
}








let m = new Main(c1.name , c1.email_address, c1.phone_no)
m.controller()