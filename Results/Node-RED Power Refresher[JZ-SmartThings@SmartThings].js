
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Node-RED Power Refresher Configuration:', section => {
            section.deviceSetting('refreshdevice').capability(['refresh']).name('Device to Refresh');

        });


        page.section('Refresh Interval in Seconds. 0 or null turns refreshing off:', section => {
            section.numberSetting('refreshfreq').name('Refresh Frequency in seconds?');

        });


        page.section('Host:Port of Node-RED:', section => {

        });


        page.section('The rest of the page URL endpoint after forward slash:', section => {

        });


        page.section('Form attribute name:', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refreshFunc', delay);

    })

    .scheduledEventHandler('refreshFunc', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.refreshdevice, 'refresh', refresh)
    
        this.schedule(this.now() + refreshfreq * 1000, refreshFunc)
        if (state.lastvalue != String.format('%6.0f', refreshdevice*.currentValue('power')[0]).trim()) {
        state.lastvalue = String.format('%6.0f', refreshdevice*.currentValue('power')[0]).trim()
        let theAction = new physicalgraph.device.HubAction("GET /${settings[urlending]}?${settings[formattribute]}=${String.format(%6.0f, refreshdevice*.currentValue(power)[0]).trim()} HTTP/1.1
        Accept: */*
        HOST: ${settings[hostport]}
        
        ", physicalgraph.device.Protocol.LAN, settings['hostport'], ['callback': calledBackHandler ])
        this.sendHubCommand(theAction)
        }
        

	})
