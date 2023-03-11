
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
        
        switch (event.jsonData?.buttonNumber) {
        case '1':
        this.buttonAction(switches[0], event.value)
        break
        case '2':
        this.buttonAction(switches[1], event.value)
        break
        case '3':
        this.buttonAction(switches[2], event.value)
        break
        case '4':
        this.buttonAction(switches[3], event.value)
        break
        case '5':
        this.buttonAction(switches[4], event.value)
        break
        case '6':
        this.buttonAction(switches[5], event.value)
        break
        case '8':
        this.pushStatus()
        break
        default:
        console.log("unknown button: ${event.jsonData?.buttonNumber}")
        break
        }
        

	})
