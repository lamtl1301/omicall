import *as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config();

export const dataSourceOptions: DataSourceOptions = ({
    type: 'postgres',
    host: 'omicall.cynisqrgpez0.ap-southeast-1.rds.amazonaws.com' ,
    //host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'se141056',
    // password: 'pass123',
    // database: 'omicrm',
    database: 'omicall',
    entities: [__dirname + "/../**/*.entity{.js,.ts}"], 
    logging: true,
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/**/migration/*{.js,.ts}'],
    

})
const dataSource = new DataSource(dataSourceOptions)
export default dataSource


