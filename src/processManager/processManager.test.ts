import { McEvent, McFlow, McStep } from './process/mcPayload';
import { ProcessManager } from './processManager';
import { McPayload } from './process/mcPayload';
import { McProcessStep } from './process/mcProcessStep';

describe('processManager', () => {
  let processManager: ProcessManager;

  beforeEach(() => {
    processManager = new ProcessManager();
  });

  test('perform select handset should return cart step', () => {
    const payload = new McPayload(
      McFlow.BEST_BUY,
      McStep.HANDSET,
      McEvent.HANDSET_SELECTED,
      {
        data: 'data',
      }
    );
    const expectedProcess: McProcessStep = processManager.emit(payload);

    expect(expectedProcess.flow).toEqual(McFlow.BEST_BUY);
    expect(expectedProcess.step).toEqual(McStep.CART);
    expect(expectedProcess.url).toEqual('/cart/checkout');
  });

  test('perform payment from cart should return payment step', () => {
    const payload = new McPayload(
      McFlow.BEST_BUY,
      McStep.CART,
      McEvent.CART_CHECKED_OUT,
      {
        data: 'data',
      }
    );
    const expectedProcess: McProcessStep = processManager.emit(payload);

    expect(expectedProcess.flow).toEqual(McFlow.BEST_BUY);
    expect(expectedProcess.step).toEqual(McStep.PAYMENT);
    expect(expectedProcess.url).toEqual('/payment');
  });

  test('perform payment from cart should return provisioning step', () => {
    const payload = new McPayload(
      McFlow.BEST_BUY,
      McStep.PAYMENT,
      McEvent.PAYMENT_PERFORMED,
      {
        data: 'data',
      }
    );
    const expectedProcess: McProcessStep = processManager.emit(payload);

    expect(expectedProcess.flow).toEqual(McFlow.BEST_BUY);
    expect(expectedProcess.step).toEqual(McStep.PROVISIONING);
    expect(expectedProcess.url).toEqual('/provisioning');
  });

  test('should fail when current step not match', () => {
    const payload = new McPayload(
      McFlow.BEST_BUY,
      McStep.TRAIT,
      McEvent.HANDSET_SELECTED,
      {
        data: 'data',
      }
    );

    expect(() => processManager.emit(payload)).toThrow(
      `Step not found: ${payload.step}`
    );
  });
});
