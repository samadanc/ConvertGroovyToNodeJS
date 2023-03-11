
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('virtualvent').capability(['switchLevel']).name('Virtual vent controled by keenect:');
            section.deviceSetting('vent').capability(['switchLevel']).name('Target vent to be inverted');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualvent, 'switchLevel', 'level', 'levelHandler')

    })

    .subscribedEventHandler('levelHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.virtualvent, 'switchLevel', currentValue)
    
        log.info("virtual vent level $crntVo")
        let invVo = 100 - crntVo
        log.info("inverted vent level $invVo")
        
        context.api.devices.sendCommands(context.config.vent, 'switchLevel', setLevel)
    
        

	})
