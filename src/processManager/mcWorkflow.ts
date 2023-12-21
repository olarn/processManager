import { MCRequest } from './mcRequest';
import { MCStep } from './mcStep';

export class MCWorkflow {
  private currentStep: string;
  private steps: Array<MCStep>;

  constructor(currentStep: string, steps: Array<MCStep>) {
    this.currentStep = currentStep;
    this.steps = steps;
  }

  perform(request: MCRequest) {
    // - create order ที่ cart
    // - reserve ของที่ DT
    // - กลับมา update SOID
  }

  getNextStep(): MCStep {
    const currentStep = this.steps.find(
      (step) => step.currentStep === this.currentStep
    );
    if (!currentStep) {
      throw new Error('Cannot find current step');
    }
    return currentStep;
  }
}
