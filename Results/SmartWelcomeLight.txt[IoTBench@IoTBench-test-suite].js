
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on/off lights when no one is home...', section => {
            section.deviceSetting('switchAlone').capability(['switch']).name('');

        });


        page.section('Turn on/off lights when someone is home...', section => {
            section.deviceSetting('switchNotAlone').capability(['switch']).name('');

        });


        page.section('Only turn on the lights after sunset...', section => {
            section.booleanSetting('OnlyAtNight').name('Yes ?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler ${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.people, 'presenceSensor', currentValue)
    
        console.log(current)
        let presenceValue = people.find({
        it.currentPresence == 'present'
        })
        console.log(presenceValue)
        if (presenceValue && "${event.value}" == 'present') {
        if (this.someoneHome()) {
        if (this.AfterSunset()) {
        
        context.api.devices.sendCommands(context.config.switchNotAlone, 'switch', on)
    
        }
        console.log('Someone else has arrived!')
        } else {
        if (this.AfterSunset()) {
        
        context.api.devices.sendCommands(context.config.switchAlone, 'switch', on)
    
        }
        console.log('Someone\'s home!')
        }
        } else {
        if (!presenceValue) {
        
        context.api.devices.sendCommands(context.config.switchAlone, 'switch', off)
    
        console.log('Everyone\'s away.')
        }
        }
        

	})
