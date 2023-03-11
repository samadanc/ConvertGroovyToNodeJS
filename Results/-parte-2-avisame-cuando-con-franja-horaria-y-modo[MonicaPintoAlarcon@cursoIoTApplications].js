
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Elige el sensor de presencia...', section => {
            section.deviceSetting('presencia').capability(['presenceSensor']).name('Llegada/Marcha de');

        });


        page.section('Envia este mensaje cuando alguien llega (opcional, envia un mensaje estandar si este no se especifica)', section => {
            section.textSetting('textoMensajeLlegada').name('Texto del Mensaje');

        });


        page.section('Envia este mensaje cuando alguien se marcha (opcional, envia un mensaje estandar si este no se especifica)', section => {
            section.textSetting('textoMensajeMarcha').name('Texto del Mensaje');

        });


        page.section('Elige la franja horaria', section => {
            section.timeSetting('horaInicio').name('Hora de inicio');
            section.timeSetting('horaFin').name('Hora de finalizacion');

        });


        page.section(''Elige el modo o modos en el que recibir las notificaciones'', section => {

        });


    })
