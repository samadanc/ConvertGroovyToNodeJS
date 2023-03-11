
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights:', section => {
            section.deviceSetting('lights').capability(['switchLevel']).name('');

        });


        page.section('Presence Sensor:', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('');

        });


        page.section('For how long should we brighten the lights?', section => {
            section.numberSetting('brighten').name('Minutes');

        });


        page.section('What level should the lights be set at normally?', section => {
            section.numberSetting('lvlDefault').name('1-100');

        });


        page.section('What level should the lights brighten to upon arrival?', section => {
            section.numberSetting('lvlArrival').name('1-100');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'arrivalHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetHandler')

    })

    .subscribedEventHandler('arrivalHandler', (context, event) => {
        
        if (event.value == 'present') {
        
        context.api.devices.sendCommands(context.config.brighten, 'number', log)
    
        for (let light : lights ) {
        if (light.currentValue('switch').toString() == 'on') {
        light.setLevel(lvlArrival)
        
        context.api.devices.sendCommands(context.config.brighten, 'number', runIn)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        lights*.off()
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        lights*.setLevel(lvlDefault)
        

	})
