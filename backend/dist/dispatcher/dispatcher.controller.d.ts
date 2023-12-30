import { DispatcherService } from './dispatcher.service';
export declare class DispatcherController {
    private dispatcherService;
    constructor(dispatcherService: DispatcherService);
    dispatch(): Promise<void>;
}
