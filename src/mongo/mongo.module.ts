import { Global, Module } from "@nestjs/common";
import { MongoService } from "./mongo.service";

const mongoose = require("mongoose");

@Global()
@Module({
    providers:[MongoService],
    exports:[MongoService]
})

export class MongoModule {
  constructor(){
    mongoose.connect("mongodb://localhost:27017/nestjs-test-project");
    console.log("mongo connected............");
  }
}