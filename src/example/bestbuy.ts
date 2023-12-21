export class BestBuy {
  state: string = '';

  submitOrder(): void {
    this.state = 'orderSelected';
  }

  selectPackage(): void {
    if (this.state !== 'orderSelected') {
      throw new Error('Please select order first');
    }
    this.state = 'packageSelected';
  }

  selectCare(): void {
    if (this.state !== 'packageSelected') {
      throw new Error('Please select order first');
    }
    this.state = 'careSelected';
  }

  confirmPayment(): void {
    if (this.state !== 'careSelected') {
      throw new Error('Please select order first');
    }
    this.state = 'readyToPay';
  }

  genQ(): void {
    if (this.state !== 'readyToPay') {
      throw new Error('Please select order first');
    }
    this.state = 'provisioned';
  }
}
