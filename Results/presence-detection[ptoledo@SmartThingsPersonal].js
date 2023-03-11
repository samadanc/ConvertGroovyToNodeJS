
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set the sensors', section => {
            section.deviceSetting('sensorEntrada').capability(['motionSensor']).name('Pick your Entrada sensors');
            section.deviceSetting('sensorLiving').capability(['motionSensor']).name('Pick your Living sensors');
            section.deviceSetting('sensorCocina').capability(['motionSensor']).name('Pick your Cocina sensors');
            section.deviceSetting('sensorPasillo').capability(['motionSensor']).name('Pick your Pasillo sensors');
            section.deviceSetting('sensorEstudio').capability(['motionSensor']).name('Pick your Estudio sensors');
            section.deviceSetting('sensorComputador').capability(['switch']).name('Pick your Computador sensors');
            section.deviceSetting('sensorBanoi').capability(['motionSensor']).name('Pick your Baño Invitado sensors');
            section.deviceSetting('sensorDormitorio').capability(['motionSensor']).name('Pick your Dormitorio sensors');
            section.deviceSetting('sensorCloset').capability(['motionSensor']).name('Pick your Closet sensors');
            section.deviceSetting('sensorBanop').capability(['motionSensor']).name('Pick your Baño Principal sensors');
            section.deviceSetting('sensorPersonas').capability(['presenceSensor']).name('Pick your Personas sensors');

        });


        page.section('Set the information flag switches', section => {
            section.deviceSetting('presenceSwitchEntrada').capability(['switch']).name('Pick your Entrada switch');
            section.deviceSetting('presenceSwitchLiving').capability(['switch']).name('Pick your Living switch');
            section.deviceSetting('presenceSwitchCocina').capability(['switch']).name('Pick your Cocina switch');
            section.deviceSetting('presenceSwitchPasillo').capability(['switch']).name('Pick your Pasillo switch');
            section.deviceSetting('presenceSwitchEstudio').capability(['switch']).name('Pick your Estudio switch');
            section.deviceSetting('presenceSwitchBanoi').capability(['switch']).name('Pick your Baño Invitado switch');
            section.deviceSetting('presenceSwitchDormitorio').capability(['switch']).name('Pick your Dormitorio switch');
            section.deviceSetting('presenceSwitchCloset').capability(['switch']).name('Pick your Closet switch');
            section.deviceSetting('presenceSwitchBanop').capability(['switch']).name('Pick your Baño Principal switch');
            section.deviceSetting('presenceSwitchOutside').capability(['switch']).name('Pick your Outside switch');

        });


        page.section('Shut-down triggering', section => {
            section.numberSetting('outsideDelay').name('Set outside delay time');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensorCloset, 'motionSensor', 'motion', 'motionCloset')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorEntrada, 'motionSensor', 'motion', 'motionEntrada')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorBanoi, 'motionSensor', 'motion', 'motionBanoi')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorEstudio, 'motionSensor', 'motion', 'motionEstudio')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorDormitorio, 'motionSensor', 'motion', 'motionDormitorio')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorBanop, 'motionSensor', 'motion', 'motionBanop')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorCocina, 'motionSensor', 'motion', 'motionCocina')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorLiving, 'motionSensor', 'motion', 'motionLiving')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorComputador, 'switch', 'switch', 'motionEstudio')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorPasillo, 'motionSensor', 'motion', 'motionPasillo')

    })

    .subscribedEventHandler('motionPasillo', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Pasillo')
        }
        

	})

    .subscribedEventHandler('motionBanoi', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Baño I.')
        }
        

	})

    .subscribedEventHandler('motionBanop', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Baño P.')
        }
        

	})

    .subscribedEventHandler('motionCocina', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Cocina')
        }
        

	})

    .subscribedEventHandler('motionDormitorio', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Dormitorio')
        }
        

	})

    .subscribedEventHandler('motionCloset', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Closet')
        }
        

	})

    .subscribedEventHandler('motionEstudio', (context, event) => {
        
        if (event.value == 'active' || event.value == 'on') {
        this.motionEvent('Presencia Estudio')
        }
        

	})

    .subscribedEventHandler('motionLiving', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Living')
        }
        

	})

    .subscribedEventHandler('motionEntrada', (context, event) => {
        
        if (event.value == 'active') {
        this.motionEvent('Presencia Entrada')
        }
        

	})
