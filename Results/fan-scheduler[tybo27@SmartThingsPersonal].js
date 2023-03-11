
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick a Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');
            section.numberSetting('runTime').name('Fan Run Time (min)');
            section.numberSetting('runPeriod').name('Fan Run Period: 1, 5, 10, 15, 30, 60, or 180 minutes');
            section.deviceSetting('ceilingFan').capability(['switch']).name('Ceiling Fan');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('turnBlowerOn', delay);

        context.api.schedules.runEvery15Minutes('turnBlowerOn', delay);

        context.api.schedules.runEvery3Hours('turnBlowerOn', delay);

        context.api.schedules.runEvery5Minutes('turnBlowerOn', delay);

        context.api.schedules.runEvery1Hour('turnBlowerOn', delay);

        context.api.schedules.runEvery30Minutes('turnBlowerOn', delay);

    })

    .scheduledEventHandler('turnBlowerOn', (context, event) => {
        
        console.log('Turning Blower on')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanOn)
    
        if (ceilingFan) {
        if (state.fanFlop == 0) {
        console.log('Turning Ceiling Fan on')
        
        context.api.devices.sendCommands(context.config.ceilingFan, 'switch', on)
    
        state.fanFlop = 1
        } else {
        if (state.fanFlop == 1) {
        console.log('Turning Ceiling Fan off')
        
        context.api.devices.sendCommands(context.config.ceilingFan, 'switch', off)
    
        state.fanFlop = 0
        }
        }
        }
        this.runIn(60 * runTime , turnBlowerOff)
        

	})
