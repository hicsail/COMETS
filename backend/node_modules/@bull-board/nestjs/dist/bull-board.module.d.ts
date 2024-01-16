import { DynamicModule } from "@nestjs/common";
import { BullBoardModuleOptions, BullBoardQueueOptions } from "./bull-board.types";
export declare class BullBoardModule {
    static forFeature(...queues: BullBoardQueueOptions[]): DynamicModule;
    static forRoot(options: BullBoardModuleOptions): DynamicModule;
}
