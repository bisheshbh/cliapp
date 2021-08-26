import {total_users} from '../schemas/users'
import {User} from '../interfaces/UserInterface'



export class Users implements User{
    id :string ;
    name : string;
    email_address : string;
    phone_no: number;
    carts: string[] 

    constructor(name:string , email_address:string, phone_no:number, carts:string[] = []){
        // Static user id allocation , can be made dynamic uuid
        this.id = "u12" 
        this.name = name 
        this.email_address = email_address
        this.phone_no = phone_no
        this.carts = carts
    }

    createUser(): object{
        // check if user exists [TODO]
        let created = { 
            id : this.id,
            name : this.name , 
            email_address : this.email_address , 
            phone_no : this.phone_no,
            carts : this.carts
        }
        total_users.push(created)
        return created
    }

    removeUser(email_address:string){
        console.log(email_address)
    }

    filterUser(id_value:string){
        for (let user in total_users)
            if(total_users[user].id === id_value){
                return user 
            }
        return 
    }
}

export let u1 = new Users("Bishesh", "biseshbhattaraiii@gmail.com", 94343434)
u1.createUser()