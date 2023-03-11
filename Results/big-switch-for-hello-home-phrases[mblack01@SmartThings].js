
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        log.info('Running Light On Event')
        this.sendNotificationEvent("Performing "$HHPhraseOn" because $master turned on.")
        location.helloHome.execute(settings.HHPhraseOn)
        

	})
