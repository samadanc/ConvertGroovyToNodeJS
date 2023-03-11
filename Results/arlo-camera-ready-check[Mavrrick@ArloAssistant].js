
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Setup', section => {
            section.deviceSetting('cameras').capability(['videoCapture']).name('');
            section.numberSetting('clipLength').name('Check time');

        });


        page.section('Virtual Tile Setup', section => {
            section.booleanSetting('createTileDev').name('Would you like to create a virtual tile to create your virtual buttons for Mode change functianlity');

        });


        page.section('IFTTT Fix Integration', section => {
            section.deviceSetting('iftttSwitch').capability(['switch']).name('');
            section.numberSetting('iftttLength').name('Check time');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.booleanSetting('sendNotify').name('Do you want to notifiy on this event');
            section.booleanSetting('sendPush').name('Send Push notifications to everyone?');

        });


        page.section('Camera to refresh clips', section => {
            section.deviceSetting('camerasIMG').capability(['imageCapture']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.cameras, 'videoCapture', 'clip', 'arloDetails')

        await context.api.subscriptions.subscribeToDevices(context.config.cameras, 'videoCapture', 'clipStatus.Initiated', 'arloCheck')

    })

    .subscribedEventHandler('arloCheck', (context, event) => {
        
        console.log("${event.name}: ${event.value}. Schedule check in $clipLength")
        

	})

    .subscribedEventHandler('arloDetails', (context, event) => {
        
        console.log("$cameras clip status data check")
        let data = this.parseJson(event.data)
        console.log("event data: $data")
        console.log("event key1: ${data.clipPath}")
        console.log("event key2: ${data.thumbnailPath}")
        let thumbnail = data.thumbnailPath
        console.log("$thumbnail passing to virtual device now")
        state?.getLastImageURL = thumbnail
        camerasIMG?.doRefresh(data.thumbnailPath)
        

	})
