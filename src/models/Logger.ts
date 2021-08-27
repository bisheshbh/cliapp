// import { logger } from "../decorators/logger"


// @logger('ds', ['ds'], 54)
export class Logger{
    name : string;
    carts : string[];
    amount : number;
    constructor(name:string , carts:string[], amount:number){
        this.name = name 
        this.carts = carts 
        this.amount = amount
        console.log(this.name)
    }
    pass(){
        console.log("sd")
        return 
        
    }
}
