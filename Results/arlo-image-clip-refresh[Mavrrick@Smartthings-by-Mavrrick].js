
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Setup', section => {
            section.deviceSetting('cameras').capability(['videoCapture']).name('');
            section.numberSetting('clipLength').name('Clip Length');
            section.enumSetting('frequencyUnit').name('Unit for frequency');
            section.numberSetting('frequency').name('Frequency to refresh cameras');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('arloRefresh', delay);

    })

    .scheduledEventHandler('arloRefresh', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log("Refreshing cameras with $clipLength second capture")
        Date start = new Date()
        Date end = new Date()
        this.use(TimeCategory, {
        end = start + clipLength.seconds
        })
        console.log('Capturing...')
        
        context.api.devices.sendCommands(context.config.cameras, 'videoCapture', capture)
    
        

	})
