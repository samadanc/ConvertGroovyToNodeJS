
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.textSetting('piIP').name('Raspberry Pi IP');
            section.numberSetting('piPort').name('Raspberry Pi Port');

        });


        page.section('Choose Pi:', section => {
            section.deviceSetting('thepi').capability(['temperatureMeasurement']).name('Pi');

        });


        page.section('Choose Devices:', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');
            section.deviceSetting('temperatureSensors').capability(['sensor']).name('Temperature Sensors');
            section.deviceSetting('garageDoors').capability(['garageDoorControl']).name('Garage Doors');
            section.deviceSetting('irDevices').capability(['switch']).name('IR Devices');
            section.deviceSetting('commandSequences').capability(['momentary']).name('Command Sequences');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thepi, 'temperatureMeasurement', 'it.name', 'x10EventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thepi, 'temperatureMeasurement', 'it.name', 'temperatureEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thepi, 'temperatureMeasurement', 'it.deviceNetworkId + '.sensor', 'garageDoorEventHandler')

    })

    .subscribedEventHandler('garageDoorEventHandler', (context, event) => {
        
        console.log("Mgr: garage door event name: ${event.name} = ${event.value}")
        let door = event.name.replace('.sensor', '')
        let d = garageDoors.find({ let d ->
        d.deviceNetworkId == door
        })
        if (d == null) {
        log.error("Mgr: could not find garage door $door")
        } else {
        d.setIoState(event.value)
        }
        

	})

    .subscribedEventHandler('x10EventHandler', (context, event) => {
        
        console.log("Mgr: x10 event name: ${event.name} = ${event.value}")
        let d = lights.find({ let d ->
        d.name == event.name
        })
        if (d == null) {
        log.error("Mgr: could not find ${event.name}")
        } else {
        d.setX10State(event.value)
        }
        

	})

    .subscribedEventHandler('temperatureCommandHandler', (context, event) => {
        
        console.log("Mgr: temp event name: ${event.name}")
        console.log("Mgr: temp event value: ${event.value}")
        let data = new JsonSlurper().parseText(event.value)
        if (data.command == 'refresh') {
        
        context.api.devices.sendCommands(context.config.thepi, 'temperatureMeasurement', temperatureSensorRefresh)
    
        } else {
        log.error('Mgr: unknown command in request')
        }
        

	})

    .subscribedEventHandler('irCommandHandler', (context, event) => {
        
        console.log("Mgr: ir command with ${event.value}")
        let data = event.value
        if (event.value instanceof String) {
        data = new JsonSlurper().parseText(event.value)
        }
        
        context.api.devices.sendCommands(context.config.thepi, 'temperatureMeasurement', irCommand)
    
        

	})

    .subscribedEventHandler('x10CommandHandler', (context, event) => {
        
        console.log("Mgr: x10 command with ${event.value}")
        let data = new JsonSlurper().parseText(event.value)
        if (data.command == 'refresh') {
        let code = data.houseCodeUnit
        
        context.api.devices.sendCommands(context.config.thepi, 'temperatureMeasurement', x10Refresh)
    
        } else {
        if (data.command == 'update') {
        let code = data.houseCodeUnit
        let state = data.state
        
        context.api.devices.sendCommands(context.config.thepi, 'temperatureMeasurement', x10Update)
    
        } else {
        log.error('Mgr: unknown command in request')
        }
        }
        

	})

    .subscribedEventHandler('garageDoorCommandHandler', (context, event) => {
        
        console.log("Mgr: garage door event: ${event.name} ${event.value}")
        let data = new JsonSlurper().parseText(event.value)
        if (data.command == 'refresh') {
        
        context.api.devices.sendCommands(context.config.thepi, 'temperatureMeasurement', refreshInputState)
    
        } else {
        if (data.command == 'toggle') {
        
        context.api.devices.sendCommands(context.config.thepi, 'temperatureMeasurement', toggleRelay)
    
        } else {
        log.error('Mgr: unknown garage door command in request')
        }
        }
        

	})

    .subscribedEventHandler('temperatureEventHandler', (context, event) => {
        
        console.log("Mgr: temperature event name: ${event.name} = ${event.value}")
        let d = temperatureSensors.find({ let d ->
        d.name == event.name
        })
        if (d == null) {
        log.error("Mgr: could not find temperature sensor ${event.name}")
        } else {
        d.setTemp(event.value)
        }
        

	})
