
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose switch to monitor for raspberry pi info... ', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('');

        });


        page.section('Delay', section => {
            section.deviceSetting('myothers').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'esp8266haas', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("handler: ${event.name}, ${event.value}, $settings ")
        let slurper = new JsonSlurper()
        let result = slurper.parseText(event.value)
        console.log("result: $result")
        if (result.containsKey('value')) {
        let val = result['value']
        console.log("got value $val ")
        let esp1 = myothers[0]
        let esp1name = esp1.name
        console.log("$esp1 $esp1name ")
        if (esp1name == 'ESP8266 test1') {
        console.log("sending to $esp1 ")
        esp1.get('temperature', val)
        }
        }
        

	})
