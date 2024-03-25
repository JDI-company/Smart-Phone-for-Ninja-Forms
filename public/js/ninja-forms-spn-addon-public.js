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
  new ITICountryCode().syncWithSPN()
}

// Initialize SPN functionality
initSPN()
