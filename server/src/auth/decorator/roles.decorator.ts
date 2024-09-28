import { SetMetadata } from "@nestjs/common";

export const Access = (access: string) => SetMetadata("access", access);
