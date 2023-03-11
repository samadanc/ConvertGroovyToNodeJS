
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

    .subscribedEventHandler('fakebutton1hEvent', (context, event) => {
        
        this.executeHandlers(1, 'held')
        

	})

    .subscribedEventHandler('fakebutton3hEvent', (context, event) => {
        
        this.executeHandlers(3, 'held')
        

	})

    .subscribedEventHandler('fakebutton5Event', (context, event) => {
        
        this.executeHandlers(5, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton5hEvent', (context, event) => {
        
        this.executeHandlers(5, 'held')
        

	})

    .subscribedEventHandler('fakebutton2Event', (context, event) => {
        
        this.executeHandlers(2, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton4hEvent', (context, event) => {
        
        this.executeHandlers(4, 'held')
        

	})

    .subscribedEventHandler('fakebutton9Event', (context, event) => {
        
        this.executeHandlers(9, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton7hEvent', (context, event) => {
        
        this.executeHandlers(7, 'held')
        

	})

    .subscribedEventHandler('fakebutton12Event', (context, event) => {
        
        this.executeHandlers(12, 'pushed')
        

	})

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        if (allOk) {
        let buttonNumber = event.data
        let value = event.value
        console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        console.log("button: $buttonNumber, value: $value")
        let recentEvents = buttonDevice.eventsSince(new Date(this.now() - 3000)).findAll({
        it.value == event.value && it.data == event.data
        })
        console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 3 seconds")
        if (recentEvents.size <= 1) {
        switch ( buttonNumber ) {
        case ~('."buttonNumber":1.') :
        this.executeHandlers(1, value)
        break
        case ~('."buttonNumber":2.') :
        this.executeHandlers(2, value)
        break
        case ~('."buttonNumber":3.') :
        this.executeHandlers(3, value)
        break
        case ~('."buttonNumber":4.') :
        this.executeHandlers(4, value)
        break
        case ~('."buttonNumber":5.') :
        this.executeHandlers(5, value)
        break
        case ~('."buttonNumber":6.') :
        this.executeHandlers(6, value)
        break
        case ~('."buttonNumber":7.') :
        this.executeHandlers(7, value)
        break
        case ~('."buttonNumber":8.') :
        this.executeHandlers(8, value)
        break
        case ~('."buttonNumber":9.') :
        this.executeHandlers(9, value)
        break
        case ~('."buttonNumber":10.') :
        this.executeHandlers(10, value)
        break
        case ~('."buttonNumber":11.') :
        this.executeHandlers(11, value)
        break
        case ~('."buttonNumber":12.') :
        this.executeHandlers(12, value)
        break
        case ~('."buttonNumber":13.') :
        this.executeHandlers(13, value)
        break
        case ~('."buttonNumber":14.') :
        this.executeHandlers(14, value)
        break
        case ~('."buttonNumber":15.') :
        this.executeHandlers(15, value)
        break
        case ~('."buttonNumber":16.') :
        this.executeHandlers(16, value)
        break
        }
        } else {
        console.log("Found recent button press events for $buttonNumber with value $value")
        }
        }
        

	})

    .subscribedEventHandler('fakebutton8Event', (context, event) => {
        
        this.executeHandlers(8, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton16Event', (context, event) => {
        
        this.executeHandlers(16, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton4Event', (context, event) => {
        
        this.executeHandlers(4, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton6hEvent', (context, event) => {
        
        this.executeHandlers(6, 'held')
        

	})

    .subscribedEventHandler('fakebutton6Event', (context, event) => {
        
        this.executeHandlers(6, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton13Event', (context, event) => {
        
        this.executeHandlers(13, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton3Event', (context, event) => {
        
        this.executeHandlers(3, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton10Event', (context, event) => {
        
        this.executeHandlers(10, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton1Event', (context, event) => {
        
        this.executeHandlers(1, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton8hEvent', (context, event) => {
        
        this.executeHandlers(8, 'held')
        

	})

    .subscribedEventHandler('fakebutton2hEvent', (context, event) => {
        
        this.executeHandlers(2, 'held')
        

	})

    .subscribedEventHandler('fakebutton11Event', (context, event) => {
        
        this.executeHandlers(11, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton15Event', (context, event) => {
        
        this.executeHandlers(15, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton14Event', (context, event) => {
        
        this.executeHandlers(14, 'pushed')
        

	})

    .subscribedEventHandler('fakebutton7Event', (context, event) => {
        
        this.executeHandlers(7, 'pushed')
        

	})
