( function ( mw, document ) {
    var storageKey = 'DarkModeEnabled';

    function getInitialState() {
        var userPref = mw.user.options && mw.user.options.get( 'darkmode-enabled' );
        if ( userPref === 1 || userPref === true ) {
            return true;
        }
        if ( userPref === 0 || userPref === false ) {
            return false;
        }

        var stored = mw.storage.get( storageKey );
        if ( stored === '1' ) {
            return true;
        }
        if ( stored === '0' ) {
            return false;
        }

        return window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
    }

    function persistState( enabled ) {
        mw.storage.set( storageKey, enabled ? '1' : '0' );
    }

    function applyState( enabled ) {
        document.documentElement.classList.toggle( 'client-darkmode', enabled );
    }

    function toggleButton( state, onToggle ) {
        var label = mw.message( 'darkmode-toggle-label' ).text();
        var button = document.createElement( 'button' );
        button.className = 'darkmode-toggle';
        button.type = 'button';
        button.setAttribute( 'aria-pressed', state ? 'true' : 'false' );
        button.textContent = state ? label + ': on' : label + ': off';

        button.addEventListener( 'click', function () {
            state = !state;
            button.setAttribute( 'aria-pressed', state ? 'true' : 'false' );
            button.textContent = state ? label + ': on' : label + ': off';
            onToggle( state );
        } );

        return button;
    }

    function injectToggle( state, onToggle ) {
        var portlet = document.getElementById( 'p-personal' ) || document.getElementById( 'footer' );
        if ( !portlet ) {
            return;
        }

        var container = document.createElement( 'div' );
        container.className = 'darkmode-toggle-container';
        container.appendChild( toggleButton( state, onToggle ) );

        portlet.appendChild( container );
    }

    mw.loader.using( [ 'mediawiki.user', 'mediawiki.util', 'mediawiki.storage' ] ).then( function () {
        var enabled = getInitialState();
        applyState( enabled );

        injectToggle( enabled, function ( nextState ) {
            enabled = nextState;
            applyState( enabled );
            persistState( enabled );
        } );
    } );
}( mediaWiki, document ) );
