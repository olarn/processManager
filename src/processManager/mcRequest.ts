export class MCRequest {
  constructor(
    readonly flowCode: string,
    readonly domain: string,
    readonly currentStep: string,
    readonly data: any
  ) {}
}
