import { McPayload } from './mcPayload';
import { McProcessStep } from './mcProcessStep';

export class McProcess {
  constructor(public steps: Array<McProcessStep>) {}

  perform(payload: McPayload): void {
    const currentStep = this.getCurrentStep(payload);
    if (!currentStep) {
      throw new Error(`Step not found: ${payload.step}`);
    }
    if (!currentStep.isConditionMet(payload)) {
      throw new Error(`Condition not met: ${currentStep}`);
    }
    if (!currentStep.perform) {
      throw new Error(`Perform not found: ${currentStep}`);
    }

    currentStep.perform(payload);
  }

  getNextStep(payload: McPayload): McProcessStep {
    const currentStep = this.getCurrentStep(payload);
    if (!currentStep) {
      throw new Error(`Step not found: ${currentStep}`);
    }
    if (!currentStep.nextSteps) {
      throw new Error(`Next step not found: ${currentStep}`);
    }
    return currentStep.nextSteps(payload);
  }

  getCurrentStep(payload: McPayload): McProcessStep | undefined {
    return this.steps.find(
      (s) => s.flow === payload.flow && s.step === payload.step
    );
  }
}
