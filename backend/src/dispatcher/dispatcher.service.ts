import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import axios from 'axios';
import { Queue } from 'bull'; 


@Injectable()
export class DispatcherService {
    // True if server is available to run a simulation
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

    async dispatch(): Promise<any> {
        // uses BQ to get the next request/job on the queue
        const job = await this.queue.getNextJob();

        if (job) {
            try {
                const jsonData = job.data;
                // serverStatus has to change
                this.serverStatus = false;
                // job/request is sent to Flask server using standard HTTP. Destination can be changed to Serverless Function
                const response = await axios.post('http://127.0.0.1:5000/process', jsonData);
                await job.moveToCompleted('done', true)
                this.serverStatus = true;
                return response;
            }
            catch (error) {
                console.error('Error disptaching job:', error);
                await job.moveToFailed({ message: error.message });
                this.serverStatus = true
            } 
        }
        else {
            console.log('No jobs in the queue!');
        } 
    }
}
 