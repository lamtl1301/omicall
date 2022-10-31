import { RolePermission } from 'src/utils/role-permission.enum';
export declare const ROLES_KEY = "rolePermissions";
export declare const RolePermissions: (...rolePermissions: RolePermission[]) => import("@nestjs/common").CustomDecorator<string>;
