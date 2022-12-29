<?php

/**
 * Define the utils
 *
 * @link       https://jdi.company
 * @since      1.0.0
 *
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 */

/**
 * Define the utils
 *
 * @since      1.0.0
 * @package    Ninja_Forms_Spn_Addon
 * @subpackage Ninja_Forms_Spn_Addon/includes
 * @author     JDI <yaroslav.borodii@jdi.company>
 */
class Ninja_Forms_Spn_Addon_Utils {

	/**
	 * This function replaces the keys of an associate array by those supplied in the keys array
	 *
	 * @param $array target associative array in which the keys are intended to be replaced
	 * @param $keys associate array where search key => replace by key, for replacing respective keys
	 * @return  array with replaced keys
	 */
	public static function array_replace_keys( $array, $keys ) {
		foreach ( $keys as $search => $replace ) {
			if ( isset( $array[ $search ] ) ) {
				$array[ $replace ] = $array[ $search ];
				unset( $array[ $search ] );
			}
		}

		return $array;
	}

}
