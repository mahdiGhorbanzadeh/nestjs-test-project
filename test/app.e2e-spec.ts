import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { User, UserSchema } from './../src/user/schemas/user.schema';
import { spec } from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // const uri = mongod.getUri();

    // console.log('uri', uri);

    mongoConnection = (
      await connect('mongodb://localhost:27017/nestjs-test-project')
    ).connection;

    // userModel = mongoConnection.model('users', UserSchema);

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    app.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('create user', async () => {
    await spec()
      .post('http://localhost:3333/auth/signup')
      .withHeaders('Content-Type', 'application/json')
      .withBody({
        email: 'ali@yahoo.com',
        password: '122132132133',
      })
      .expectStatus(201);
  });
});
