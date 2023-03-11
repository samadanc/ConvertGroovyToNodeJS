
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Please select sensors to monitor:', section => {
            section.deviceSetting('batteryPoweredSensors').capability(['battery']).name('Battery Powered Sensors:');
            section.numberSetting('thresholdPreference').name('Specify the threshold, in minutes, before report a problem.');

        });


        page.section('Send a push alert with every successful inspection?', section => {
            section.enumSetting('pushSuccessfulInspections').name('Set your preference:');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('inspectDeviceSets', delay);

    })

    .scheduledEventHandler('inspectDeviceSets', (context, event) => {
        
        console.log('Starting Device Inspection.')
        let reportCount = 0
        batteryPoweredSensors.each({
        let recentEvents = it.events(['max': 1])
        if (recentEvents.size > 0) {
        console.log("There were ${recentEvents.size} found for device ${it.displayName} with the last activity occuring at ${recentEvents[0].date}.")
        let elapseTime = this.now() - recentEvents[0].date.time
        if (elapseTime >= this.getThreshold()) {
        console.log("Computed elapse time of $elapseTime with a threshold of ${this.getThreshold()}.")
        this.ReportOnDevice(it, elapseTime)
        reportCount++
        }
        } else {
        this.SendNoActivityWarning(it)
        reportCount++
        }
        })
        if (reportCount == 0 && pushSuccessfulInspections == 'Yes') {
        console.log('Sending a success report based on user preference.')
        this.sendPush('All devices were inspected and passed!')
        }
        console.log("Device inspection is complete at ${state.lastCheckTime}")
        

	})
