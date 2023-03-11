
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Raspberry Pi Setup', section => {
            section.textSetting('piIP').name('Raspberry Pi IP');
            section.textSetting('piPort').name('Raspberry Pi Port');

        });


        page.section('Device 1', section => {
            section.textSetting('deviceName1').name('Device Name');
            section.textSetting('deviceConfig1').name('GPIO# or Device Name');

        });


        page.section('Device 2', section => {
            section.textSetting('deviceName2').name('Device Name');
            section.textSetting('deviceConfig2').name('GPIO# or Device Name');

        });


        page.section('Device 3', section => {
            section.textSetting('deviceName3').name('Device Name');
            section.textSetting('deviceConfig3').name('GPIO# or Device Name');

        });


        page.section('Device 4', section => {
            section.textSetting('deviceName4').name('Device Name');
            section.textSetting('deviceConfig4').name('GPIO# or Device Name');

        });


        page.section('Device 5', section => {
            section.textSetting('deviceName5').name('Device Name');
            section.textSetting('deviceConfig5').name('GPIO# or Device Name');

        });


        page.section('Device 6', section => {
            section.textSetting('deviceName6').name('Device Name');
            section.textSetting('deviceConfig6').name('GPIO# or Device Name');

        });


        page.section('Device 7', section => {
            section.textSetting('deviceName7').name('Device Name');
            section.textSetting('deviceConfig7').name('GPIO# or Device Name');

        });


        page.section('Device 8', section => {
            section.textSetting('deviceName8').name('Device Name');
            section.textSetting('deviceConfig8').name('GPIO# or Device Name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        

	})
