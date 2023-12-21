import { MCRequest } from './mcRequest';
import { MCProcessManager } from './mcProcessManager';
import { MCStep } from './mcStep';

describe('processManager', () => {
  test('should return PACKAGE_SELECTED when emit request from ORDER_SELECTED step', () => {
    const request = new MCRequest(
      'AIS_CONTACT_PACK',
      'DEVICE_SALE',
      'ORDER_SELECTED',
      {}
    );
    const processManager = new MCProcessManager(request);
    const nextStep: MCStep = processManager.emit();
    expect(nextStep.currentStep).toEqual('ORDER_SELECTED');
  });

  test('should return CARE_SELECTED when emit request from PACKAGE_SELECTED step', () => {
    // arrange
    const request = new MCRequest(
      'AIS_CONTACT_PACK',
      'DEVICE_SALE',
      'PACKAGE_SELECTED',
      {}
    );
    const processManager = new MCProcessManager(request);
    const nextStep: MCStep = processManager.emit();
    expect(nextStep.currentStep).toEqual('PACKAGE_SELECTED');
  });
});
