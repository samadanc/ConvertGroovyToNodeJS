
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens/closes...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("Executing app for event: $evt with settings: $settings and initial state: $state")
        console.log("myMap.size() == ${state.myMap?.size()}")
        state.myMap?.each({ let k, let v ->
        console.log("myMap[$k] == $v (${v.getClass()})")
        })
        console.log("myMap.size() == ${state.myMap?.size()}")
        state.now = new Date().toSystemFormat()
        state.myMap = ['a': 1, 'b': '2 string', 'c': new Date(), 'd': ['sub': 'map'], 'e': Math.random(), 'f': 'blamo']
        console.log("Executing app for event: $evt with settings: $settings and end state: $state")
        

	})
