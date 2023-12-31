import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    let imports: DynamicModule['imports'] = []

    if (options.driver === 'orm') {
      imports = [
        // We are going to hardcode the connection options for simplicity
        // but you can use a configuration file or environment variables
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          password: 'pass123',
          username: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),

        // For read-only purposes
        MongooseModule.forRoot('mongodb://localhost:27018/vf-read-db'),
      ];
    } else if (options.driver === 'in-memory') {
      imports = [];
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}