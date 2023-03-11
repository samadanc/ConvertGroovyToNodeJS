
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this metered outlet..', section => {
            section.deviceSetting('zOutlet').capability(['powerMeter']).name('What outlet to monitor?');

        });


        page.section('Power Draw Settings', section => {
            section.numberSetting('offWatts').name('What is the power draw in watts when powered off? - Some devices still draw some power');
            section.numberSetting('resetWatts').name('How many watts does it draw when initally powered on?');
            section.numberSetting('idleWatts').name('How many watts does it draw when in idle? (Or just keeping food warm)');

        });


        page.section('Auto Off Settings', section => {
            section.numberSetting('offAfterHours').name('Auto off after how many hours?');

        });


        page.section('Alerts', section => {
            section.numberSetting('alertOffset').name('How many hours do you want to wait before getting the first alert?');
            section.numberSetting('alertHours').name('How many hours do you want to wait between alerts?');
            section.booleanSetting('pushNotification').name('Send a push notification');
            section.textSetting('msg').name('What do you want to say in the message?');

        });


    })

    .updated(async (context, updateData) => {

    })
