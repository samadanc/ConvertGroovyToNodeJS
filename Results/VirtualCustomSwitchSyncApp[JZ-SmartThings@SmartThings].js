
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose your Generic HTTP Device:', section => {
            section.deviceSetting('httpswitch').capability(['switch']).name('HTTP Device?');

        });


        page.section('Choose your Simulated, currently unlinked Switch:', section => {
            section.deviceSetting('virtualswitch').capability(['switch']).name('Virtual Switch?');

        });


        page.section('Choose your Simulated, currently unlinked Contact Sensor:', section => {
            section.deviceSetting('virtualsensor').capability(['sensor']).name('Virtual Contact Sensor?');

        });


        page.section('Refresh/Poll Interval in Minutes. 0 or null turns refreshing off (try not to refresh too often):', section => {
            section.numberSetting('refreshfreq').name('Refresh/Poll Frequency in minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualswitch, 'switch', 'refresh', 'callRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualsensor, 'sensor', 'refresh', 'callRefresh')

        context.api.schedules.schedule('httpRefresh', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.httpswitch, 'switch', 'customTriggered', 'updateCustomTriggered')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualswitch, 'switch', 'switch', 'virtualSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.httpswitch, 'switch', 'refreshTriggered', 'updateRefreshTiles')

        await context.api.subscriptions.subscribeToDevices(context.config.httpswitch, 'switch', 'customswitch', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.httpswitch, 'switch', 'contact2', 'virtualSensorHandler')

    })

    .subscribedEventHandler('updateRefreshTiles', (context, event) => {
        
        console.log('Updating REFRESH tiles')
        this.runIn(1, updateRefreshEvents)
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log("switchOffHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        for (java.lang.Integer i = 1; i <= 3; i++) {
        this.schedule(this.now() + i * 1000, updateVirtualSwitch)
        }
        this.sendEvent(settings['virtualswitch'], ['name': 'customTriggered', 'value': httpswitch*.currentValue('customTriggered')[0]])
        this.sendEvent(settings['virtualswitch'], ['name': 'switch', 'value': httpswitch*.currentValue('customswitch')[0]])
        this.sendEvent(settings['httpswitch'], ['name': 'customswitch', 'value': virtualswitch*.currentValue('switch')])
        for (java.lang.Integer i = 1; i <= 3; i++) {
        this.schedule(this.now() + i * 1000, updateVirtualSwitch)
        }
        

	})

    .subscribedEventHandler('updateCustomTriggered', (context, event) => {
        
        this.sendEvent(settings['virtualswitch'], ['name': 'customTriggered', 'value': httpswitch*.currentValue('customTriggered')[0]])
        

	})

    .subscribedEventHandler('virtualSwitchHandler', (context, event) => {
        
        console.log("virtualSwitchHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        log.trace('EPOCH value from main switch: ' + httpswitch*.currentValue('customTriggeredEPOCH')[0])
        log.trace('EPOCH diff was: ' + String.valueOf(this.now() - httpswitch*.currentValue('customTriggeredEPOCH')[0]))
        log.trace('Current EPOCH time: ' + this.now())
        if (this.now() - httpswitch*.currentValue('customTriggeredEPOCH')[0] > 0) {
        
        context.api.devices.sendCommands(context.config.httpswitch, 'switch', CustomTrigger)
    
        log.trace('EPOCH before update: ' + httpswitch*.currentValue('customTriggeredEPOCH')[0])
        
        context.api.devices.sendCommands(context.config.httpswitch, 'switch', updateEPOCH)
    
        log.trace('Updated EPOCH from Virtual Sync App to: ' + httpswitch*.currentValue('customTriggeredEPOCH')[0])
        for (java.lang.Integer i = 1; i <= 3; i++) {
        this.schedule(this.now() + i * 1000, updateVirtualSwitch)
        }
        this.sendEvent(settings['virtualswitch'], ['name': 'customTriggered', 'value': httpswitch*.currentValue('customTriggered')[0]])
        } else {
        for (java.lang.Integer i = 1; i <= 3; i++) {
        this.schedule(this.now() + i * 1000, updateVirtualSwitch)
        }
        this.sendEvent(settings['virtualswitch'], ['name': 'customTriggered', 'value': httpswitch*.currentValue('customTriggered')[0]])
        }
        

	})

    .subscribedEventHandler('virtualSensorHandler', (context, event) => {
        
        console.log("virtualSensorHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        this.sendEvent(settings['virtualsensor'], ['name': 'contact', 'value': "${event.value}"])
        this.sendEvent(settings['virtualsensor'], ['name': 'sensor2Triggered', 'value': httpswitch*.currentValue('sensor2Triggered')[0]])
        

	})

    .subscribedEventHandler('callRefresh', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.httpswitch, 'switch', refresh)
    
        

	})

    .scheduledEventHandler('httpRefresh', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.httpswitch, 'switch', refresh)
    
        console.log('Auto refresh of ' + settings['httpswitch'] + ' triggered. Currently set to refresh every ' + refreshfreq + ' minutes.')
        this.schedule(this.now() + refreshfreq * 1000 * 60, httpRefresh)
        

	})
