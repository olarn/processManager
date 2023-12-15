export class McPayload {
  constructor(
    public flow: McFlow,
    public step: McStep,
    public event: McEvent,
    public data: any
  ) {}
}

export enum McFlow {
  BEST_BUY = 'best-buy',
}

export enum McStep {
  HANDSET = 'handset',
  TRAIT = 'trait',
  CART = 'cart',
  PAYMENT = 'payment',
  PROVISIONING = 'provisioning',
}

export enum McEvent {
  HANDSET_SELECTED = 'handset-selected',
  HANDSET_REMOVED = 'handset-removed',
  HANDSET_REPLACED = 'handset-replaced',
  CART_CHECKED_OUT = 'cart-checked-out',
  PAYMENT_PERFORMED = 'payment-performed',
}
