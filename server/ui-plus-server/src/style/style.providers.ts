import { Connection } from 'mongoose';
import { StyleSchema } from '../schemas/style.schema';

export const styleProviders = [
  {
    provide: 'STYLE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Style', StyleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
