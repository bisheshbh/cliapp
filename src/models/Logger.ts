import { logger } from "../decorators/logger"


@logger()
export class Logger{
    name = "bisesh";
    carts = [];
    amount = 3;
    constructor(){}
}

