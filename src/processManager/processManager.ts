import { McPayload } from './process/mcPayload';
import { McProcessFactory } from './factory/mcProcessFactory';
import { McProcessStep } from './process/mcProcessStep';

export class ProcessManager {
  emit(payload: McPayload): McProcessStep {
    const currentProcess = new McProcessFactory().getProcess(payload);
    currentProcess.perform(payload);
    return currentProcess.getNextStep(payload);
  }
}
