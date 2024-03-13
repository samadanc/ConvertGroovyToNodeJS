
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Close if garage door is open...', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which Sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which Door?');
        });

        page.section('Sunset offset (optional)...', section => {
            section.numberSetting('sunsetOffsetValue').name('Minutes');
            section.enumSetting('sunsetOffsetDir').name('Before or After');
        });

        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');
        });

        // New section for light sensor configuration
        page.section('Light level check...', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('Ambient Light Sensor');
        });

    })

    .updated(async (context, updateData) => {
        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')
        // Subscribe to light sensor events
        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'lightLevelHandler')
    })

    .subscribedEventHandler('sunsetTimeHandler', async (context, event) => {
        console.log("Sunset event: ", event.date)
        // Check if light level is already handled in `lightLevelHandler`, if not, check the current light level
        if (!context.api.isLightLevelChecked) {
            await checkLightLevelAndCloseGarage(context);
        }
    })

    .subscribedEventHandler('lightLevelHandler', async (context, event) => {
        // Implement logic based on the light level
        await checkLightLevelAndCloseGarage(context);
    })

    // New function to check light level and close the garage
    async function checkLightLevelAndCloseGarage(context) {
        // Example: Check if the light level is below a certain threshold
        const lightLevel = await context.api.devices.getState(context.config.lightSensor);
        if (lightLevel.illuminance < 50) { // Assuming 50 is the threshold for "dark"
            // Close the garage if it's dark enough
            context.api.devices.sendCommands(context.config.doorSwitch, 'switch', 'on'); // Adjust command as necessary
            console.log("Closing garage due to low light level.");
        } else {
            console.log("Not closing garage, light level too high.");
        }
    }
