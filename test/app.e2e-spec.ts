import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersDTOPost } from 'src/Users/UserDTO/UserDTO';
import { UsersRepository } from '../src/Users/Users.repository';
import { ProductsRepository } from '../src/Products/Products.repository';
import { AuthGuard } from '../src/Auth/AuthGuard/AuthGuard.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let accessToken = 'tokenInvalido';
  it('/sigIn',async ()=>{

    const signInData = {
      "email":"patoA@gmail.com",
      "password":"Pa@to123",
    }

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(signInData);
      expect(201)
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('token');
    
      accessToken=response.body.token
  })
  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 

    response.body.forEach((user: any) => { 
      expect(user.id).toBeDefined(); 
      expect(user.name).toBeDefined(); 
      expect(user.email).toBeDefined();
      expect(user.phone).toBeDefined();
      expect(user.country).toBeDefined(); 
      expect(user.address).toBeDefined(); 
      expect(user.city).toBeDefined();
    })
  })
  it('/users/:id', async ()=>{
    const response = await request(app.getHttpServer())
    .get('/users/a1e9b343-c849-47b0-85c8-9f26766bee65')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200)
    expect(response.body).toEqual({
      "id": "a1e9b343-c849-47b0-85c8-9f26766bee65",
      "name": "Pato Administrador",
      "email": "patoA@gmail.com",
      "phone": "1234567890",
      "country": "uuuusa",
      "address": "1234 Main St, Apt 101",
      "city": "New York",
      "orders": []
    })
  })
  
})


/////////////////////////////////////////////////////////////////////////////////////////////////////

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockUsersRepository = {
      getAllUsers: jest.fn().mockResolvedValue([
        { id: '90de9fa0-b6cc-48b2-865c-d42f7df15930', name: 'Patoooooo', email: 'patoO@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
        { id: '90de9fa0-b6cc-48b2-865c-d42f7df15931', name: 'Patooooo1', email: 'patoO1@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
        { id: '90de9fa0-b6cc-48b2-865c-d42f7df15932', name: 'Patooooo2', email: 'patoO2@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
        { id: '90de9fa0-b6cc-48b2-865c-d42f7df15933', name: 'Patooooo3', email: 'patoO3@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
        { id: '90de9fa0-b6cc-48b2-865c-d42f7df15934', name: 'Patooooo4', email: 'patoO4gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },    
      ]),
      getAllUsersPage: jest.fn().mockImplementation(async (page: number, limit: number) => {
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const users = await mockUsersRepository.getAllUsers()
          const resultado = users.slice(startIndex, endIndex);
          return Promise.resolve(resultado);
        }), 
      getUserById: jest.fn().mockImplementation(async (id:string)=>{
          const users = await mockUsersRepository.getAllUsers()
          return Promise.resolve(users.find(user => user.id === id));
      }),
      addUser: jest.fn().mockImplementation(async (user:UsersDTOPost)=>{
          const nuevoUsuario = {
              id:'90de9fa0-b6cc-48b2-865c-d42f7df15935',
              name:user.name,
              email:user.email,
              phone:user.phone,
              country:user.country,
              address:user.address,
              city:user.city
          }
          return nuevoUsuario
      }),
      getUserByMail: jest.fn().mockImplementation(async(email:string)=>{
          const users = await mockUsersRepository.getAllUsers()
          const user = (users.find(user => user.email === email));
          if(user){
              throw new BadRequestException('El usuario ya existe');
          }
          return Promise.resolve(user)

          
      })
    };
    const mockProductRepository = {
      addProduct: jest.fn().mockImplementation(async(signInData)=>{
        return {
          id: "01b213d6-ef59-4f8b-9568-4f15bef198bf",
          name: signInData.name,
          description: signInData.description,
          price: signInData.price,
          stock: signInData.stock,
          imgUrl: signInData.imgUrl,
          estado: true
        }
      })
    }
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(AuthGuard)
    .useValue({})
    .overrideProvider(UsersRepository)
    .useValue(mockUsersRepository)
    .overrideProvider(ProductsRepository)
    .useValue(mockProductRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/signup', async()=>{
    const signUpData = {
      "name": "Pato",
      "email": "pato@gmail.com",
      "password": "Pat0@123",
      "passwordConfirm": "Pat0@123",
      "phone": 1234567890,
      "country": "Argentina",
      "address": "1234 Main St, Apt 101",
      "city": "Buenos Aires",
      "IsAdmin":true
    }
    const response = await request(app.getHttpServer())
    .post('/auth/signup')
    .send(signUpData)
    .expect(201)
    .expect({
      id:'90de9fa0-b6cc-48b2-865c-d42f7df15935',
      name:'Pato',
      email:'pato@gmail.com',
      phone:1234567890,
      country:'Argentina',
      address:'1234 Main St, Apt 101',
      city:'Buenos Aires'
  })})

  
  it('/products', async ()=>{
    const dataProduct = {
      "name": "Televisor",
      "description": "Es el televiso mas grande, con sonido envolvente",
      "price": 1200.99,
      "stock": 10,
      "imgUrl": "https://example.com/laptop.jpg"
    }
    const response = await request(app.getHttpServer())
    .post('/products')
    .send(dataProduct)
    .expect(201)
    .expect({
      id: '01b213d6-ef59-4f8b-9568-4f15bef198bf',
      name: "Televisor",
      description: "Es el televiso mas grande, con sonido envolvente",
      price: 1200.99,
      stock: 10,
      imgUrl: "https://example.com/laptop.jpg",
      estado: true
    })
  })
})
