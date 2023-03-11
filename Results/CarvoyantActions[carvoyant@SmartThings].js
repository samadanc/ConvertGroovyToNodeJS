
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''App Nickname'', section => {

        });


        page.section('When the selected vehicle(s)', section => {

        });


        page.section('perform this event', section => {
            section.enumSetting('vehicleEvent').name('Select Vehicle Event...');

        });


        page.section('And there is no motion on these sensors (optional)', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Select Sensor(s)');

        });


        page.section('And the above sensor(s) report no motion for (default=0 minutes)', section => {
            section.numberSetting('residentsQuietThreshold').name('Time in minutes');

        });


        page.section('Set the selected lock(s)', section => {
            section.deviceSetting('locks').capability(['lock']).name('Select Lock(s)...');
            section.enumSetting('lockState').name('Locked/Unlocked');

        });


        page.section('Set the selected light(s)', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Light(s)...');
            section.enumSetting('switchState').name('On/Off');

        });


        page.section('Set the selected camera(s)', section => {
            section.deviceSetting('cameras').capability(['imageCapture']).name('Select Camera(s)...');
            section.enumSetting('cameraState').name('On/Off');

        });


        page.section('Set the alarm system', section => {
            section.deviceSetting('alarmSwitch').capability(['contactSensor']).name('Select Alarm...');
            section.enumSetting('alarmState').name('On/Off');

        });


        page.section('', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionEvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.vehicles, 'device.connectedCar', 'ignitionStatus', 'ignitionStatus')

        await context.api.subscriptions.subscribeToDevices(context.config.vehicles, 'device.connectedCar', 'presence', 'presence')

        await context.api.subscriptions.subscribeToDevices(context.config.alarmSwitch, 'contactSensor', 'contact', 'alarmSwitchContact')

    })

    .subscribedEventHandler('ignitionStatus', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'ON' && vehicleEvent == 'Ignition On' || event.value == 'OFF' && vehicleEvent == 'Ignition Off') {
        this.takeActions()
        }
        

	})

    .subscribedEventHandler('motionEvtHandler', (context, event) => {
        
        if (event.value == 'active') {
        state.lastIntroductionMotion = this.now()
        console.log('Motion at home...')
        }
        

	})

    .subscribedEventHandler('alarmSwitchContact', (context, event) => {
        
        log.info("alarmSwitchContact, ${event.name}: ${event.value}")
        if (alarmSwitch.currentContact == 'closed' && this.residentsHaveBeenQuiet() && this.everyoneIsAway() && vehicleEvent == 'Departure') {
        if (detailedNotif == 'true') {
        this.send('Carvoyant> alarm system just armed')
        }
        }
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        let threshold = residentsQuietThreshold ? residentsQuietThreshold : 0
        Integer delay = threshold * 60
        console.log("${event.name}: ${event.value}")
        if (vehicleEvent == 'Departure') {
        if (detailedNotif == 'true') {
        this.send('Carvoyant> not present at home')
        }
        console.log('checking if everyone is away  and quiet at home')
        if (this.residentsHaveBeenQuiet()) {
        if (this.everyoneIsAway()) {
        if (detailedNotif == 'true') {
        this.send('Carvoyant> Quiet at home...')
        }
        this.runIn(delay, 'takeActions')
        } else {
        console.log('Not everyone is away, doing nothing')
        if (detailedNotif == 'true') {
        this.send('Carvoyant> Not everyone is away, doing nothing..')
        }
        }
        } else {
        console.log('Things are not quiet at home, doing nothing')
        if (detailedNotif == 'true') {
        this.send('Carvoyant> Things are not quiet at home...')
        }
        }
        } else {
        if (vehicleEvent == 'Arrival') {
        let result = true
        for (let v : vehicles ) {
        if (v.currentPresence == 'not present') {
        result = false
        break
        }
        }
        if (result) {
        this.runIn(delay, 'takeActions')
        }
        }
        }
        

	})
