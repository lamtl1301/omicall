"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./filters/global-exception.filter");
const form_data_pipe_1 = require("./pipe/form-data.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.enableCors();
    app.setGlobalPrefix('api/v1');
    const swagger = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Omicrm')
        .setDescription('API Omicrm')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swagger);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha'
        }
    });
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    app.useGlobalPipes(new form_data_pipe_1.FormDataPipe());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map