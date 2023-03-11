
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Location', section => {

        });


        page.section('Manual Weather Check', section => {
            section.deviceSetting('manlTrigger').capability(['switch']).name('Manual Trigger To Repeat Weather Alert');

        });


        page.section('Notification Device', section => {
            section.deviceSetting('speaker').capability(['audioNotification']).name('Speaker');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('Alerts', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.manlTrigger, 'switch', 'switch.on', 'manlAlerts')

    })

    .subscribedEventHandler('manlAlerts', (context, event) => {
        
        let alerts = this.getTwcAlerts("${settings.longitude},${settings.latitude}")
        if (alerts) {
        alerts.eachWithIndex({ let alert, let index ->
        let msg = alert.headlineText
        if (alert.effectiveTimeLocal && !(msg.contains(' from '))) {
        msg += " from ${this.parseAlertTime(alert.effectiveTimeLocal).format(E hh:mm a, TimeZone.getTimeZone(alert.effectiveTimeLocalTimeZone))}"
        }
        if (alert.expireTimeLocal && !(msg.contains(' until '))) {
        msg += " until ${this.parseAlertTime(alert.expireTimeLocal).format(E hh:mm a, TimeZone.getTimeZone(alert.expireTimeLocalTimeZone))}"
        }
        let msg1 = msg.replaceAll('SUN', 'SUNDAY')
        let msg2 = msg1.replaceAll('MON', 'MONDAY')
        let msg3 = msg2.replaceAll('TUE', 'TUESDAY')
        let msg4 = msg3.replaceAll('WED', 'WEDNESDAY')
        let msg5 = msg4.replaceAll('THU', 'THURSDAY')
        let msg6 = msg5.replaceAll('FRI', 'FRIDAY')
        let msg7 = msg6.replaceAll('SAT', 'SATURDAY')
        let msg8 = msg7.replaceAll('CST', '')
        console.log("$msg8")
        
        context.api.devices.sendCommands(context.config.speaker, 'audioNotification', playAnnouncement)
    
        console.log("${alert.significance}")
        })
        } else {
        console.log('No current alerts')
        
        context.api.devices.sendCommands(context.config.speaker, 'audioNotification', playAnnouncement)
    
        }
        
        context.api.devices.sendCommands(context.config.manlTrigger, 'switch', off)
    
        

	})

    .scheduledEventHandler('Alerts', (context, event) => {
        
        let alerts = this.getTwcAlerts("${settings.longitude},${settings.latitude}")
        if (alerts) {
        alerts.eachWithIndex({ let alert, let index ->
        let msg = alert.headlineText
        if (alert.effectiveTimeLocal && !(msg.contains(' from '))) {
        msg += " from ${this.parseAlertTime(alert.effectiveTimeLocal).format(E hh:mm a, TimeZone.getTimeZone(alert.effectiveTimeLocalTimeZone))}"
        }
        if (alert.expireTimeLocal && !(msg.contains(' until '))) {
        msg += " until ${this.parseAlertTime(alert.expireTimeLocal).format(E hh:mm a, TimeZone.getTimeZone(alert.expireTimeLocalTimeZone))}"
        }
        console.log("$msg")
        console.log("${state.prevalerts}")
        let alerttype = alert.phenomena
        let signif = alert.significance
        if (alerttype != state.prevalerts[ index ] || signif != state.signific[ index ]) {
        if (alerttype == 'TO' || alerttype == 'IS' || alerttype == 'WS' || alerttype == 'WW' || alerttype == 'ZR' || alerttype == 'SV') {
        if (alert.significance == 'W' || alert.significance == 'A') {
        let msg1 = msg.replaceAll('SUN', 'SUNDAY')
        let msg2 = msg1.replaceAll('MON', 'MONDAY')
        let msg3 = msg2.replaceAll('TUE', 'TUESDAY')
        let msg4 = msg3.replaceAll('WED', 'WEDNESDAY')
        let msg5 = msg4.replaceAll('THU', 'THURSDAY')
        let msg6 = msg5.replaceAll('FRI', 'FRIDAY')
        let msg7 = msg6.replaceAll('SAT', 'SATURDAY')
        let msg8 = msg7.replaceAll('CST', '')
        console.log("$msg8")
        this.sendNotificationEvent("$msg8")
        
        context.api.devices.sendCommands(context.config.speaker, 'audioNotification', playAnnouncement)
    
        }
        }
        }
        state.prevalerts[ index ] = alerttype
        state.signific[ index ] = signif
        console.log("$index, $alerttype, ${state.prevalerts}")
        })
        }
        
        context.api.devices.sendCommands(context.config.manlTrigger, 'switch', off)
    
        

	})
