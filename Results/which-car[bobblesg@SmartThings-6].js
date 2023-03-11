
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('', section => {
            section.deviceSetting('car1').capability(['presenceSensor']).name('Car 1 Presence Sensor');
            section.deviceSetting('car2').capability(['presenceSensor']).name('Car 2 Presence Sensor');
            section.deviceSetting('car3').capability(['presenceSensor']).name('Car 3 Presence Sensor');
            section.numberSetting('carDelay').name('Delay after driver left to check for car presence');

        });


        page.section('Select Driver 1 ', section => {
            section.deviceSetting('carDriver1').capability(['presenceSensor']).name('Driver 1\');

        });


        page.section('Select Driver 2', section => {
            section.deviceSetting('carDriver2').capability(['presenceSensor']).name('Driver 2\');

        });


        page.section('Select Driver Status Indicator Switch', section => {
            section.deviceSetting('switch1').capability(['doorControl']).name('Driver 1 Virtual Presence Status');
            section.deviceSetting('switch2').capability(['doorControl']).name('Driver 2 Virtual Presence Status');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugMode').name('Enable logging');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.carDriver2, 'presenceSensor', 'presence', 'driver2Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.car3, 'presenceSensor', 'presence', 'car3Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.car1, 'presenceSensor', 'presence', 'car1Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.car2, 'presenceSensor', 'presence', 'car2Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.carDriver1, 'presenceSensor', 'presence', 'driver1Handler')

    })

    .subscribedEventHandler('car1Handler', (context, event) => {
        
        state.d1car = event.value
        this.LOGDEBUG("$car1 = ${state.d1car}")
        if (state.d1car == 'present') {
        state.d1carStatus = 'not taken'
        this.LOGDEBUG("Car 1 = ${state.d1carStatus}")
        }
        

	})

    .subscribedEventHandler('car3Handler', (context, event) => {
        
        state.d3car = event.value
        this.LOGDEBUG("$car3 = ${state.d3car}")
        if (state.d3car == 'present') {
        state.d3carStatus = 'not taken'
        this.LOGDEBUG("Car 3 = ${state.d3carStatus}")
        }
        

	})

    .subscribedEventHandler('driver1Handler', (context, event) => {
        
        state.driver1 = event.value
        this.LOGDEBUG("$carDriver1 = ${state.driver1}")
        if (state.driver1 == 'present') {
        this.LOGDEBUG('Driver 1 arrived so setting at home')
        
        context.api.devices.sendCommands(context.config.switch1, 'doorControl', at_home)
    
        }
        if (state.driver2 == 'not present') {
        let driver1Delay = ((60 * carDelay ) as int)
        this.LOGDEBUG("Driver 1 left so waiting $driver1Delay seconds then processing")
        this.runIn(driver1Delay, processDriver1)
        }
        

	})

    .subscribedEventHandler('driver2Handler', (context, event) => {
        
        state.driver2 = event.value
        this.LOGDEBUG("$carDriver2 = ${state.driver2}")
        if (state.driver2 == 'present') {
        this.LOGDEBUG('Driver 2 arrived so setting at home')
        
        context.api.devices.sendCommands(context.config.switch2, 'doorControl', at_home)
    
        }
        if (state.driver2 == 'not present') {
        let driver2Delay = ((60 * carDelay ) as int)
        this.LOGDEBUG("Driver 2 left so waiting $driver2Delay seconds then processing")
        this.runIn(driver2Delay, processDriver2)
        }
        

	})

    .subscribedEventHandler('car2Handler', (context, event) => {
        
        state.d2car = event.value
        this.LOGDEBUG("$car2 = ${state.d2car}")
        if (state.d2car == 'present') {
        state.d2carStatus = 'not taken'
        this.LOGDEBUG("Car 2 = ${state.d2carStatus}")
        }
        

	})
