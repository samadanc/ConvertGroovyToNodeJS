
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select momentary switch to monitor', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Toggle these lights...', section => {
            section.deviceSetting('switches1').capability(['switch']).name('');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'momentary.pushed', 'toggleHandler')

    })

    .subscribedEventHandler('toggleHandler', (context, event) => {
        
        theLog.AddMessage($app.label, "Toggle switch [${event.value}]", 1)
        let cnt = 0
        
        context.api.devices.sendCommands(context.config.switches1, 'switch', currentValue)
    
        for (let switchVal : curSwitch ) {
        if (curSwitch[ cnt ] == 'on') {
        switches1[ cnt ].off()
        }
        if (curSwitch[ cnt ] == 'off') {
        switches1[ cnt ].on()
        }
        cnt++
        }
        theLog.closeMessage()
        

	})
