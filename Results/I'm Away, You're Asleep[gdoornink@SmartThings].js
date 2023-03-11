
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Greg', section => {
            section.deviceSetting('gregHomeSensor').capability(['presenceSensor']).name('Home Sensor');
            section.deviceSetting('gregAwakeSensor').capability(['switch']).name('Awake Sensor');

        });


        page.section('Tiffany', section => {
            section.deviceSetting('tiffanyHomeSensor').capability(['presenceSensor']).name('Home Sensor');
            section.deviceSetting('tiffanyAwakeSensor').capability(['switch']).name('Awake Sensor');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.gregHomeSensor, 'presenceSensor', 'presence', 'changeDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tiffanyAwakeSensor, 'switch', 'presence', 'changeDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.gregAwakeSensor, 'switch', 'presence', 'changeDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tiffanyHomeSensor, 'presenceSensor', 'presence', 'changeDetectedHandler')

    })

    .subscribedEventHandler('changeDetectedHandler', (context, event) => {
        
        if
        console.log('Greg is not home.')
        if
        console.log('Tiffany is not home.')
        location.setMode('Away')
        } else {
        if 
        console.log('Tiffany is asleep.')
        location.setMode('Night')
        } else {
        console.log('Tiffany is home and awake.')
        location.setMode('Home')
        }
        }
        } else {
        if
        console.log('Greg is asleep.')
        if
        console.log('Tiffany is not home.')
        location.setMode('Night')
        } else {
        if 
        console.log('Tiffany is asleep.')
        location.setMode('Night')
        } else {
        console.log('Tiffany is home and awake.')
        location.setMode('Home')
        }
        }
        } else {
        console.log('Greg is home and awake.')
        if
        console.log('Tiffany is not home.')
        location.setMode('Home')
        } else {
        if 
        console.log('Tiffany is asleep.')
        location.setMode('Home')
        } else {
        console.log('Tiffany is home and awake.')
        location.setMode('Home')
        }
        }
        }
        }
        

	})
