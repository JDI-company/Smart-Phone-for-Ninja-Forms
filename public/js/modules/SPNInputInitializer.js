/**
 * Class to work with Smart Phone Number Input in DOM.
 *
 * @since 1.2.0
 */

import { IntlTelInputInitializer } from './ITIInitializer'
import $ from 'jquery'

/**
 * Class representing SPNInput functionality.
 */
class SPNInput {
  /**
   * Initialize SPNInput instance and listen to the 'render:view' event.
   */
  init () {
    this._listenTo(Backbone.Radio.channel('form'), 'render:view', this.initInputOnFormLoad)
    this._listenTo(Backbone.Radio.channel('forms'), 'submit:response', this._initInputOnFormSubmit)
    nfRadio.channel( 'nfMP' ).on( 'change:part', this.initInputOnFormLoad)
  }

  /**
   * Initialize input elements when form is loaded.
   * @param {Backbone.Model} model - The model whose view has just been rendered.
   */
  initInputOnFormLoad (model) {
    // Get the parent element of the model's view
    let parentElementId = model.el

    if('formModel' in model && !parentElementId){
      parentElementId = '#nf-form-' + model.formModel.id + '-cont'
    }

    // Initialize intlTelInput on the parent element
    /* eslint-disable no-new */
    new IntlTelInputInitializer(parentElementId).init()
    
  }

  /**
   * Initialize input elements when form is submitted
   * We are starting Mutation Observer when user submits form
   * Then, if no errors were found we are looking for the initiator
   * It's a tag of the target mutation. When we get NF Wrapper
   * we call IntlTelInputInitializer class.
   *
   * @param {jQuery} $parentElement - The parent element of the form input.
   * @private
   */
  _initInputOnFormSubmit (response) {
    if (response.errors.length > 0) {
      return
    }

    const data = response.data
    const targetNode = document.body
    const initiator = 'NF-FIELDS-WRAP'
    const _this = this

    const observer = new MutationObserver(function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          if (mutation.target.tagName === initiator) {
            const $parentElement = _this._getNFNode(data.form_id)
            if ($parentElement) {
              /* eslint-disable no-new */
              new IntlTelInputInitializer($parentElement).init()
            }

            // Stop the observer
            observer.disconnect()
          }
        }
      }
    })

    const config = { childList: true, subtree: true }
    observer.observe(targetNode, config)
  }

  /**
   * Get Ninja Forms Node (the main wrapper)
   * @param {string} formID Ninja Form ID
   * @returns jQuery
   * @private
   */
  _getNFNode (formID) {
    return $(`#nf-form-${formID}-cont`)
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
