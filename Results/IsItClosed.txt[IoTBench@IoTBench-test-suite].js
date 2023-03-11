
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which mode changes trigger the check?', section => {

        });


        page.section('When should I check? (once per day)', section => {
            section.timeSetting('timeToCheck').name('(Optional)');

        });


        page.section('Which door should I check?', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkDoor', delay);

    })

    .scheduledEventHandler('checkDoor', (context, event) => {
        
        console.log("Door ${door.displayName} is ${door.currentContact}")
        if (door.currentContact == 'open') {
        let msg = "${door.displayName} was left open!"
        log.info(msg)
        this.sendPush(msg)
        } else {
        console.log('It wasn\'t open.')
        }
        

	})
