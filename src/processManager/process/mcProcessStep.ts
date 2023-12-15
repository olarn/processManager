import { McPayload } from './mcPayload';
import { McFlow, McStep } from './mcPayload';

export class McProcessStep {
  constructor(
    public flow: McFlow,
    public step: McStep,
    public url: string,
    public perform?: (payload: McPayload) => void,
    public conditions?: Array<(payload: McPayload) => boolean>,
    public nextSteps?: (payload: McPayload) => McProcessStep
  ) {}

  isConditionMet(payload: McPayload): boolean {
    if (!this.conditions) {
      return true;
    }

    for (const condition of this.conditions) {
      if (!condition(payload)) {
        return false;
      }
    }

    return true;
  }
}
