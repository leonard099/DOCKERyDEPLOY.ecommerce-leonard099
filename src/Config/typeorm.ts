import {  DataSource, DataSourceOptions } from "typeorm"
import {config as dotenvConfig} from 'dotenv'
import { registerAs } from "@nestjs/config"
dotenvConfig({path: '.env.development'})

const config= {
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT as unknown as number,
    username :process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: false,
    logging:false,
    schema: 'public',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations:['/home/leonardopieroni/Escritorio/PM4BE-leonard099/ecommerce-leonard099/dist/migration/*{.ts,.js}'],
};
export default registerAs('typeorm', ()=> config)
export const connectionSource = new DataSource(config as DataSourceOptions)