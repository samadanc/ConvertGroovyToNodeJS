
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('Which switch to cycle...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Power Cycle at...', section => {
            section.timeSetting('rebootTime').name('At what time?');

        });


        page.section('On Which Days', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('How long to stay off', section => {
            section.numberSetting('secondsdelay').name('Seconds');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('rebootNow', delay);

    })

    .scheduledEventHandler('rebootNow', (context, event) => {
        
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let day = df.format(new Date())
        
        context.api.devices.sendCommands(context.config.days, 'enum', contains)
    
        if (dayCheck) {
        console.log("Cycling power on switch(es): $theSwitch ")
        let delay1 = (secondsdelay as int)
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', off)
    
        console.log('switch is off')
        console.log(" waiting for $delay1 seconds")
        this.runIn(delay1, switchOn)
        } else {
        console.log('Not today!')
        }
        

	})
