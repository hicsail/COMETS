import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import axios from 'axios';
import { Queue } from 'bull'; 


@Injectable()
export class DispatcherService {
    private serverStatus = true;

    constructor (
        @InjectQueue('queue') private queue: Queue,
    ) {
        this.initializeQueueListener();
    } 

    // dispatch when the server is free and jobs are waiting
    initializeQueueListener(): void {
        this.queue.on('waiting', async () => {
            const jobCounts = await this.queue.getJobCounts();
            const jobsWaiting = jobCounts.waiting;

            if (this.serverStatus == true && jobsWaiting > 0) {
                await this.dispatch();
            }
        });
    }

    async dispatch(): Promise<void> {
        const job = await this.queue.getNextJob();

        if (job) {
            try {
                // const jsonData = job.jsonData;
                this.serverStatus = false;
                const response = await axios.get('http://localhost:5000/process');
                await job.moveToCompleted('done', true)
                this.serverStatus = true;
            }
            catch (error) {
                console.error('Error disptaching job:', error);
                await job.moveToFailed({ message: error.message });
            } 
        }
        else {
            console.log('No jobs in the queue!');
        } 
    }
}
 