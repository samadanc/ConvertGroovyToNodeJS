
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('roku').capability(['mediaController']).name('Roku Device');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.roku, 'mediaController', 'activityList', 'createButtons')

    })

    .subscribedEventHandler('createButtons', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.roku, 'mediaController', currentValue)
    
        if (activityList != null) {
        let appsNode = new XmlSlurper().parseText(activityList)
        appsNode.children().each({
        let appId = it.id.toString()
        let deviceLabel = it.text()
        if (this.getChildDevice(appId) == null) {
        let device = this.addChildDevice('smartthings', 'Momentary Button Tile', appId, null, ['label': "Roku: $deviceLabel"])
        state["${device.id}"] = appId
        console.log("Created button tile ${device.id} for channel $deviceLabel ($appId)")
        } else {
        console.log("Skipped $appId")
        }
        })
        }
        if (this.getChildDevice('powerOn') == null) {
        let device = this.addChildDevice('smartthings', 'Momentary Button Tile', 'powerOn', null, ['label': 'Roku: Power On'])
        state["${device.id}"] = 'powerOn'
        console.log("Created Power On tile ${device.id}")
        } else {
        console.log('Skipped Power On tile')
        }
        if (this.getChildDevice('powerOff') == null) {
        let device = this.addChildDevice('smartthings', 'Momentary Button Tile', 'powerOff', null, ['label': 'Roku: Power Off'])
        state["${device.id}"] = 'powerOff'
        console.log("Created Power Off tile ${device.id}")
        } else {
        console.log('Skipped Power Off tile')
        }
        this.getAllChildDevices().each({
        this.subscribe(it, 'switch', switchHandler)
        })
        

	})
