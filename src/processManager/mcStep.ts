import { MCRequest } from './mcRequest';

export class MCStep {
  constructor(
    readonly currentStep: string,
    readonly nextStep: string,
    readonly nextUrl: string,
    readonly backUrl: string
  ) {}

  perform(request: MCRequest) {
    //TODO:
    // - create order ที่ cart
    // - reserve ของที่ DT
    // - กลับมา update SOID
  }
}
