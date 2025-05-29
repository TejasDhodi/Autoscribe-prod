import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class BlogGenerationSchedulerService {
  private readonly logger = new Logger(BlogGenerationSchedulerService.name);

  constructor(private scheduleRegistry: SchedulerRegistry) {}

  scheduleBlogGeneration(jobId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const job = new CronJob('10 * * * * *', () => {
      this.logger.warn(`time (10) for job ${jobId} to run!`);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.scheduleRegistry.addCronJob(jobId, job);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    job.start();
  }

  cancelBlogGeneration(id: string) {
    const job = this.scheduleRegistry.getCronJob(id);
    if (!job) {
      throw new NotFoundException(`No scheduled job found for ID: ${id}`);
    }
    void job.stop();
    this.scheduleRegistry.deleteCronJob(id);
    this.logger.log(`Cancelled blog generation for ID: ${id}`);
  }
}
