
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('Luces').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.Luces, 'switch', 'switch', 'LuzHandler')

        context.api.schedules.runEvery10Minutes('TimerHandler', delay);

    })

    .subscribedEventHandler('LuzHandler', (context, event) => {
        
        if (event.value == 'on') {
        state.lastSwitch = event.displayName
        }
        console.log("ultimo switch: ${state.lastSwitch}")
        

	})

    .scheduledEventHandler('TimerHandler', (context, event) => {
        
        let Encendidos = Luces.findAll({
        it?.switchState?.value == 'on'
        })
        console.log(" Encendidos: ${Encendidos.displayName}")
        let Apagar = Encendidos.findAll({
        it?.displayName != state.lastSwitch
        })
        console.log("Apagar: ${Apagar.displayName}")
        Apagar*.off()
        

	})
