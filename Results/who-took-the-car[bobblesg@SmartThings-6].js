
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('', section => {
            section.booleanSetting('enableApp').name('Enable App');

        });


        page.section('Select Shared Car Presence Sensor ', section => {
            section.deviceSetting('sharedCar').capability(['presenceSensor']).name('Car Presence Sensor');

        });


        page.section('Select Driver 1 ', section => {
            section.deviceSetting('carDriver1').capability(['presenceSensor']).name('Driver 1\');

        });


        page.section('Select Driver 2', section => {
            section.deviceSetting('carDriver2').capability(['presenceSensor']).name('Driver 2\');

        });


        page.section('Select Driver 1\'s Car Presence Sensor', section => {
            section.deviceSetting('driver1Car').capability(['presenceSensor']).name('Car Presence Sensor');

        });


        page.section('Select Driver 2\'s Car Presence Sensor ', section => {
            section.deviceSetting('driver2Car').capability(['presenceSensor']).name('Car Presence Sensor');

        });


        page.section('Select Virtual Car Status Indicator Switch', section => {
            section.deviceSetting('switch1').capability(['doorControl']).name('Virtual Presence Sensor');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.carDriver2, 'presenceSensor', 'presence', 'driver2Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.sharedCar, 'presenceSensor', 'presence', 'sharedCarHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.driver2Car, 'presenceSensor', 'presence', 'driver2OwnCarHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.driver1Car, 'presenceSensor', 'presence', 'driver1OwnCarHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.carDriver1, 'presenceSensor', 'presence', 'driver1Handler')

    })

    .subscribedEventHandler('driver1Handler', (context, event) => {
        
        state.currS2 = event.value
        console.log("$carDriver1 = ${state.currS2}")
        if (state.currS2 == 'not present') {
        this.process()
        }
        

	})

    .subscribedEventHandler('driver2Handler', (context, event) => {
        
        state.currS3 = event.value
        console.log("$carDriver2 = ${state.currS3}")
        if (state.currS3 == 'not present') {
        this.process()
        }
        

	})

    .subscribedEventHandler('driver2OwnCarHandler', (context, event) => {
        
        state.d2car = event.value
        console.log("$driver2Car = ${state.d2car}")
        

	})

    .subscribedEventHandler('driver1OwnCarHandler', (context, event) => {
        
        state.d1car = event.value
        console.log("$driver1Car = ${state.d1car}")
        

	})

    .subscribedEventHandler('sharedCarHandler', (context, event) => {
        
        if (state.appGo == true) {
        state.currS1 = event.value
        if (state.currS1 == 'not present') {
        console.log("$sharedCar = ${state.currS1}")
        let delay = 10
        log.info('Car left so checking who took it')
        log.info("Waiting for $delay seconds before checking")
        this.runIn(delay, process)
        } else {
        if (state.currS1 == 'present') {
        log.info("$sharedCar arrived")
        
        context.api.devices.sendCommands(context.config.switch1, 'doorControl', on_drive)
    
        }
        }
        }
        

	})
