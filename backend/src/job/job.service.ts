import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "cometssmartinterface@gmail.com",
        pass: "gvzabudgxiglufki"
    }
})


@Injectable()
export class JobService {
    private readonly frontendURL = this.configService.getOrThrow<string>('frontend.baseURL');

    constructor(
        @InjectModel(Job.name) private jobModel: Model<Job>,
        private configService: ConfigService
    ) {}

    async create(createJobDto: CreateJobDto) : Promise<Job> {

        const res = await this.jobModel.create(createJobDto);
        console.log(`http://localhost:5173/results/${res.id}`)

        return res;
    }

    async findAll(): Promise<Job[]> {
        const jobs = await this.jobModel.find();
        return jobs;
    }

    async purge(): Promise<void> {
        await this.jobModel.deleteMany({});
    }

    async sendEmail(email: string, id: string): Promise<void>{
        const mailOptions = {
            from: "cometssmartinterface@gmail.com",
            to: email,
            subject: "Your COMETS SI simulation has been completed",
            text: `Click here to view the results of your simulation: ${this.frontendURL}/results/${id}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });
    }

    async update(updateBody: UpdateJobDto): Promise<Job> {
        const updatedJob = this.jobModel.findByIdAndUpdate()
        return updatedJob;
    }

}
