
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('luz').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('man', delay);

    })

    .scheduledEventHandler('man', (context, event) => {
        
        console.log("acta: 123 $settings")
        let encendidas = 0
        for (java.lang.Integer i = 0; i < 3; i++) {
        if (luz[ i ].currentValue('switch') == 'on') {
        encendidas = encendidas + 1
        }
        }
        if (encendidas > 1) {
        console.log("Updated with settings: 11465654654654 $settings")
        
        context.api.devices.sendCommands(context.config.luz, 'switch', sort)
    
        for (java.lang.Integer i = 1; i < orden.size; i++) {
        luz[ i ].off()
        }
        }
        

	})
