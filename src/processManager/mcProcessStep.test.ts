import { McEvent, McFlow, McPayload, McStep } from './process/mcPayload';
import { McProcessStep } from './process/mcProcessStep';

describe('mcProcess step', () => {
  let step: McProcessStep;
  let payload: McPayload;

  beforeEach(() => {
    step = new McProcessStep(McFlow.BEST_BUY, McStep.HANDSET, '/handset');
    payload = new McPayload(
      McFlow.BEST_BUY,
      McStep.HANDSET,
      McEvent.HANDSET_SELECTED,
      {
        data: 'data',
      }
    );
  });

  test('isConditionMet should pass true when never define conditions', () => {
    expect(() => step.isConditionMet(payload)).toBeTruthy();
  });

  test('isConditionMet should return false when some condition fail', () => {
    step.conditions = [(payload) => false];
    expect(step.isConditionMet(payload)).toEqual(false);
  });
});
