
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger Switch Settings', section => {
            section.deviceSetting('triggerSwitch').capability(['contactSensor']).name('The trigger sensor will cause all of the actions to start. Select a trigger switch:');
            section.numberSetting('triggerTime').name('How many seconds can the trigger be open before action is taken?');
            section.numberSetting('triggerNumber').name('How many triggers should be allowed before triggering?');
            section.numberSetting('triggerSeconds').name('How many seconds back should triggers be counted? This will be ignored if the number of allowed triggers is zero.');

        });


        page.section('Device to be swithed when triggered.', section => {
            section.deviceSetting('switchedDevice').capability(['switch']).name('Select the device to be controled:');
            section.enumSetting('switchedState').name('What state should the device be switched to?');
            section.numberSetting('switchedMinTime').name('Minimum seconds that the device should stay in the switched state? Set to zero to have device stay in the state.');
            section.numberSetting('switchedMaxTime').name('Maximum seconds that the device should stay in the switched state? Set to zero to have device stay in the state.');

        });


        page.section('Notifications', section => {
            section.booleanSetting('notifyPush').name('Send notifications to all logged in devices for all users of location: ${location.name}?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchedDevice, 'switch', 'switch', 'switchChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'contactSensor', 'contact.closed', 'untriggered')

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'contactSensor', 'contact.open', 'triggered')

    })
