
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'incrementCounter')

    })

    .subscribedEventHandler('incrementCounter', (context, event) => {
        
        let data = this.parseJson(event.data)
        console.log("Event data: $data")
        console.log("Event time: ${event.date}")
        console.log("Event desc: ${event.description}")
        console.log("Event dtxt: ${event.descriptionText}")
        console.log("Event dev.: ${event.device}")
        console.log("Event name: ${event.displayName}")
        console.log("Event dvid: ${event.deviceId}")
        console.log("Event id  : ${event.id}")
        console.log("Event hub : ${event.hubId}")
        console.log("Event SAid: ${event.installedSmartAppId}")
        

	})
