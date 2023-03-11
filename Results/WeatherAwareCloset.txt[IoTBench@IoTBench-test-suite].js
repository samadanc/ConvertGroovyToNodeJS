
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Push me a notification, when...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Door Opens');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Detected');

        });


        page.section('And the weather outside is...', section => {
            section.enumSetting('wumonitor').name('Weather Conditions...');
            section.textSetting('wucity').name('In location...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.acceleration, 'accelerationSensor', 'acceleration.active', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let response = this.getWeatherFeature('conditions', wucity)
        let currentCondition = this.isCondition(response, wumonitor)
        if (currentCondition) {
        console.log('Weather-Aware condition filled. Pushing notification...')
        this.sendPush("Please note that it's $currentCondition outside.")
        } else {
        console.log('Sensor opened, but Weather-Aware condition not filled')
        }
        

	})
