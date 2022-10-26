import *as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config();

export const dataSourceOptions: DataSourceOptions = ({
    type: 'postgres',
    host: 'omicall.cynisqrgpez0.ap-southeast-1.rds.amazonaws.com' ,
    port: 5432,
    username: 'postgres',
    password: 'se141056',
    database: 'omicall',
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    logging: true,
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/**/migration/*{.js,.ts}'],
    

})
const dataSource = new DataSource(dataSourceOptions)
export default dataSource


