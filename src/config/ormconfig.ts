//import *as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

//dotenv.config({path: __dirname + '/.env'});

export const dataSourceOptions: DataSourceOptions = ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'omicall',
    entities: ['dist/**/*.entity{.js,.ts}'],
    logging: true,
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/**/migration/*{.js,.ts}'],
    

})
const dataSource = new DataSource(dataSourceOptions)
export default dataSource


