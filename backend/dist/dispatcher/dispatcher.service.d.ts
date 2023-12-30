import { Queue } from 'bull';
export declare class DispatcherService {
    private queue;
    private serverStatus;
    constructor(queue: Queue);
    initializeQueueListener(): void;
    dispatch(): Promise<void>;
}
