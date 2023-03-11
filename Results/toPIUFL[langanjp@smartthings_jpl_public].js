
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors that should go to PI', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water sensors');

        });


        page.section('PI UFL Connector Details', section => {
            section.textSetting('uflConnector').name('PI UFL Connector URL with port (https://server:5460)');
            section.textSetting('uflName').name('PI UFL Connector Data Source Name (TTVRestServer)');
            section.textSetting('basicauth').name('base64 encoded username password');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'genericHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'genericHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'water', 'genericHandler')

    })

    .subscribedEventHandler('genericHandler', (context, event) => {
        
        let evtValue = event.value
        let evtTime = event.date.getTime() / 1000
        let tagName = event.location.toString() + '.' + event.displayName + '.' + event.name
        let datarecord = tagName + ',' + evtTime + ',' + evtValue
        console.log(datarecord)
        this.piuflcWriter(datarecord)
        

	})
