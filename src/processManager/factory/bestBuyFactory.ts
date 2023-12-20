import { McEvent, McFlow, McPayload, McStep } from '../process/mcPayload';
import { McProcess } from '../process/mcProcess';
import { McProcessStep } from '../process/mcProcessStep';

export class BestBuyFactory {
  getProcess(payload: McPayload): McProcess {
    const mcProcessSteps = this.getBestBuyProcess();

    mcProcessSteps[0].nextSteps = () => mcProcessSteps[1];
    mcProcessSteps[0].conditions = [
      (payload: McPayload) => payload.event === McEvent.HANDSET_SELECTED,
    ];
    mcProcessSteps[0].perform = (payload: McPayload) => {
      console.log('submit data to cart.');
    };

    mcProcessSteps[1].nextSteps = () => mcProcessSteps[2];
    mcProcessSteps[1].conditions = [
      (payload: McPayload) => payload.event === McEvent.CART_CHECKED_OUT,
    ];
    mcProcessSteps[1].perform = (payload: McPayload) => {
      console.log('submit data to payment.');
    };

    mcProcessSteps[2].nextSteps = () => mcProcessSteps[3];
    mcProcessSteps[2].perform = (payload: McPayload) => {
      console.log('submit data to provisioning.');
    };

    return new McProcess(mcProcessSteps);
  }

  private getBestBuyProcess() {
    return [
      {
        flow: 'best-buy',
        step: 'handset',
        url: '/handset',
        nextStep: 'cart',
      },
      {
        flow: 'best-buy',
        step: 'cart',
        url: '/cart/checkout',
        nextStep: 'payment',
      },
      {
        flow: 'best-buy',
        step: 'payment',
        url: '/payment',
        nextStep: 'provisioning',
      },
      {
        flow: 'best-buy',
        step: 'provisioning',
        url: '/provisioning',
        nextStep: null,
      },
    ].map((processStep) => {
      return new McProcessStep(
        processStep.flow as McFlow,
        processStep.step as McStep,
        processStep.url
      );
    });
  }
}
