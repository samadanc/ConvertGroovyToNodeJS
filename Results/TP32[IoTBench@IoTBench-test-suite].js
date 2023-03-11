
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Motion Detector', section => {
            section.deviceSetting('motion_detector').capability(['motionSensor']).name('Where?');

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Set brightness level for lights (100 is max representing 100%, default is 60)', section => {
            section.numberSetting('brightnessLevel').name('Brightess level (without %)?');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipcode').name('Zip Code');

        });


        page.section('In addition to push notifications, for emergency weather send text alerts to...', section => {

        });


        page.section('Optionally set lantern to turn green once, if this switch is turned on.', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');

        });


        page.section(''Icon'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion_detector, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'active') {
        console.log('Motion detected, turning on light and killing timer')
        this.checkForWeather()
        this.unschedule(turnOff)
        } else {
        let delay = 100
        console.log("Motion cleared, turning off switches in ($delay).")
        this.pause(delay)
        
        context.api.devices.sendCommands(context.config.hues, 'colorControl', off)
    
        }
        

	})
