
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Initializes and regularly polls  this Neurio device', section => {
            section.deviceSetting('neurio').capability(['powerMeter']).name('Which Neurio');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('takeAction', delay);

    })

    .scheduledEventHandler('takeAction', (context, event) => {
        
        log.trace('takeAction>begin')
        
        context.api.devices.sendCommands(context.config.neurio, 'powerMeter', poll)
    
        log.trace('takeAction>end')
        

	})
