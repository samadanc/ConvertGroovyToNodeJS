
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Test', section => {
            section.deviceSetting('testSwitch').capability(['switch']).name('Switch Device?');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('refreshDevice', delay);

        context.api.schedules.schedule('initialize', delay);

    })

    .scheduledEventHandler('refreshDevice', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.testSwitch, 'switch', refresh)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        this.refreshDevice()
        this.runIn(900, refreshDevice)
        this.runIn(1800, refreshDevice)
        this.runIn(2700, refreshDevice)
        

	})
