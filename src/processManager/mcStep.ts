export class MCStep {
  constructor(
    readonly currentStep: string,
    readonly nextStep: string,
    readonly nextUrl: string,
    readonly backUrl: string
  ) {}
}
