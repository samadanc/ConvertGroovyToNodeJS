
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Create Device to monitor list', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Send to', section => {
            section.deviceSetting('serverDH').capability(['button']).name('');

        });


        page.section('Using this controller', section => {
            section.deviceSetting('controller').capability(['button']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'level', 'switchEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('switchEventHandler', (context, event) => {
        
        String VarA
        String VarB
        switches.eachWithIndex({ let swtch, let indx ->
        VarA = event.device
        VarB = switches[ indx ]
        if (VarA == VarB ) {
        this.getDeviceStat(swtch, indx)
        }
        })
        

	})

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        let varD = event.jsonData?.buttonNumber
        console.log(varD.toInteger())
        if (varD > 0 && varD < 13) {
        this.buttonAction(switches[varD - 1], event.value)
        }
        if (varD == 66) {
        this.pushStatus()
        }
        

	})
