
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.enumSetting('wattvisionDataType').name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('getDataFromWattvision', delay);

    })

    .scheduledEventHandler('getDataFromWattvision', (context, event) => {
        
        console.log('getting data from wattvision')
        let children = this.getChildDevices()
        if (!children) {
        return null
        }
        let endDate = new Date()
        let startDate
        if (!state.lastUpdated) {
        console.log('no state.lastUpdated')
        startDate = new Date(['hours': endDate.hours - 3])
        } else {
        console.log('parsing state.lastUpdated')
        startDate = new Date().parse(this.smartThingsDateFormat(), state.lastUpdated)
        }
        state.lastUpdated = endDate.format(this.smartThingsDateFormat())
        children.each({ let child ->
        this.getDataForChild(child, startDate, endDate)
        })
        

	})
