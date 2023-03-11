
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Things to check?', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Thermostats to monitor', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Turn thermostat off automatically?', section => {
            section.enumSetting('turnOffTherm').name('');

        });


        page.section('Delay to wait before turning thermostat off (defaults to 1 minute)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatMode', 'thermoChange')

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact.open', 'windowChange')

    })

    .subscribedEventHandler('thermoChange', (context, event) => {
        
        if (event.value == 'heat' || event.value == 'cool') {
        let open = sensors.findAll({
        it?.latestValue('contact') == 'open'
        })
        if (open) {
        let plural = open.size() > 1 ? 'are' : 'is'
        this.send("${open.join(, )} $plural still open and the thermostat just came on.")
        this.thermoShutOffTrigger()
        } else {
        log.info('Thermostat came on and nothing is open.')
        }
        }
        

	})

    .subscribedEventHandler('windowChange', (context, event) => {
        
        let heating = thermostats.findAll({
        it?.latestValue('thermostatMode') == 'heat'
        })
        let cooling = thermostats.findAll({
        it?.latestValue('thermostatMode') == 'cool'
        })
        if (heating || cooling ) {
        let open = sensors.findAll({
        it?.latestValue('contact') == 'open'
        })
        let tempDirection = heating ? 'heating' : 'cooling'
        let plural = open.size() > 1 ? 'were' : 'was'
        this.send("${open.join(, )} $plural opened and the thermostat is still $tempDirection.")
        this.thermoShutOffTrigger()
        }
        

	})
