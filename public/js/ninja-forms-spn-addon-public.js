'use strict'

/**
 * Ninja Forms SPN Addon Public JavaScript Code (Front-end)
 *
 * @since 1.0.0
 */
import { SPNInput } from './modules/SPNInputInitializer.js'
import { ITICountryCode } from './modules/ITICountryCode.js'

function initSPN () {
  /* eslint-disable no-new */
  new SPNInput().init()

  /* eslint-disable no-new */
  const itiCountryCode = new ITICountryCode()
  itiCountryCode.syncWithSPN()
  itiCountryCode.setCountryCodeByIP()
}

// Initialize SPN functionality
initSPN()
