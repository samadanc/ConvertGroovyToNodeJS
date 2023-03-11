
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Create a device'', section => {

        });


        page.section(''Pair an existing device'', section => {

        });


        page.section('Other settings', section => {
            section.booleanSetting('notify').name('Notifications');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenceNotifier', (context, event) => {
        
        console.log('Event: ' + event.descriptionText)
        if (notify) {
        this.sendNotification(event.descriptionText)
        }
        

	})
