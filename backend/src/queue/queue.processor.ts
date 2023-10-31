import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job as BullJob } from 'bull';

@Processor('queue')
export class QueueProcessor {
    private readonly logger = new Logger(QueueProcessor.name)

    @Process('job')
    async handleAddJob(job: BullJob<{id: string}>): Promise<void> {
        try {
            const { id } = job.data;
            this.logger.debug(`Processing job with ID: ${id}`);
        } catch (error) {
            const { id } = job.data;
            this.logger.error(`Failed to process job with ID: ${id}`);
            this.logger.error(error.message, error.stack);
            throw error;
        }
    }
}
