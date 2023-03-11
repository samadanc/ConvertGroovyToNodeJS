
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The lock', section => {
            section.deviceSetting('physicalLock').capability(['lock']).name('Select the lock that will be monitored');
            section.deviceSetting('simulatedSwitch').capability(['switch']).name('Select the simulated switch that will monitor and control the lock.');
            section.booleanSetting('switchCanLock').name('Should the switch be allowed to lock the lock?');
            section.booleanSetting('switchCanUnlock').name('Should the switch be allowed to unlock the lock? You may want to disable this if you want voice systems to be able to tell you the status of the lock but not able to unlock the lock');

        });


        page.section('Notifications', section => {
            section.booleanSetting('notifyPush').name('Send notifications to all logged in devices for all users of location: ${location.name}?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.simulatedSwitch, 'switch', 'switch', 'simulatedSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.physicalLock, 'lock', 'lock', 'physicalLockHandler')

    })
