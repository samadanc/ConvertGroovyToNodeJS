
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


        page.section('When movement is detected...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Pick the room');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'roomOccupiedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'roomAvailableHandler')

    })

    .subscribedEventHandler('roomAvailableHandler', (context, event) => {
        
        console.log("Event = $evt")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        let params = ['uri': 'http://cablelabs.ws:8383', 'path': '/rooms/', 'headers': ['Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded'], 'body': ['id': '203', 's': 'available']]
        this.httpPost(params, { let response ->
        if (method != null) {
        this.api(method, args, success)
        }
        return result
        })
        

	})

    .subscribedEventHandler('roomOccupiedHandler', (context, event) => {
        
        console.log("Event = $evt")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        let params = ['uri': 'http://cablelabs.ws:8383', 'path': '/rooms/', 'headers': ['Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded'], 'body': ['id': '203', 's': 'occupied']]
        this.httpPost(params, { let response ->
        if (method != null) {
        this.api(method, args, success)
        }
        return result
        })
        

	})
