import { MCRequest } from './mcRequest';
import { MCStep } from './mcStep';
import { MCWorkflow } from './mcWorkflow';

export class MCProcessManager {
  private workflow: MCWorkflow;
  private request: MCRequest;

  constructor(request: MCRequest) {
    this.workflow = this.getWorkFlowFromDB(request);
    this.request = request;
  }

  emit(): MCStep {
    this.workflow.perform(this.request);
    return this.workflow.getNextStep();
  }

  private getWorkFlowFromDB(request: MCRequest): MCWorkflow {
    const steps: Array<MCStep> = [
      {
        flowCode: 'AIS_CONTACT_PACK',
        currentStep: 'ORDER_SELECTED',
        nextStep: 'PACKAGE_SELECTED',
        nextUrl: '/package/',
        backUrl: '',
      },
      {
        flowCode: 'AIS_CONTACT_PACK',
        currentStep: 'PACKAGE_SELECTED',
        nextStep: 'CARE_SELECTED',
        nextUrl: '/care/',
        backUrl: '/device-sale/',
      },
      {
        flowCode: 'AIS_CONTACT_PACK',
        currentStep: 'CARE_SELECTED',
        nextStep: 'PAYMENT_SELECTED',
        nextUrl: '/cart/',
        backUrl: '/package/',
      },
      {
        flowCode: 'AIS_CONTACT_PACK',
        currentStep: 'READY_TO_PAY',
        nextStep: 'PAYMENT_SELECTED',
        nextUrl: '/payment/',
        backUrl: '/care/',
      },
      {
        flowCode: 'AIS_CONTACT_PACK',
        currentStep: 'PROVISIONED',
        nextStep: '',
        nextUrl: '/payment/',
        backUrl: '/cart/',
      },
    ].map(
      (step) =>
        new MCStep(
          step.currentStep,
          step.nextStep,
          step.nextUrl || '',
          step.backUrl || ''
        )
    );

    return new MCWorkflow(request.currentStep, steps);
  }
}
