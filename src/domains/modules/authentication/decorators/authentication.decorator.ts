import { ReflectMetadata } from '@nestjs/common';

export const Authentication = (...args: string[]) => ReflectMetadata('authentication', args);
