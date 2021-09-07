import {Carts} from '../interfaces/CartInterface'
import { products } from '../schemas/products'
import {Users, u1} from './User'
import {total_users} from '../schemas/users'
import { Logger } from '../models/Logger';
import { preProcessFile } from 'typescript';

// import {logger} from '../decorators/logger'



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
        let valid = 0;

        products.map((product:object , index:number) => {
            if(products[index].id === product_id && product)
            {
                
                valid = 1 
            }
        })

        if(valid)
        {
            return true
        }
        
        return false
        
    }

    updateCart(id:string , product_id:string){
        if(this.checkProductId(product_id))
        {
            let f_user  = this.filterUser(id); 
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
       if(f_user)
       {
           total_users[+f_user].carts = []
       }
    }

    viewCartDetails(user_id:string){
        let f_user = this.filterUser(user_id)
        if(f_user)
        {
            type cart_view_list = {id: string , name:string, price:number};
            let viewing_cart: cart_view_list[] = []; 
            let carts_list = total_users[+f_user].carts
            carts_list.map((cart_item:string)=>{
                products.map((_product_item:object , index:number) =>{
                    if(cart_item === products[index].id){
                        viewing_cart.push({id:products[index].id, name:products[index].name , price:products[index].price})
                    }
                })
            })
            return viewing_cart;
        }
        return "Error : Correct user id is required"
    }

    viewCart(user_id:string){
      
        let f_user = this.filterUser(user_id)
        
        if (f_user)
        {
            return total_users[+f_user].carts
        }
        
        return "Warning : Correct user id is required"
    }

    buyCart(){
        let cart = this.viewCart(this.id)
        if(typeof cart != 'string')
        {
             
            cart.map((c:string) => {
                products.map((_product:object, index:number) => {
                    if(c === products[index].id){
                        this.amount += products[index].price
                        let l = new Logger()
                    }
                })
            })
        }
        if(typeof cart != 'string')
        {
            return this.generateInvoice(this.amount, cart)
            
        }
        return
    }
}

export let c1 = new Cart(u1.name , u1.email_address, u1.phone_no)

