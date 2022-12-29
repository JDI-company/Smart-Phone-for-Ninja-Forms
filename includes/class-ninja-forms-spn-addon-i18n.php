<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 * @author     JDI <yaroslav.borodii@jdi.company>
 */
class Ninja_Forms_Spn_Addon_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'ninja-forms-spn-addon',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
