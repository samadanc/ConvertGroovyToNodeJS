
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('As the last of these persons leaves', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Check that these are closed', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}, ${event.deviceId}")
        if (event.value == 'not present') {
        console.log("isSomeonePresent()? ${this.isSomeonePresent()}")
        console.log("isDoorsOpen()? ${this.isDoorsOpen()}")
        if (!(this.isSomeonePresent()) && this.isDoorsOpen()) {
        let device = people.find({
        it.id == event.deviceId
        })
        console.log("${device.displayName} left ${location.name} without closing ${this.isDoorsOpen().join(, )}")
        this.sendPush("${device.displayName} left ${location.name} without closing ${this.isDoorsOpen().join(, )}")
        }
        }
        

	})
