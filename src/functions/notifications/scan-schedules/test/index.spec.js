const { handler } = require('../index');
const AppointmentsProvider = require('../../../../providers/appointments');
const ScanUtils = require('../utils');

jest.mock('../utils');
jest.mock('../../../../providers/appointments');

describe('Scan schedules handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeTruthy();
  });

  it('scan schedules', async () => {
    const providerSpy = jest.spyOn(AppointmentsProvider, 'list');
    const utilsSpy = jest.spyOn(ScanUtils, 'publish');
    AppointmentsProvider.list.mockImplementation(() => () => [1]);
    ScanUtils.publish.mockImplementation(() => () => [1]);

    await handler({});
    
    expect(providerSpy).toHaveBeenCalledTimes(1);
    expect(utilsSpy).toHaveBeenCalledTimes(1);
  });

  it('log on error', async () => {
    const providerSpy = jest.spyOn(AppointmentsProvider, 'list');
    const consoleSpy = jest.spyOn(global.console, 'log');
    
    global.console.log.mockImplementation(() => {});
    AppointmentsProvider.list.mockImplementation(() => () => {
      throw new Error(); 
    });

    await handler({});
    
    expect(providerSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
