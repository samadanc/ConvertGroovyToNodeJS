
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('beaconHandler', (context, event) => {
        
        console.log("<beacon-control> beaconHandler: $evt")
        if (allOk) {
        let data = new groovy.json.JsonSlurper().parseText(event.data)
        let beaconName = this.getBeaconName(evt)
        let phoneName = this.getPhoneName(data)
        if (phoneName != null) {
        let action = data.presence == '1' ? 'arrived' : 'left'
        let msg = "$phoneName has $action ${((action == arrived)) ? at  : }the $beaconName"
        if (action == 'arrived') {
        msg = this.arriveActions(msg)
        } else {
        if (action == 'left') {
        msg = this.departActions(msg)
        }
        }
        console.log("<beacon-control> msg: $msg")
        if (pushNotification || phone ) {
        let options = ['method': pushNotification && phone ? 'both' : pushNotification ? 'push' : 'sms', 'phone': phone ]
        this.sendNotification(msg, options)
        }
        }
        }
        

	})
