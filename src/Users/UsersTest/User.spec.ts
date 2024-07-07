import { Test } from "@nestjs/testing";
import { UsersRepository } from "../Users.repository";
import { UserService } from "../Users.service"
import { UsersDTOPost } from "../UserDTO/UserDTO";
import { BadRequestException } from "@nestjs/common";

describe('userService', ()=>{
    let userService:UserService;
    let usersRepository:UsersRepository;

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

    beforeEach(async()=>{
        const module = await Test.createTestingModule({
            providers:[UserService, {provide:UsersRepository, useValue:mockUsersRepository}]
        }).compile();
        
        userService = module.get<UserService>(UserService);
        usersRepository = module.get<UsersRepository>(UsersRepository)
    })
    
    it('userService esta definido', ()=>{
        expect(userService).toBeDefined();
    })

    it('getUsers() devuelve un array de usuarios', async()=>{
        const result = await userService.getAllUsers();
        expect(result).toEqual([
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15930', name: 'Patoooooo', email: 'patoO@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15931', name: 'Patooooo1', email: 'patoO1@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15932', name: 'Patooooo2', email: 'patoO2@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15933', name: 'Patooooo3', email: 'patoO3@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15934', name: 'Patooooo4', email: 'patoO4gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },    
          ]);
    })

    it('getUserPage() devuelve un array de usuarios dependiendo el valor pasado por page y limit', async()=>{
        const result = await userService.getAllUsersPage(1,2);
        expect(result).toEqual([
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15930', name: 'Patoooooo', email: 'patoO@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },
            { id: '90de9fa0-b6cc-48b2-865c-d42f7df15931', name: 'Patooooo1', email: 'patoO1@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },]);
    })

    it('buscar usuario por id', async()=>{
        const result = await userService.getUserById('90de9fa0-b6cc-48b2-865c-d42f7df15930')
        expect(result).toEqual({ id: '90de9fa0-b6cc-48b2-865c-d42f7df15930', name: 'Patoooooo', email: 'patoO@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York' },)
    })

    it('cargar usuario',async()=>{
        const result = await userService.addUser({name: 'Patoooooo', password:'Pat0@1234', passwordConfirm:'Pat0@1234',email: 'pato99@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York'})
        expect(result).toEqual({id:'90de9fa0-b6cc-48b2-865c-d42f7df15935',name: 'Patoooooo',email: 'pato99@gmail.com', phone: 1234567890, country:'uuuusa', address: '1234 Main St, Apt 101', city:'New York'})
    })

    it('cargar usuario que ya existe',async()=>{
        const userToAdd = {
            name: 'Patoooooo',
            password: 'Pat0@1234',
            passwordConfirm: 'Pat0@1234',
            email: 'patoO@gmail.com',
            phone: 1234567890,
            country: 'uuuusa',
            address: '1234 Main St, Apt 101',
            city: 'New York'
        };        
        await expect(userService.addUser(userToAdd)).rejects.toThrow(BadRequestException)
    })
})