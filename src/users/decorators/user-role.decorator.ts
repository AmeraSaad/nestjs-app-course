import { SetMetadata } from "@nestjs/common";
import { UserTypeEnum } from "src/utils/enums";

// rples method decorator
export const Role = (...roles: UserTypeEnum[]) => SetMetadata('roles', roles);