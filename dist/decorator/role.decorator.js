"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'rolePermissions';
const RolePermissions = (...rolePermissions) => (0, common_1.SetMetadata)(exports.ROLES_KEY, rolePermissions);
exports.RolePermissions = RolePermissions;
//# sourceMappingURL=role.decorator.js.map