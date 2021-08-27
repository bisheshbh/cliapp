import { products } from "./schemas/products";

const p = [
    {
        id:'e21',
        name:'Laptop', 
        total_remaining_items : 4, 
        price: 45000

    },
    {
        id:'e22',
        name:'MI Redmi Pro 10', 
        total_remaining_items : 4, 
        price: 35000

    },
    {
        id:'e23',
        name:'Razer Blade', 
        total_remaining_items : 4, 
        price: 120000

    },
    {
        id:'e24',
        name:'Samsung M62', 
        total_remaining_items : 4, 
        price: 36000

    }

]


const cart = ['e24', 'e23']
let amount = 0;
cart.map((c:string) => {
    p.map((i:object , index:number) => {
        if (c === p[index].id){
            amount += p[index].price
            console.log(i)
            
        }
    })
})
console.log(amount)

