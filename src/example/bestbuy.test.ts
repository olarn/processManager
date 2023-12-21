import { BestBuy } from './bestbuy';

describe('Best Buy', () => {
  let bestBuy: BestBuy;
  beforeEach(() => {
    bestBuy = new BestBuy();
  });

  test('should have BestBuy class', () => {
    expect(bestBuy).toBeInstanceOf(BestBuy);
  });

  test('state should changed to orderSelected when call submitOrder()', () => {
    bestBuy.submitOrder();
    expect(bestBuy.state).toBe('orderSelected');
  });

  test('state should changed to packageSelected when call selectPackage()', () => {
    bestBuy.submitOrder();
    bestBuy.selectPackage();
    expect(bestBuy.state).toBe('packageSelected');
  });

  test('should throw error if call selectPackage when state is not orderSelected', () => {
    expect(() => bestBuy.selectPackage()).toThrowError(
      'Please select order first'
    );
  });

  test('state should changed to care selected when call selectCare()', () => {
    bestBuy.submitOrder();
    bestBuy.selectPackage();
    bestBuy.selectCare();
    expect(bestBuy.state).toBe('careSelected');
  });

  test('should throw error if call selectCare when state is not packageSelected', () => {
    expect(() => bestBuy.selectCare()).toThrowError(
      'Please select order first'
    );
  });

  test('state should changed to readyToPay when call confirmPayment()', () => {
    bestBuy.submitOrder();
    bestBuy.selectPackage();
    bestBuy.selectCare();
    bestBuy.confirmPayment();
    expect(bestBuy.state).toBe('readyToPay');
  });

  test('should throw error if call confirmPayment when state is not careSelected', () => {
    expect(() => bestBuy.confirmPayment()).toThrowError(
      'Please select order first'
    );
  });

  test('state should changed to provisioned when call genQ()', () => {
    bestBuy.submitOrder();
    bestBuy.selectPackage();
    bestBuy.selectCare();
    bestBuy.confirmPayment();
    bestBuy.genQ();
    expect(bestBuy.state).toBe('provisioned');
  });

  test('should throw error if call genQ when state is not readyToPay', () => {
    expect(() => bestBuy.genQ()).toThrowError('Please select order first');
  });
});
