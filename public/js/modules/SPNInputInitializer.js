/**
 * Class to work with Smart Phone Number Input in DOM.
 *
 * @since 1.2.0
 */

import { IntlTelInputInitializer } from './ITIInitializer'

/**
 * Class representing SPNInput functionality.
 */
class SPNInput {
  /**
   * Initialize SPNInput instance and listen to the 'render:view' event.
   */
  init () {
    this._listenTo(Backbone.Radio.channel('form'), 'render:view', this.initInputOnFormLoad)
  }

  /**
   * Initialize input elements when form is loaded.
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initInputOnFormLoad (model) {
    // Get the parent element of the model's view
    const $parentElement = jQuery(model.el)

    // Initialize intlTelInput on the parent element
    /* eslint-disable no-new */
    new IntlTelInputInitializer($parentElement).init()

    // Initialize input elements when form is submitted
    this._initInputOnFormSubmit($parentElement)
  }

  /**
   * Set up a MutationObserver to detect changes in the DOM and re-initialize intlTelInput.
   * @param {jQuery} $parentElement - The parent element of the form input.
   * @private
   */
  _initInputOnFormSubmit ($parentElement) {
    const targetNode = $parentElement.parent()[0]
    const observer = new MutationObserver(function (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
        /* eslint-disable no-new */
          new IntlTelInputInitializer($parentElement).init()
        }
      }
    })

    const config = { attributes: true, childList: true, subtree: true }
    observer.observe(targetNode, config)
  }

  /**
   * Start listening to events on the given channel.
   * @param {Backbone.Radio.Channel} channel - The channel to listen to.
   * @param {string} event - The event to listen for.
   * @param {Function} callback - The callback to execute when the event is triggered.
   * @private
   */
  _listenTo (channel, event, callback) {
    channel.on(event, callback.bind(this))
  }
}

/**
 * SPNInput export
 * @type {SPNInput}
 */
export { SPNInput }
