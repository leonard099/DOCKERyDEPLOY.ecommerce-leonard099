import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import {Products} from './Products.entity'
import {Categories} from '../Categories/Categories.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto, ModificarProductDto } from "./ProductsDTO/ProductsDTO";
@Injectable()
export class ProductsRepository {
    constructor(@InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(Categories) private categoriesRepository: Repository<Categories>){}
   
    
    async preCarga():Promise<void>{
      const categoriasPreCargadas: Categories[] = await this.categoriesRepository.find();
      const categoryMap = new Map(categoriasPreCargadas.map(cat => [cat.name, cat]));
      const productos: Omit<Products,'id' | 'estado'>[] = [
        {
          name: 'Smartphone X',
          description: 'Último modelo de smartphone con cámara de alta resolución',
          price: 999.99,
          stock: 50,
          imgUrl: 'https://example.com/smartphone-x.jpg',
          categories: categoryMap.get('Electrónica'),
          orderDetails: []
      },
      {
          name: 'Libro: Historia del Siglo XX',
          description: 'Un detallado recorrido por los eventos más importantes del siglo XX',
          price: 39.99,
          stock: 100,
          imgUrl: 'https://example.com/libro-historia.jpg',
          categories: categoryMap.get('Libros'),
          orderDetails: []
      },
      {
          name: 'Set de herramientas profesionales',
          description: 'Kit completo de herramientas para uso profesional',
          price: 299.99,
          stock: 30,
          imgUrl: 'https://example.com/set-herramientas.jpg',
          categories: categoryMap.get('Herramientas'),
          orderDetails: []
      },
      {
          name: 'Pelota de fútbol Adidas',
          description: 'Pelota oficial de la marca Adidas para prácticas y partidos',
          price: 29.99,
          stock: 200,
          imgUrl: 'https://example.com/pelota-futbol.jpg',
          categories: categoryMap.get('Deportes'),
          orderDetails: []
      },
      {
          name: 'Juego de mesa: Ajedrez clásico',
          description: 'Tablero y piezas de ajedrez para disfrutar del juego clásico',
          price: 49.99,
          stock: 80,
          imgUrl: 'https://example.com/ajedrez.jpg',
          categories: categoryMap.get('Juguetes y Juegos'),
          orderDetails: []
      },
      {
          name: 'Crema antiarrugas',
          description: 'Crema facial antiarrugas con colágeno y ácido hialurónico',
          price: 19.99,
          stock: 150,
          imgUrl: 'https://example.com/crema-antiarrugas.jpg',
          categories: categoryMap.get('Salud y Belleza'),
          orderDetails: []
      },
      {
          name: 'Cámara de seguridad para automóvil',
          description: 'Cámara HD para grabación continua y vigilancia en el automóvil',
          price: 79.99,
          stock: 50,
          imgUrl: 'https://example.com/camara-seguridad-auto.jpg',
          categories: categoryMap.get('Automóviles y Motos'),
          orderDetails: []
      },
      {
          name: 'Jaula para pájaros',
          description: 'Jaula espaciosa y segura para pájaros pequeños',
          price: 49.99,
          stock: 100,
          imgUrl: 'https://example.com/jaula-pajaros.jpg',
          categories: categoryMap.get('Mascotas'),
          orderDetails: []
      },
      {
          name: 'Vino tinto reserva',
          description: 'Botella de vino tinto reserva con añejamiento en barrica de roble',
          price: 29.99,
          stock: 120,
          imgUrl: 'https://example.com/vino-tinto.jpg',
          categories: categoryMap.get('Alimentos y Bebidas'),
          orderDetails: []
      },
      {
          name: 'Mesa plegable',
          description: 'Mesa plegable de madera para uso en interiores y exteriores',
          price: 89.99,
          stock: 40,
          imgUrl: 'https://example.com/mesa-plegable.jpg',
          categories: categoryMap.get('Muebles'),
          orderDetails: []
      },
      {
          name: 'Set de acuarelas profesionales',
          description: 'Set completo de acuarelas y pinceles para artistas profesionales',
          price: 59.99,
          stock: 60,
          imgUrl: 'https://example.com/acuarelas.jpg',
          categories: categoryMap.get('Arte y Manualidades'),
          orderDetails: []
      },
      {
          name: 'Guitarra acústica',
          description: 'Guitarra acústica de calidad con cuerdas de nylon',
          price: 199.99,
          stock: 25,
          imgUrl: 'https://example.com/guitarra-acustica.jpg',
          categories: categoryMap.get('Instrumentos Musicales'),
          orderDetails: []
      },
      {
          name: 'Blu-ray: Colección de películas clásicas',
          description: 'Colección de películas clásicas en formato Blu-ray',
          price: 79.99,
          stock: 30,
          imgUrl: 'https://example.com/blu-ray-clasicas.jpg',
          categories: categoryMap.get('Películas y Series'),
          orderDetails: []
      },
      {
          name: 'Monitor gaming',
          description: 'Monitor gaming de alta resolución y frecuencia de actualización',
          price: 399.99,
          stock: 20,
          imgUrl: 'https://example.com/monitor-gaming.jpg',
          categories: categoryMap.get('Computadoras y Accesorios'),
          orderDetails: []
      },
      {
          name: 'Estuche para celular',
          description: 'Estuche resistente y elegante para proteger tu celular',
          price: 19.99,
          stock: 150,
          imgUrl: 'https://example.com/estuche-celular.jpg',
          categories: categoryMap.get('Celulares y Accesorios'),
          orderDetails: []
      },
      {
          name: 'Paquete vacacional a Bali',
          description: 'Paquete de vacaciones todo incluido a la paradisíaca isla de Bali',
          price: 1499.99,
          stock: 10,
          imgUrl: 'https://example.com/vacaciones-bali.jpg',
          categories: categoryMap.get('Viajes'),
          orderDetails: []
      },
      {
          name: 'Robot aspirador',
          description: 'Robot inteligente para limpieza automática de suelos',
          price: 299.99,
          stock: 30,
          imgUrl: 'https://example.com/robot-aspirador.jpg',
          categories: categoryMap.get('Electrodomésticos'),
          orderDetails: []
      },
      {
          name: 'Ropa deportiva: Conjunto de entrenamiento',
          description: 'Conjunto de ropa deportiva para entrenamientos intensivos',
          price: 49.99,
          stock: 100,
          imgUrl: 'https://example.com/ropa-deportiva.jpg',
          categories: categoryMap.get('Ropa y Accesorios'),
          orderDetails: []
      },
      {
          name: 'Manguera de jardín',
          description: 'Manguera resistente y flexible para riego de jardines',
          price: 29.99,
          stock: 80,
          imgUrl: 'https://example.com/manguera-jardin.jpg',
          categories: categoryMap.get('Jardín y Exterior'),
          orderDetails: []
      },
      {
          name: 'Biberón para bebé',
          description: 'Biberón ergonómico y seguro para bebés recién nacidos',
          price: 9.99,
          stock: 200,
          imgUrl: 'https://example.com/biberon-bebe.jpg',
          categories: categoryMap.get('Bebés y Niños'),
          orderDetails: []
      },
      {
          name: 'Silla de oficina ergonómica',
          description: 'Silla ajustable y ergonómica para largas horas de trabajo',
          price: 149.99,
          stock: 50,
          imgUrl: 'https://example.com/silla-oficina.jpg',
          categories: categoryMap.get('Muebles'),
          orderDetails: []
      },
      {
          name: 'Lámpara LED de escritorio',
          description: 'Lámpara moderna de escritorio con iluminación LED',
          price: 24.99,
          stock: 120,
          imgUrl: 'https://example.com/lampara-led.jpg',
          categories: categoryMap.get('Hogar y Cocinan'),
          orderDetails: []
      },
      {
          name: 'Cuadro decorativo',
          description: 'Cuadro decorativo para embellecer cualquier espacio del hogar',
          price: 39.99,
          stock: 60,
          imgUrl: 'https://example.com/cuadro-decorativo.jpg',
          categories: categoryMap.get('Arte y Manualidades'),
          orderDetails: []
      },
      {
          name: 'Pantalones vaqueros',
          description: 'Pantalones vaqueros clásicos y cómodos para uso diario',
          price: 49.99,
          stock: 150,
          imgUrl: 'https://example.com/pantalones-vaqueros.jpg',
          categories: categoryMap.get('Ropa y Accesorios'),
          orderDetails: []
      },
    ];
      try {
        for (const producto of productos) {
          const productosPrecargados = await this.productsRepository.findOne({ where: { name: producto.name } })
          if(!productosPrecargados&&producto.categories){
            await this.productsRepository.save(producto)
          } else{
            console.log('Producto ya existe')
          }
        }
      } catch (error) {
        throw new Error ('Fallo en base de datos')
      }
    }
    

    async getProducts(page,limit):Promise<Products[]> {
        let productos = await this.productsRepository.find({where: {estado: true},relations:['categories','orderDetails']})
        let inicio = (parseInt(page)-1)*parseInt(limit)
        let fin = inicio+parseInt(limit)
        return productos.slice(inicio,fin);
      };

    async getProduct(id:string):Promise<Products> {
      try{
        return await this.productsRepository.findOneOrFail({where:{id, estado:true}, relations:['categories','orderDetails']});
      }catch{
        throw new BadRequestException('El producto no existe');
      }
    }  
    async addProduct(product:CreateProductDto):Promise<Products> {
      const categoria = await this.categoriesRepository.findOne({where:{id: product.categoriesId}})  
      if(!categoria){
        throw new BadRequestException('La categoria proporcionada no existe')
      }
      const producto = await this.productsRepository.findOne({where:{name:product.name}})
      if(producto){
        throw new BadRequestException('El producto ya existe')
      }
      const productosCreado = await this.productsRepository.create(product);
      productosCreado.categories = categoria
      return await this.productsRepository.save(productosCreado)
    };

    async updateProduct(id:string, product: ModificarProductDto): Promise<Products> {
      if(product.categoriesId){
        const newCategorie = await this.categoriesRepository.findOne({where:{id:product.categoriesId}})
        const producto = await this.productsRepository.findOne({where:{id}})
        if (producto) {
          const productoActualizado = await this.productsRepository.merge(producto, product)
          productoActualizado.categories=newCategorie
          return await this.productsRepository.save(productoActualizado);
        } else {
          throw new Error('El producto no existe');
        }
      }else{
        const producto = await this.productsRepository.findOne({where:{id}})
        if (producto) {
          const productoActualizado = await this.productsRepository.merge(producto, product)
          return await this.productsRepository.save(productoActualizado);
        } else {
          throw new Error('El producto no existe');
        }
      } 
    }
    async deleteProduct(id:string):Promise<string>{ 
      const productoABorrar = await this.productsRepository.findOne({where:{id, estado:true}})
      if(productoABorrar){
          await this.productsRepository.update({id}, {estado:false})
          return 'Producto eliminado'
      } else {
          throw new BadRequestException('El producto no existe')
      }         
    }
}