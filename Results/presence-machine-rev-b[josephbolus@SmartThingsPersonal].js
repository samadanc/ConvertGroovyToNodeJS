
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Person1 Switchs to Monitor', section => {
            section.deviceSetting('person1Precense').capability(['switch']).name('');

        });


        page.section('Select Person2 Switchs to Monitor', section => {
            section.deviceSetting('person2Precense').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.person1Precense, 'switch', 'switch.Off', 'person1offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.person2Precense, 'switch', 'switch.Off', 'person1offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.person2Precense, 'switch', 'switch.On', 'person1onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.person1Precense, 'switch', 'switch.On', 'person1onHandler')

    })

    .subscribedEventHandler('person1onHandler', (context, event) => {
        
        state.peopleHome = state.peopleHome + 1
        if (state.peopleHome > 0) {
        this.setLocationMode('Away')
        } else {
        this.setLocationMode('Home')
        }
        console.log("int is: ${state.peopleHome}")
        

	})

    .subscribedEventHandler('person1offHandler', (context, event) => {
        
        state.peopleHome = state.peopleHome - 1
        if (state.peopleHome > 0) {
        this.setLocationMode('Away')
        } else {
        this.setLocationMode('Home')
        }
        console.log("int is: ${state.peopleHome}")
        

	})
