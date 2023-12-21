import { MCRequest } from './mcRequest';
import { MCStep } from './mcStep';

export class MCProcessManager {
  private currentStep: MCStep;
  private request: MCRequest;

  constructor(request: MCRequest) {
    this.currentStep = this.getCurrentStep(request);
    this.request = request;
  }

  emit(): MCStep {
    this.currentStep.perform(this.request);
    return this.currentStep;
  }

  private getCurrentStep(request: MCRequest): MCStep {
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

    const currentStep = steps.find(
      (step) => step.currentStep === request.currentStep
    );
    if (!currentStep) {
      throw new Error('Cannot find current step');
    }
    return currentStep;
  }
}
