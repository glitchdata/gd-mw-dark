<?php

namespace MediaWiki\Extension\DarkMode;

use MediaWiki\Output\Hook\BeforePageDisplayHook;
use MediaWiki\Preferences\Hook\GetPreferencesHook;
use OutputPage;
use Skin;
use User;

class Hooks implements BeforePageDisplayHook, GetPreferencesHook {
    public function onBeforePageDisplay( OutputPage $out, Skin $skin ): void {
        $out->addModuleStyles( [ 'ext.darkMode.styles' ] );
        $out->addModules( [ 'ext.darkMode.scripts' ] );
    }

    public function onGetPreferences( User $user, array &$preferences ): void {
        $preferences['darkmode-enabled'] = [
            'type' => 'toggle',
            'label-message' => 'darkmode-pref-label',
            'help-message' => 'darkmode-pref-help',
            'section' => 'rendering/colors'
        ];
    }
}
