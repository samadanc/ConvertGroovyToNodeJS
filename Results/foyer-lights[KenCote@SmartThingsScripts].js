
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which lights?', section => {
            section.deviceSetting('lights').capability(['switchLevel']).name('');

        });


        page.section('Downstairs motion sensor to use?', section => {
            section.deviceSetting('downstairsMotion').capability(['motionSensor']).name('');

        });


        page.section('Upstairs motion sensor to use?', section => {
            section.deviceSetting('upstairsMotion').capability(['motionSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.downstairsMotion, 'motionSensor', 'motion', 'LightHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.upstairsMotion, 'motionSensor', 'motion', 'LightHandler')

    })

    .subscribedEventHandler('LightHandler', (context, event) => {
        
        let now = new Date().format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        let sunTime = this.getSunriseAndSunset()
        let sunset = sunTime.sunset.format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        let sunrise = sunTime.sunrise.format('yyyy-MM-dd HH:mm:ss', location.timeZone)
        console.log("Current time is $now, sunrise is $sunrise, sunset is $sunset")
        let isUpstairsMotion = "${event.device}".contains('Upstairs')
        let isDownstairsMotion = "${event.device}".contains('Foyer')
        
        context.api.devices.sendCommands(context.config.downstairsMotion, 'motionSensor', currentState)
    
        
        context.api.devices.sendCommands(context.config.upstairsMotion, 'motionSensor', currentState)
    
        console.log("downstairsMotion value: ${dmState.value}")
        console.log("upstairsMotion value: ${umState.value}")
        console.log("IsUpstairs:  $isUpstairsMotion")
        console.log("IsDownstairs:  $isDownstairsMotion")
        console.log({
        event.value
        })
        if (isDownstairsMotion && dmState.value.contains('active') || isUpstairsMotion && umState.value == 'active' && now > sunset || now < sunrise ) {
        console.log('Foyer lights on')
        
        context.api.devices.sendCommands(context.config.lights, 'switchLevel', setLevel)
    
        } else {
        if (dmState[0].value == 'inactive' && dmState[1].value == 'inactive' && umState.value == 'inactive') {
        console.log('Foyer lights off')
        
        context.api.devices.sendCommands(context.config.lights, 'switchLevel', setLevel)
    
        }
        }
        

	})
