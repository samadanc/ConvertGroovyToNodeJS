
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Squeeze Box Server replies', section => {
            section.deviceSetting('slurp').capability(['sensor']).name('Which JSON Slurper reports connection status?');

        });


        page.section('Connect these virtual switches to the squeeze players', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Player 1');
            section.deviceSetting('switch2').capability(['switch']).name('Player 2');
            section.deviceSetting('switch3').capability(['switch']).name('Player 3');
            section.deviceSetting('switch4').capability(['switch']).name('Player 4');
            section.deviceSetting('switch5').capability(['switch']).name('Player 5');

        });


        page.section('Which squeeze server?', section => {
            section.deviceSetting('squeeze').capability(['switch']).name('Server');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('litsentoserver', delay);

    })

    .scheduledEventHandler('litsentoserver', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.squeeze, 'switch', serverlistenoff)
    
        
        context.api.devices.sendCommands(context.config.squeeze, 'switch', serverlistenon)
    
        

	})
