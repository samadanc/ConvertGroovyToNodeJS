
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

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        if (allOk) {
        let buttonNumber = event.jsonData.buttonNumber
        let pressType = event.value
        console.log("$buttonDevice: Button $buttonNumber was $pressType")
        let preferenceNames = settings.findAll({
        it.key.contains("_$buttonNumber_$pressType")
        })
        preferenceNames.each({ let eachPref ->
        let prefDetail = this.getPrefDetails()?.find({
        eachPref.key.contains(it.id)
        })
        let PrefSubValue = settings["${prefDetail.sub}$buttonNumber_$pressType"]
        if (prefDetail.sub) {
        this."${prefDetail.comm}"(eachPref.value, PrefSubValue)
        } else {
        this."${prefDetail.comm}"(eachPref.value)
        }
        })
        }
        

	})
