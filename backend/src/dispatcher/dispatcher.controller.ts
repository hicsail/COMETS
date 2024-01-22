import { Controller, Get } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service'

@Controller('dispatcher')
export class DispatcherController {
    constructor(private dispatcherService: DispatcherService) {}

    @Get('dispatch')
    async dispatch() : Promise<void> {
        this.dispatcherService.dispatch();
    }
}
