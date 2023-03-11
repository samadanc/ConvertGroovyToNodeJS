
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('luces').capability(['switch']).name('Introduce las luces que quieres apagar');
            section.timeSetting('hora').name('Introduce hora del dia a la que se apagaran las luces');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('tareaDiaria', delay);

    })

    .scheduledEventHandler('tareaDiaria', (context, event) => {
        
        console.log('Tarea diara en ejecucion...')
        
        context.api.devices.sendCommands(context.config.luces, 'switch', off)
    
        

	})
