<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://jdi.company
 * @since             1.0.0
 * @package           Ninja_Forms_Spn_Addon
 *
 * @wordpress-plugin
 * Plugin Name:       Ninja Forms SPN Addon
 * Plugin URI:        https://ninjaforms.com/?utm_source=Ninja+Forms+Plugin&utm_medium=readme
 * Description:       Ninja Forms Smart Phone Number Addon is a plugin to add country flag to the Phone Number field.
 * Version:           1.0.0
 * Author:            JDI
 * Author URI:        https://jdi.company
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       ninja-forms-spn-addon
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'NINJA_FORMS_SPN_ADDON_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-ninja-forms-spn-addon-activator.php
 */
function activate_ninja_forms_spn_addon() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-ninja-forms-spn-addon-activator.php';
	Ninja_Forms_Spn_Addon_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-ninja-forms-spn-addon-deactivator.php
 */
function deactivate_ninja_forms_spn_addon() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-ninja-forms-spn-addon-deactivator.php';
	Ninja_Forms_Spn_Addon_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_ninja_forms_spn_addon' );
register_deactivation_hook( __FILE__, 'deactivate_ninja_forms_spn_addon' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-ninja-forms-spn-addon.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_ninja_forms_spn_addon() {

	$plugin = new Ninja_Forms_Spn_Addon();
	$plugin->run();

}

run_ninja_forms_spn_addon();
