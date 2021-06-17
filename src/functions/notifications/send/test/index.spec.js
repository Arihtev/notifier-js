const { handler } = require('../index');
const notifier = require('../utils/index');

jest.mock('../utils/index');

const appointmentData = {
  serviceId: 1,
  date: '2021-06-16',
  startTime: '10:00',
  endTime: '11:00'
};

const event = {
  Records: [{
    Sns: {
      Message: JSON.stringify([appointmentData]),
    },
  }]
};

describe('Send notifications handler', () => {
  it('should be defined', () => {
    expect(handler).toBeTruthy();
  });

  it('create appointment', async () => {
    const notifierSpy = jest.spyOn(notifier, 'notifier');
    notifier.notifier.mockImplementation(() => () => {});

    await handler(event);
    
    expect(notifierSpy).toHaveBeenCalledTimes(1);
    expect(notifierSpy).toHaveBeenCalledWith(appointmentData);
  });
});
