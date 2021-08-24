export let total_users:
{id:string, name:string , email_address : string , phone_no: number , carts:string[]}[]  = []

export type product_list = 
{id: string , name:string, total_remaining_items:number , price:number};

export let products: product_list[] = [
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
