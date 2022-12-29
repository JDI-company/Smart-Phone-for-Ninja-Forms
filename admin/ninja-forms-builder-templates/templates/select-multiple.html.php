<script id="tmpl-nf-edit-setting-select-multiple" type="text/template">
    <label for="{{{ data.name }}}" class="nf-select-multiple">{{{ data.label }}} {{{ data.renderTooltip() }}}
        <select id="{{{ data.name }}}" class="setting" multiple>
            <#
            _.each( data.options, function( option ) {
                #>
                <option value="{{{ option.value }}}" {{{ ( data.value.includes( option.value ) ) ? 'selected = "selected"' : '' }}}>{{{ option.label }}}</option>
                <#
            } );
            #>
        </select>
    </label>
</script>
