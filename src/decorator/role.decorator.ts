import { SetMetadata } from '@nestjs/common';
import { RolePermission } from 'src/utils/role-permission.enum';

export const ROLES_KEY = 'rolePermissions';
export const RolePermissions = (...rolePermissions: RolePermission[]) => SetMetadata(ROLES_KEY, rolePermissions);