import { Module } from '@nestjs/common';
import { LoadController } from './adapters/load.controller';
import { InMemoryLoadRepository } from 'infrastructure/repository/inmemory-load.repository';
import { CreateLoadUseCase } from 'application/use-cases/create-load.use-case';
import { UpdateLoadStatusUseCase } from 'application/use-cases/update-load-status-use.case';
import { LoadService } from 'application/services/load.service';

@Module({
  controllers: [LoadController],
  providers: [
    {
      provide: 'ICreateLoadRepository',
      useClass: InMemoryLoadRepository,
    },
    {
      provide: 'IUpdateLoadRepository',
      useClass: InMemoryLoadRepository,
    },
    {
      provide: CreateLoadUseCase,
      useFactory: (repo) => new CreateLoadUseCase(repo),
      inject: ['ICreateLoadRepository'],
    },
    {
      provide: UpdateLoadStatusUseCase,
      useFactory: (repo) => new UpdateLoadStatusUseCase(repo),
      inject: ['IUpdateLoadRepository'],
    },

    LoadService,
  ],
})
export class AppModule {}
