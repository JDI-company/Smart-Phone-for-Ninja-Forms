<?php

/**
 * Fired during plugin activation
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 * @author     JDI <yaroslav.borodii@jdi.company>
 */
class Ninja_Forms_Spn_Addon_Activator {

	/**
	 * Activate function
	 *
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		if ( version_compare( PHP_VERSION, '7.1', '<=' ) ) {
			wp_die( esc_html__( 'This plugin requires PHP Version 7.1 or greater.', 'ninja-forms-spn-addon' ) );
		}

		self::maybe_activation_is_wrong();
	}

	/**
	 * Check if Ninja Forms is installed and activated
	 *
	 * @deprecated Since 2.0 use Introducing Plugin Dependencies in WordPress 6.5
	 * @see https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/51
	 */
	public static function maybe_activation_is_wrong() {
		if ( ! class_exists( 'Ninja_Forms' ) ) {
			wp_die( esc_html__( 'Ninja Forms SPN Addon was not activated. Ninja Forms should be installed and activated.', 'ninja-forms-spn-addon' ) );
		}
	}
}
