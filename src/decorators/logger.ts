export function logger(){
    return function<T extends {new(...args:any[]):{name:string, carts:String[], amount:number}}> (originalConstructor:T) {
        return class extends originalConstructor{
            constructor(..._args:any[]){
                super();
                console.log(this.carts , this.amount)
                
            }
        }
    }
}