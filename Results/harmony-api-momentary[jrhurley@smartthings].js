
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this momentary switch is activated', section => {
            section.deviceSetting('theSwitch').capability(['momentary']).name('');

        });


        page.section('Send commands to this Harmony API server', section => {

        });


        page.section('''', section => {

        });


        page.section('', section => {
            section.textSetting('commandOn1').name('Command 1');
            section.textSetting('commandOn2').name('Command 2');
            section.textSetting('commandOn3').name('Command 3');
            section.textSetting('commandOn4').name('Command 4');
            section.textSetting('commandOn5').name('Command 5');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonPressHandler', (context, event) => {
        
        console.log('Button press handler')
        this.loopThroughCommands([ commandOn1 , commandOn2 , commandOn3 , commandOn4 , commandOn5 ])
        console.log('End of handler.')
        

	})
