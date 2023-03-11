
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Setup my device with this IP', section => {
            section.textSetting('IP').name('');

        });


        page.section('Setup my device with this Port', section => {
            section.numberSetting('port').name('');

        });


        page.section(''Setup my devices with smartthings hub (optional)'', section => {

        });


        page.section('Setup my devices without cloud', section => {
            section.booleanSetting('withoutCloud').name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('handlerOnline', delay);

    })

    .subscribedEventHandler('deviceHandler', (context, event) => {
        
        if (withoutCloud != null && withoutCloud ) {
        return null
        }
        if (hub) {
        this.apiHubGet("/${app.id}/${state.accessToken}/execute?deviceId=${event.getDevice().getDeviceNetworkId()}", null)
        } else {
        this.apiGet("/${app.id}/${state.accessToken}/execute?deviceId=${event.getDevice().getDeviceNetworkId()}")
        }
        

	})

    .scheduledEventHandler('handlerOnline', (context, event) => {
        
        let timeout = 1000 * 60 * 20
        let curTime = new Date().getTime()
        this.getAllDevices().each({
        let activeDate = state.lastcheck
        if (curTime - timeout > activeDate ) {
        it.markDeviceOffline()
        this.debug("PHEV offline ${(curTime - timeout)} > $activeDate ")
        } else {
        it.markDeviceOnline()
        this.debug("PHEV online  ${(curTime - timeout)} < $activeDate ")
        }
        })
        

	})
