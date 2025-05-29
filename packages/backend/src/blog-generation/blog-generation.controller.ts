import { Body, Controller, Delete, Post } from '@nestjs/common';
import { BlogGenerationSchedulerService } from './blog-generation-scheduler.service';
import { SUCCESS } from 'constant/rest-api';

@Controller('blog-generation')
export class BlogGenerationController {
  constructor(private blogGenerationchedular: BlogGenerationSchedulerService) {}

  @Post('schedule')
  scheduleBlogGeneraion(@Body() body: { id: string }) {
    this.blogGenerationchedular.scheduleBlogGeneration(body.id);
    return {
      status: SUCCESS,
      message: 'Blog generation task schedule.',
    };
  }

  @Delete('cancel')
  cancelBlogGeneration(@Body() body: { id: string }) {
    this.blogGenerationchedular.cancelBlogGeneration(body.id);
    return {
      status: SUCCESS,
      message: `Blog generation task for ID ${body.id} has been cancelled.`,
    };
  }
}
