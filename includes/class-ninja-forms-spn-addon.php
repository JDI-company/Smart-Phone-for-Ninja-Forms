<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 * @author     JDI <yaroslav.borodii@jdi.company>
 */
class Ninja_Forms_Spn_Addon {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Ninja_Forms_Spn_Addon_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'NINJA_FORMS_SPN_ADDON_VERSION' ) ) {
			$this->version = NINJA_FORMS_SPN_ADDON_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'ninja-forms-spn-addon';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->check_ninja_form_deactivation();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Ninja_Forms_Spn_Addon_Loader. Orchestrates the hooks of the plugin.
	 * - Ninja_Forms_Spn_Addon_i18n. Defines internationalization functionality.
	 * - Ninja_Forms_Spn_Addon_Admin. Defines all hooks for the admin area.
	 * - Ninja_Forms_Spn_Addon_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-ninja-forms-spn-addon-loader.php';

		/**
		 * TODO
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-ninja-forms-spn-addon-utils.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-ninja-forms-spn-addon-i18n.php';

		/**
		 * TODO
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-ninja-forms-spn-addon-countries-handler.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/class-ninja-forms-spn-addon-admin.php';

		/**
		 * TODO
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/ninja-forms-builder-templates/class-spn-builder-templates.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'public/class-ninja-forms-spn-addon-public.php';

		$this->loader = new Ninja_Forms_Spn_Addon_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Ninja_Forms_Spn_Addon_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Ninja_Forms_Spn_Addon_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin             = new Ninja_Forms_Spn_Addon_Admin( $this->get_plugin_name(), $this->get_version() );
		$plugin_public            = new Ninja_Forms_Spn_Addon_Public( $this->get_plugin_name(), $this->get_version() );
		$plugin_builder_templates = new SPN_Builder_Templates();

		// Styles and scripts
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		// Ninja Forms Actions
		$this->loader->add_action( 'ninja_forms_builder_templates', $plugin_builder_templates, 'add_templates' );

		// Ninja Forms Filters
		$this->loader->add_filter( 'ninja_forms_register_fields', $plugin_admin, 'register_fields' );
		$this->loader->add_filter( 'ninja_forms_field_template_file_paths', $plugin_public, 'register_template_path' );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Ninja_Forms_Spn_Addon_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Ninja_Forms_Spn_Addon_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

	public function check_ninja_form_deactivation() {
		if ( strpos( $_SERVER['REQUEST_URI'], '/wp-admin/plugins.php?action=deactivate&plugin=ninja-forms%2Fninja-forms.php' ) !== false ) {
			deactivate_plugins( plugin_dir_path( __DIR__ ) . $this->plugin_name . '.php' );
		}
	}

}
