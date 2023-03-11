
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is double-tapped...', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Set these hue bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('');
            section.numberSetting('hue').name('Hue?');
            section.numberSetting('saturation').name('Saturation?');
            section.numberSetting('level').name('Level?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info("switchHandler(${event.name}: ${event.value}, type: '${event.event.type}', isPhysical: ${event.isPhysical()} (${event.event.isPhysical()}), isDigital: ${event.isDigital()})")
        log.info(event.event.encodeAsJSON())
        
        context.api.devices.sendCommands(context.config.master, 'switch', statesSince)
    
        console.log("${recentStates?.size()} STATES FOUND, LAST AT ${(recentStates) ? recentStates[0].dateCreated : }")
        if (event.isPhysical()) {
        if (event.value == 'on' && recentStates?.size() > 1) {
        console.log('detected two taps, set colors.')
        this.setColors()
        }
        } else {
        log.trace('Skipping digital on/off event')
        }
        

	})
