import { McPayload, McStep } from '../process/mcPayload';
import { McProcess } from '../process/mcProcess';
import { McFlow } from '../process/mcPayload';
import { BestBuyFactory } from './bestBuyFactory';

export class McProcessFactory {
  getProcess(payload: McPayload): McProcess {
    switch (payload.flow) {
      case McFlow.BEST_BUY:
        return new BestBuyFactory().getProcess(payload);
    }
  }
}
