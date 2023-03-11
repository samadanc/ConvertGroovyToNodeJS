
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on/off these light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Auto off options...', section => {
            section.numberSetting('minutes1').name('Wait this many minutes (1 - 60)?');

        });


        page.section('More options...', section => {
            section.deviceSetting('switches2').capability(['switch']).name('Ignore motion if these are on');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        state.isdark = false
        console.log('Sunrise happened')
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let ignoremotion = false
        let overrideswitches = switches2.currentSwitch
        if (overrideswitches) {
        let onsw = overrideswitches.findAll({ let switchVal ->
        switchVal == 'on' ? true : false
        })
        if (onsw.size() == 1) {
        console.log('A switch is on that you specified to override so motion ignored')
        ignoremotion = true
        } else {
        if (onsw.size() > 0) {
        console.log("${onsw.size()} switches are on that you specified to override so motion ignored")
        ignoremotion = true
        }
        }
        }
        if (usesunset && isdark == false) {
        ignoremotion = true
        console.log('sunrise has occured and sunset has not happened yet so motion ignored')
        }
        if (!ignoremotion) {
        if (event.value == 'active') {
        console.log('turning on lights due to motion')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        if (nomotion && minutes1 == 0) {
        console.log('turning off lights due to no motion immediately')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        } else {
        if (nomotion && minutes1 ) {
        console.log("turning off lights due to no motion in $minutes1 minutes")
        this.runIn(minutes1 * 60, scheduleCheck, ['overwrite': false])
        } else {
        console.log('motion stopped but lights not turned off because feature not activated')
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        state.isdark = true
        console.log('Sunset happened')
        

	})
