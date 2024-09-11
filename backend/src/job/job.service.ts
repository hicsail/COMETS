import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';




@Injectable()
export class JobService {
    private readonly frontendURL = this.configService.getOrThrow<string>('frontend.baseURL');

    constructor(
        @InjectModel(Job.name) private jobModel: Model<Job>,
        private configService: ConfigService
    ) {}

    
    async create(createJobDto: CreateJobDto) : Promise<Job> {

        const res = await this.jobModel.create(createJobDto);
        return res;
    }

    async findAll(): Promise<Job[]> {
        const jobs = await this.jobModel.find();
        return jobs;
    }

    async purge(): Promise<void> {
        await this.jobModel.deleteMany({});
    }

    async sendEmail(email: string, id: string, status: string): Promise<void>{
        const transporter = nodemailer.createTransport({
            host: "smtp.mailgun.org",
            port: 465,
            secure: true,
            auth: {
                user: this.configService.getOrThrow<string>('email.username'),
                pass: this.configService.getOrThrow<string>('email.password')
            }
        })
        console.log(this.configService.getOrThrow<string>('email.username'))
        let email_message;
        let email_title;
        if(status === 'success'){
            email_title = "Your COMETS SI simulation has been completed successfully"
            email_message = `Click here to view the results of your simulation: ${this.frontendURL}/results/${id}`
        }else if(status === 'failure'){
            email_title = "COMETS SI simluation you requested has failed"
            email_message = `Unfortunately, the simulation you requested has failed. Please try again on ${this.frontendURL}`
        }

        const mailOptions = {
            from: "comets_si@mail.sail.codes",
            to: email,
            subject: email_title,
            text: email_message
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
        const update = { 
            $set: {"fluxes": updateBody.fluxes },
            
        }
        const updatedJob = this.jobModel.findOneAndUpdate({id:updateBody.id}, update)
        return updatedJob;
    }

    async getById(id: string): Promise<Job>{
        const jobDocument = this.jobModel.findOne({id: id});
        return jobDocument;
    }

}
