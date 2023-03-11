
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Before using this tool, you need separate \'switch\' devices set up to control each digit (0-9) on your media device.  Please also run the Channel Adder SmartApp before this one.  Press Next to continue.'', section => {

        });


        page.section('Select device for remote key 0:', section => {
            section.deviceSetting('number0').capability(['switch']).name('');

        });


        page.section('Select device for remote key 1:', section => {
            section.deviceSetting('number1').capability(['switch']).name('');

        });


        page.section('Select device for remote key 2:', section => {
            section.deviceSetting('number2').capability(['switch']).name('');

        });


        page.section('Select device for remote key 3:', section => {
            section.deviceSetting('number3').capability(['switch']).name('');

        });


        page.section('Select device for remote key 4:', section => {
            section.deviceSetting('number4').capability(['switch']).name('');

        });


        page.section('Select device for remote key 5:', section => {
            section.deviceSetting('number5').capability(['switch']).name('');

        });


        page.section('Select device for remote key 6:', section => {
            section.deviceSetting('number6').capability(['switch']).name('');

        });


        page.section('Select device for remote key 7:', section => {
            section.deviceSetting('number7').capability(['switch']).name('');

        });


        page.section('Select device for remote key 8:', section => {
            section.deviceSetting('number8').capability(['switch']).name('');

        });


        page.section('Select devices for remote key 9:', section => {
            section.deviceSetting('number9').capability(['switch']).name('');

        });


        page.section('Select channels to control:', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'device.dummyswitch', 'switch', 'switchesHandler')

    })

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        console.log('one of the configured switches changed states')
        let evtDevice = event.getDevice()
        console.log("${evtDevice.name}")
        let devID = evtDevice.currentValue('guidenum')
        if (devID.isNumber()) {
        let len = devID.length()
        console.log("length = $len")
        for (let i = 0; i < len ; i++) {
        let num = devID.substring(i, i + 1)
        let mydevice = settings."number$num"
        console.log("the device is ${mydevice.name}")
        mydevice.on()
        }
        }
        

	})
