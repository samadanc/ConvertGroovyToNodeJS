
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Time', section => {
            section.booleanSetting('onoff').name('Off / On');
            section.timeSetting('waketime').name('What time do you want to get up?');

        });


        page.section(''Setup'', section => {

        });


        page.section(''Help'', section => {

        });


        page.section('Lights', section => {
            section.deviceSetting('light1').capability(['switchLevel']).name('Light 1');
            section.deviceSetting('light2').capability(['switchLevel']).name('Light 2');
            section.deviceSetting('light3').capability(['switchLevel']).name('Light 3');
            section.deviceSetting('light4').capability(['switchLevel']).name('Light 4');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('step1', delay);

    })

    .scheduledEventHandler('step1', (context, event) => {
        
        state.running = true
        
        context.api.devices.sendCommands(context.config.light1, 'switchLevel', setLevel)
    
        this.runIn(180, step2)
        

	})
