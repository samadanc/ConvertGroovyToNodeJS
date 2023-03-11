
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Dimmable Lights...', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Lights');

        });


        page.section('Activate the flicker when this switch is on...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if 
        for (let dimmer : dimmers ) {
        let lowLevel = Math.abs(new Random().nextInt() % 3) + 59
        let upLevel = Math.abs(new Random().nextInt() % 10) + 90
        let upDelay = Math.abs(new Random().nextInt() % 500)
        let lowDelay = upDelay + Math.abs(new Random().nextInt() % 200)
        dimmer.setLevel(upLevel, ['delay': upDelay ])
        dimmer.setLevel(lowLevel, ['delay': lowDelay ])
        }
        let sleepTime = Math.abs(new Random().nextInt() % 200)
        this.pause(sleepTime)
        this.runIn(1, 'eventHandler')
        }
        

	})
