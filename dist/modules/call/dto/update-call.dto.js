"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCallDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_call_dto_1 = require("./create-call.dto");
class UpdateCallDto extends (0, swagger_1.PartialType)(create_call_dto_1.CreateCallDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCallDto = UpdateCallDto;
//# sourceMappingURL=update-call.dto.js.map