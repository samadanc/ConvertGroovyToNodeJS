
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which is your Concord4?', section => {
            section.deviceSetting('concord4').capability(['lock']).name('');

        });


        page.section('Zones', section => {
            section.deviceSetting('zone1').capability(['contactSensor']).name('Zone 1');
            section.deviceSetting('zone2').capability(['contactSensor']).name('Zone 2');
            section.deviceSetting('zone3').capability(['contactSensor']).name('Zone 3');
            section.deviceSetting('zone4').capability(['contactSensor']).name('Zone 4');
            section.deviceSetting('zone5').capability(['contactSensor']).name('Zone 5');
            section.deviceSetting('zone6').capability(['contactSensor']).name('Zone 6');
            section.deviceSetting('zone7').capability(['contactSensor']).name('Zone 7');
            section.deviceSetting('zone8').capability(['contactSensor']).name('Zone 8');
            section.deviceSetting('zone9').capability(['contactSensor']).name('Zone 9');
            section.deviceSetting('zone10').capability(['contactSensor']).name('Zone 10');
            section.deviceSetting('zone13').capability(['contactSensor']).name('Zone 13');
            section.deviceSetting('zone14').capability(['contactSensor']).name('Zone 14');
            section.deviceSetting('zone15').capability(['contactSensor']).name('Zone 15');

        });


        page.section('Presence Options', section => {
            section.deviceSetting('autoArmDoorLock').capability(['lock']).name('Arm when door locked and all away and disarm on return with code?');
            section.deviceSetting('whoIsAway').capability(['presenceSensor']).name('When who is away?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.concord4, 'lock', 'zone$i.open', 'zoneOpen')

        await context.api.subscriptions.subscribeToDevices(context.config.concord4, 'lock', 'zone$i.closed', 'zoneClose')

        await context.api.subscriptions.subscribeToDevices(context.config.autoArmDoorLock, 'lock', 'lock', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (event.value == 'locked') {
        console.log('door locked, waiting 10 minutes to check presence for ARMING')
        this.runIn(60 * 10, checkPresenceArm)
        } else {
        if (event.value == 'unlocked') {
        let isManual = false
        if (event.data == '' || event.data == null) {
        isManual = true
        }
        if (isManual == false) {
        console.log('door unlocked with code, will disarm')
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'off'])
        } else {
        console.log('door unlocked manually, will NOT disarm')
        }
        }
        }
        

	})

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        console.log("Alarm Handler event.value: ${event.value}")
        let device = concord4.find({
        it.id == state.concord_id
        })
        console.log("alarmHandler device.lock: ${device.currentValue(lock)}")
        if (event.value == 'off') {
        if (device.currentValue('lock') != 'unlocked') {
        device.unlock()
        device.update('armStatus', 'Off')
        }
        } else {
        if (event.value == 'away') {
        if (device.currentValue('lock') != 'locked') {
        device.armaway()
        device.update('armStatus', 'Away')
        }
        } else {
        if (event.value == 'stay') {
        if (device.currentValue('lock') != 'locked') {
        device.armstay()
        device.update('armStatus', 'Stay')
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('zoneClose', (context, event) => {
        
        console.log('Setting Device Closed')
        switch (event.name) {
        case 'zone1':
        
        context.api.devices.sendCommands(context.config.zone1, 'contactSensor', closed)
    
        break
        case 'zone2':
        
        context.api.devices.sendCommands(context.config.zone2, 'contactSensor', closed)
    
        break
        case 'zone3':
        
        context.api.devices.sendCommands(context.config.zone3, 'contactSensor', closed)
    
        break
        case 'zone4':
        
        context.api.devices.sendCommands(context.config.zone4, 'contactSensor', closed)
    
        break
        case 'zone5':
        
        context.api.devices.sendCommands(context.config.zone5, 'contactSensor', closed)
    
        break
        case 'zone6':
        
        context.api.devices.sendCommands(context.config.zone6, 'contactSensor', closed)
    
        break
        case 'zone7':
        
        context.api.devices.sendCommands(context.config.zone7, 'contactSensor', closed)
    
        break
        case 'zone8':
        
        context.api.devices.sendCommands(context.config.zone8, 'contactSensor', closed)
    
        break
        case 'zone9':
        
        context.api.devices.sendCommands(context.config.zone9, 'contactSensor', closed)
    
        break
        case 'zone10':
        
        context.api.devices.sendCommands(context.config.zone10, 'contactSensor', closed)
    
        break
        case 'zone13':
        
        context.api.devices.sendCommands(context.config.zone13, 'contactSensor', closed)
    
        break
        case 'zone14':
        
        context.api.devices.sendCommands(context.config.zone14, 'contactSensor', closed)
    
        break
        case 'zone15':
        
        context.api.devices.sendCommands(context.config.zone15, 'contactSensor', closed)
    
        break
        }
        let device = concord4.find({
        it.id == state.concord_id
        })
        if (device.currentValue('lock') != 'unlocked') {
        let message = 'Alarm is ARMED and \'\'' + this.getZoneName(event.name) + '\'\' has OPENED!'
        this.sendNotificationEvent(message)
        if (sendPushMessage == 'Yes') {
        this.sendPush(message)
        }
        if (phoneNumber != Null ) {
        this.sendSms(phoneNumber, message)
        }
        }
        

	})

    .subscribedEventHandler('zoneOpen', (context, event) => {
        
        console.log('Setting Device Open')
        switch (event.name) {
        case 'zone1':
        
        context.api.devices.sendCommands(context.config.zone1, 'contactSensor', open)
    
        break
        case 'zone2':
        
        context.api.devices.sendCommands(context.config.zone2, 'contactSensor', open)
    
        break
        case 'zone3':
        
        context.api.devices.sendCommands(context.config.zone3, 'contactSensor', open)
    
        break
        case 'zone4':
        
        context.api.devices.sendCommands(context.config.zone4, 'contactSensor', open)
    
        break
        case 'zone5':
        
        context.api.devices.sendCommands(context.config.zone5, 'contactSensor', open)
    
        break
        case 'zone6':
        
        context.api.devices.sendCommands(context.config.zone6, 'contactSensor', open)
    
        break
        case 'zone7':
        
        context.api.devices.sendCommands(context.config.zone7, 'contactSensor', open)
    
        break
        case 'zone8':
        
        context.api.devices.sendCommands(context.config.zone8, 'contactSensor', open)
    
        break
        case 'zone9':
        
        context.api.devices.sendCommands(context.config.zone9, 'contactSensor', open)
    
        break
        case 'zone10':
        
        context.api.devices.sendCommands(context.config.zone10, 'contactSensor', open)
    
        break
        case 'zone13':
        
        context.api.devices.sendCommands(context.config.zone13, 'contactSensor', open)
    
        break
        case 'zone14':
        
        context.api.devices.sendCommands(context.config.zone14, 'contactSensor', open)
    
        break
        case 'zone15':
        
        context.api.devices.sendCommands(context.config.zone15, 'contactSensor', open)
    
        break
        }
        let device = concord4.find({
        it.id == state.concord_id
        })
        if (device.currentValue('lock') != 'unlocked') {
        let message = 'Alarm is ARMED and \'\'' + this.getZoneName(event.name) + '\'\' has OPENED!'
        this.sendNotificationEvent(message)
        if (sendPushMessage == 'Yes') {
        this.sendPush(message)
        }
        if (phoneNumber != Null ) {
        this.sendSms(phoneNumber, message)
        }
        }
        

	})
