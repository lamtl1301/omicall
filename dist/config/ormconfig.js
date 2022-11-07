"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
dotenv.config();
exports.dataSourceOptions = ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'omicrm',
    entities: [__dirname + "/../**/*.entity{.js,.ts}"],
    logging: true,
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/**/migration/*{.js,.ts}'],
});
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=ormconfig.js.map