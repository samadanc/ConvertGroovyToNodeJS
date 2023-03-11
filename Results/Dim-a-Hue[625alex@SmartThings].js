
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these light...', section => {
            section.deviceSetting('slaves').capability(['colorControl']).name('Lights');

        });


        page.section('Controllers...', section => {
            section.deviceSetting('masterHue').capability(['switchLevel']).name('Hue controller');
            section.deviceSetting('masterSaturation').capability(['switchLevel']).name('Saturation controller');
            section.deviceSetting('masterLevel').capability(['switchLevel']).name('Brightness controller');
            section.deviceSetting('masterSwitch').capability(['switch']).name('On/Off controller');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masterLevel, 'switchLevel', 'level', 'levelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masterSaturation, 'switchLevel', 'level', 'saturationHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masterHue, 'switchLevel', 'level', 'hueHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masterSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("setting switch of $slaves to ${e.value}")
        slaves?."${e.value}"()
        

	})

    .subscribedEventHandler('levelHandler', (context, event) => {
        
        console.log("setting level of $slaves to ${e.value}%")
        slaves?.setLevel((e.value as Integer))
        

	})

    .subscribedEventHandler('hueHandler', (context, event) => {
        
        console.log("setting hue of $slaves to ${e.value}%")
        slaves?.setHue((e.value as Integer))
        

	})

    .subscribedEventHandler('saturationHandler', (context, event) => {
        
        console.log("setting saturation of $slaves to ${e.value}%")
        slaves?.setSaturation((e.value as Integer))
        

	})
