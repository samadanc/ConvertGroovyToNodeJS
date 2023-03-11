
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door Sensor:', section => {
            section.deviceSetting('garageDoorSensor').capability(['contactSensor']).name('');

        });


        page.section('Garage Door Relay:', section => {
            section.deviceSetting('relay').capability(['relaySwitch']).name('');

        });


        page.section('Presence Sensor:', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('');

        });


        page.section('Interior Door Sensor:', section => {
            section.deviceSetting('interiorDoorSensor').capability(['contactSensor']).name('');

        });


        page.section('Grace period:', section => {
            section.numberSetting('grace').name('Minutes');

        });


        page.section('Time Interval', section => {
            section.timeSetting('startTime').name('Starting at:');
            section.timeSetting('endTime').name('Ending at:');

        });


        page.section('Send Notifications?', section => {

        });


        page.section('['hideable': true], 'Advanced Settings', section => {
            section.deviceSetting('controlSwitch').capability(['switch']).name('Only run if ALL of the following switches are on:');
            section.textSetting('logstash_host').name('Logstash Hostname/IP');
            section.numberSetting('logstash_port').name('Logstash Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.interiorDoorSensor, 'contactSensor', 'contact.open', 'interiorDoorHandler')

    })

    .subscribedEventHandler('interiorDoorHandler', (context, event) => {
        
        if (this.timeInRange()) {
        this.stash('interiorDoorHandler - Time is in range')
        if (controlSwitchesAllOn) {
        this.stash('interiorDoorHandler - Control switches all on')
        let timeDifference = this.now() - state.lastOpen
        if
        this.stash('Garage door is open.  Checking time differentials.')
        if (timeDifference > 30000 && timeDifference < 300000 && state.waitingForInteriorDoor == true) {
        this.stash('Interior door opened within proper window.  Closing door!')
        
        context.api.devices.sendCommands(context.config.relay, 'relaySwitch', on)
    
        state.waitingForInteriorDoor = false
        }
        } else {
        this.stash('Garage door is not open.  Ignoring.')
        }
        }
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (this.timeInRange()) {
        this.stash('presenceHandler - Time is in range')
        if (controlSwitchesAllOn) {
        this.stash('presenceHandler - Control switches all on')
        this.stash("Presence detected! ${event.value}")
        if (event.value == 'present' && state.currentPresence == 'not present') {
        console.log('event.value is present')
        let gracePeriod = this.now() - grace * 60 * 1000
        console.log("diff: $diff")
        console.log("Grace period: $gracePeriod")
        if (gracePeriod > lastOpen ) {
        this.stash('Grace period check passed')
        if
        this.notify('Opening garage door!')
        this.stash('Opening door!')
        state.waitingForInteriorDoor = true
        state.lastOpen = this.now()
        
        context.api.devices.sendCommands(context.config.relay, 'relaySwitch', on)
    
        }
        }
        state.currentPresence = event.value
        } else {
        if (event.value == 'not present') {
        this.stash('Updating presenceLeft')
        state.currentPresence = event.value
        state.presenceLeft = this.now()
        }
        }
        }
        }
        

	})
