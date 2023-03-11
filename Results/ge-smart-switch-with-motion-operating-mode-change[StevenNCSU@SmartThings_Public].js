
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('GE Smart Motion Switch', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('GE Smart Switch with Motion');

        });


        page.section('At this time every day', section => {
            section.timeSetting('time').name('Time of Day');

        });


        page.section('Change to this operating mode', section => {
            section.enumSetting('operationMode').name('Operating Mode');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('changeOperatingMode', delay);

    })

    .scheduledEventHandler('changeOperatingMode', (context, event) => {
        
        console.log("Entered changeOperatingMode method with $operationMode")
        if ('1' == operationMode ) {
        console.log('Setting Operating Mode to Manual')
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', off)
    
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', manual)
    
        }
        if ('2' == operationMode ) {
        console.log('Setting Operating Mode to Vacancy')
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', off)
    
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', vacancy)
    
        }
        if ('3' == operationMode ) {
        console.log('Setting Operating Mode to Occupancy')
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', occupancy)
    
        }
        

	})
