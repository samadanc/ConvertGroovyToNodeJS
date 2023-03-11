
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this sensor has events: (Arduino or other MUX-ed sensor input)', section => {
            section.deviceSetting('master').capability(['contactSensor']).name('Which arduino?');

        });


        page.section('Event 1 controls this virtual sensor:', section => {
            section.deviceSetting('sensor1').capability(['contactSensor']).name('');

        });


        page.section('Event 2 controls this virtual sensor:', section => {
            section.deviceSetting('sensor2').capability(['contactSensor']).name('');

        });


        page.section('Event 3 controls this virtual sensor', section => {
            section.deviceSetting('sensor3').capability(['contactSensor']).name('');

        });


        page.section('Event 4 controls this virtual sensor', section => {
            section.deviceSetting('sensor4').capability(['contactSensor']).name('');

        });


        page.section('Event 5 controls this virtual sensor:', section => {
            section.deviceSetting('sensor5').capability(['contactSensor']).name('');

        });


        page.section('Event 6 controls this virtual sensor:', section => {
            section.deviceSetting('sensor6').capability(['contactSensor']).name('');

        });


        page.section('Event 7 controls this virtual sensor', section => {
            section.deviceSetting('sensor7').capability(['contactSensor']).name('');

        });


        page.section('Event 8 controls this virtual sensor', section => {
            section.deviceSetting('sensor8').capability(['contactSensor']).name('');

        });


        page.section('Use this Simulated Switch for the Fan', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Use this Simulated Switch for the Westinghouse Outlet', section => {
            section.deviceSetting('switch3').capability(['switch']).name('');

        });


        page.section('Use this Simulated Switch for the Orvibo', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switchPsu.on', 'switchOrviboOn')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOn')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switchPsu.refresh', 'switchOrviboRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'contactSensor', 'contact', 'contactParser')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switchPsu.off', 'switchOrviboOff')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.off', 'switchWestOff')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.on', 'switchWestOn')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOff')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'contactSensor', 'switchOrvibo1.on', 'masterSlaveOn')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'contactSensor', 'switchOrvibo1.off', 'masterSlaveOff')

    })

    .subscribedEventHandler('masterSlaveOn', (context, event) => {
        
        console.log('Arduino turning on switch device')
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', arduinoOn)
    
        

	})

    .subscribedEventHandler('switchOrviboRefresh', (context, event) => {
        
        console.log('Refresh Orvibo')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', orviboRefresh1)
    
        

	})

    .subscribedEventHandler('switchOff', (context, event) => {
        
        console.log('Switch Off')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', offA)
    
        

	})

    .subscribedEventHandler('switchWestOff', (context, event) => {
        
        console.log('Switch Westing Off')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', offW)
    
        

	})

    .subscribedEventHandler('masterSlaveOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', arduinoOff)
    
        

	})

    .subscribedEventHandler('switchOrviboOff', (context, event) => {
        
        console.log('Switch Off')
        console.log("EVT: name: ${event.name} value: ${event.value} descriptionText: ${event.descriptionText}")
        if (event.descriptionText == 'Arduino') {
        console.log('DT is Arduino')
        } else {
        console.log('DT is not Arduino')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', orviboOff1)
    
        }
        

	})

    .subscribedEventHandler('switchWestOn', (context, event) => {
        
        console.log('Switch Westing On')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', onW)
    
        

	})

    .subscribedEventHandler('switchOrviboOn', (context, event) => {
        
        console.log('Switch On')
        console.log("EVT: name: ${event.name} value: ${event.value} descriptionText: ${event.descriptionText}")
        if (event.descriptionText == 'Arduino') {
        console.log('DT is Arduino')
        } else {
        console.log('DT is not Arduino')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', orviboOn1)
    
        }
        

	})

    .subscribedEventHandler('switchOn', (context, event) => {
        
        console.log('Switch On')
        
        context.api.devices.sendCommands(context.config.master, 'contactSensor', onA)
    
        

	})

    .subscribedEventHandler('contactParser', (context, event) => {
        
        let pair = event.value.split(':')
        let calledSensor = pair[0].trim()
        let cmd = pair[1].trim()
        if (calledSensor == 'Sensor1' && sensor1 ) {
        console.log("Sensor1: calling $cmd")
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor1, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor1, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor2' && sensor2 ) {
        console.log("Sensor2: calling $cmd")
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor2, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor2, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor3' && sensor3 ) {
        console.log("Sensor3: calling $cmd")
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor3, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor3, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor4' && sensor4 ) {
        console.log("Sensor4: calling $cmd")
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor4, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor4, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor5' && sensor5 ) {
        console.log("Sensor5: calling $cmd")
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor5, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor5, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor6' && sensor5 ) {
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor6, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor6, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor7' && sensor7 ) {
        console.log("Sensor7: calling $cmd")
        if (cmd == 'open') {
        
        context.api.devices.sendCommands(context.config.sensor7, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        
        context.api.devices.sendCommands(context.config.sensor7, 'contactSensor', close)
    
        }
        }
        } else {
        if (calledSensor == 'Sensor8' && sensor8 ) {
        console.log("Sensor8: calling $cmd")
        if (cmd == 'open') {
        state.lastDB = 'open'
        
        context.api.devices.sendCommands(context.config.sensor8, 'contactSensor', open)
    
        } else {
        if (cmd == 'close') {
        state.lastDB = 'close'
        
        context.api.devices.sendCommands(context.config.sensor8, 'contactSensor', close)
    
        }
        }
        } else {
        log.info("Couldn't match value: ${event.value}")
        }
        }
        }
        }
        }
        }
        }
        }
        

	})
