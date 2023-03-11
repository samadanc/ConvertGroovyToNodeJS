
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Job Definition', section => {
            section.deviceSetting('switches').capability(['switch']).name('Operate on these switches:');
            section.enumSetting('operation').name('Turn them on or off?');
            section.timeSetting('schedule').name('When should the job run?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runOnce('handler', delay);

    })

    .scheduledEventHandler('handler', (context, event) => {
        
        console.log("Turning $operation switches")
        switch ( operation ) {
        case 'On':
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        break
        case 'Off':
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        break
        }
        

	})
