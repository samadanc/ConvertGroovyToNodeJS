
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When heat is sensed...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('Where?');
            section.numberSetting('temperature1').name('Degrees or higher...');

        });


        page.section('Run fan for...', section => {
            section.numberSetting('runTime').name('how many minutes.');

        });


        page.section('Don\'t restart fan for at least...', section => {
            section.numberSetting('timeout').name('how many minutes. (optional)');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Send these commands to HAM Bridge', section => {
            section.textSetting('HAMBon').name('Command for ON');
            section.textSetting('HAMBoff').name('Command for OFF');

        });


        page.section('Server address and port number', section => {
            section.textSetting('server').name('Server IP');
            section.numberSetting('port').name('Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let tooWarm = temperature1
        if (event.doubleValue >= tooWarm ) {
        if (state.delay != true) {
        this.fanOn()
        }
        }
        

	})
