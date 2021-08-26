import {Carts} from '../interfaces/CartInterface'
import { products } from '../schemas/products'
import {Users, u1} from './User'
import {total_users} from '../schemas/users'


export class Cart extends Users implements Carts{
    
    amount : number;
    constructor(name:string , email_address:string, phone_no:number , amount : number = 0){
        super(name , email_address, phone_no)
        this.amount = amount
        
    }
    
    generateInvoice(amount:number, carts:String[]){
        return {
            id: this.id,
            name: this.name, 
            email_address:this.email_address,
            phoneno:this.phone_no,
            carts : carts,
            amount : amount
        }
    }
    
    checkProductId(product_id:string){
        let products_ids = []
        for (let product in products){
            products_ids.push(products[product].id)
        }
        
        if(products_ids.includes(product_id)) {
            
            return true 
        }
        return false 
    }

    updateCart(id:string , product_id:string){
      
        if(this.checkProductId(product_id)){
        let  f_user  = this.filterUser(id); 
        if (f_user){
         total_users[+f_user].carts.push(product_id)
        }else{
            console.log("Error : Correct user id is required")
        }
         
        }else{
         console.log("Error : Correct product id is required .")
     }
        return 
    }

    emptyCart(){
       let f_user = this.filterUser(this.id);
       if(f_user){
           total_users[+f_user].carts = []
       }
    }

    viewCartDetails(user_id:string){
        let f_user = this.filterUser(user_id)
        if(f_user){
        type cart_view_list = {id: string , name:string, price:number};
        let viewing_cart: cart_view_list[] = []; 
        let carts_list = total_users[+f_user].carts
        for (let i in carts_list){
                for ( let product in products){
                    let identity = products[product];
                    
                    if(carts_list[i] === identity.id){
                        viewing_cart.push({id:identity.id, name:identity.name , price:identity.price})
                    }
                }
        }
        return viewing_cart;
    }else{
        return "Error : Correct user id is required"
    }
    return
}

    viewCart(user_id:string, detail:boolean = false){
      
        let f_user = this.filterUser(user_id)
        if (f_user){
            if(detail){
               
            }
            return total_users[+f_user].carts

        }else{
            return "Warning : Correct user id is required"
        }
         
    }

    buyCart(){
        // Total amount calculated at runtime 
        let total_amount = 0;
        let cart = this.viewCart(this.id)
        if(typeof cart != 'string'){
            for (let c in cart){ 
                for (let product in products){
                    if(cart[+c] === products[product].id){
                    total_amount += products[product].price
                        products[product].total_remaining_items -= 1 
                    }
                }
            }
    }
        if(typeof cart != 'string'){
            return this.generateInvoice(total_amount, cart)

        }
        return
    }
}

export let c1 = new Cart(u1.name , u1.email_address, u1.phone_no)
