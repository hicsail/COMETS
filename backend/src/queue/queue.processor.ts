import { Process, Processor } from '@nestjs/bull';
import { Job as BullJob } from 'bull';
import { CreateJobDto } from '../job/dto/create-job.dto'; 
import axios from 'axios';


@Processor('queue')
export class QueueProcessor {

    @Process()
    async run(job: BullJob<CreateJobDto>): Promise<string> { 
        try {
            const response = await axios.get('http://127.0.0.1:5000/run', {
                params: job.data, 
                responseType: 'arraybuffer' 
            });
            const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
            return `data:image/jpeg;base64,${imageBase64}`;
        } catch (error) {
            console.error('Error occurred while making GET request:', error);
            throw error; 
        }
    }
}