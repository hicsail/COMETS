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
            this.logger.debug(`Adding job with ID: ${id} to queue`);
        } catch (error) {
            const { id } = job.data;
            this.logger.error(`Failed to add job with ID: ${id}`);
            this.logger.error(error.message, error.stack);
            throw error;
        }
    }
}
