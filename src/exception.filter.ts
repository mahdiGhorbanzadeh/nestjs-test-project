import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    console.log('exception', exception);
    // switch (exception.code) {
    //   case 11000:
    //   // duplicate exception
    //   // do whatever you want here, for instance send error to client
    // }
  }
}
