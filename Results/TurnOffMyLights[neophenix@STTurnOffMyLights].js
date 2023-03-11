
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Motion Sensors', section => {
            section.deviceSetting('sensors').capability(['motionSensor']).name('');

        });


        page.section('Wait how many minutes?', section => {
            section.numberSetting('minutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkMotion', delay);

    })

    .scheduledEventHandler('checkMotion', (context, event) => {
        
        let motion = 'inactive'
        sensors.find({
        if (it.currentValue('motion') == 'active') {
        motion = 'active'
        return true
        }
        })
        this.debug("current motion: $motion")
        if (motion == 'inactive') {
        let cal = Calendar.getInstance()
        cal.add(Calendar.MINUTE, -1 * minutes )
        let since = cal.getTime()
        let lastMotion = 0
        sensors.each({
        let states = it.statesBetween('motion', since, new Date())
        states.find({
        motion = it.stringValue
        let epoch = it.date.getTime()
        this.debug("${it.displayName} motion was $motion on $epoch")
        if (motion == 'active') {
        if (epoch > lastMotion ) {
        lastMotion = epoch
        }
        return true
        }
        })
        })
        this.debug("last activity on $lastMotion")
        cal = Calendar.getInstance()
        let diffMins = cal.getTimeInMillis() - lastMotion / 60000
        this.debug("minutes since motion $diffMins")
        if (diffMins >= minutes ) {
        lights.each({
        if (it.currentValue('switch') == 'on') {
        this.debug("turning off ${it.displayName}")
        it.off()
        }
        })
        }
        }
        

	})
