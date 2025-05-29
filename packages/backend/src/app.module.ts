import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BlogGenerationSchedulerService } from './blog-generation/blog-generation-scheduler.service';
import { BlogGenerationController } from './blog-generation/blog-generation.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController, BlogGenerationController],
  providers: [AppService, BlogGenerationSchedulerService],
})
export class AppModule {}
