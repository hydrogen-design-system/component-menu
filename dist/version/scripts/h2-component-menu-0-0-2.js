// Hydrogen / Component / Scripts

// Focusable Items
function h2ComMenFocusable002(focusElement) {
    return (focusElement.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
}

// "hasAttr" Function
$.fn.h2ComMenHasAttr002 = function (name) {
    var attr = $(this).attr(name);
    return (typeof attr !== typeof undefined && attr !== false);
};

// Mobile Menu Scripts

    // Mobile Menu Tabbing

        // Tab Loop Function
        function h2ComMenMobileTabLoop002(e, menuItems, menuItemCount) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9 && !e.shiftKey) {
                e.preventDefault();
                var currentFocus = document.activeElement;
                $(menuItems).each(function() {
                    if (currentFocus == this) {
                        var currentIndex = $(menuItems).index($(this));
                        var nextItemIndex = currentIndex + 1;
                        if (nextItemIndex > menuItemCount) {
                            menuItems[0].focus();
                        } else {
                            menuItems[nextItemIndex].focus();
                        }
                    }
                });
            }
            else if (keyCode == 9 && e.shiftKey) {
                e.preventDefault();
                var currentFocus = document.activeElement;
                $(menuItems).each(function() {
                    if (currentFocus == this) {
                        var currentIndex = $(menuItems).index($(this));
                        var previousItemIndex = currentIndex - 1;
                        if (previousItemIndex < 0) {
                            menuItems[menuItemCount].focus();
                        } else {
                            menuItems[previousItemIndex].focus();
                        }
                    }
                });
            }
        }

        // Tab Loop Trigger
        function h2ComMenMobileMenuTabLoopTrigger002(menuItems) {
            // Trigger the tab loop event listener on the menu items.
            var menuItemCount = $(menuItems).length - 1; // Checks the number of menu items in the array.
            $(menuItems).on("keydown.mobilemenutabloop", function(e) {
                h2ComMenMobileTabLoop002(e, menuItems, menuItemCount);
            });
        }
    
    // Mobile Menu Escape Events

        // Escape Function
        function h2ComMenMobileMenuEscape002(e, trigger, menu, menuItems) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 27) {
                // Remove the current submenu's tab loop and escape event listeners.
                $(menuItems).off("keydown.mobilemenutabloop");
                $(menuItems).off("keydown.mobilemenuescape");
                // Disable the menu.
                $(menu).removeClass("h2-mobile-menu-active");
                // Remove the active class and aria attributes from the mobile trigger.
                $(trigger).removeClass("h2-active").attr("aria-expanded", "false");
                // Re-enable scrolling on the body element.
                $("body").removeClass("h2-mobile-menu-body-lock");
                // Focus the submenu's trigger.
                $(trigger)[0].focus();
            }
        }

        // Escape Trigger
        function h2ComMenMobileMenuEscapeTrigger002(trigger, menu, menuItems) {
            // Trigger the escape event listener on the submenu items.
            $(menuItems).on("keydown.mobilemenuescape", function(e) {
                h2ComMenMobileMenuEscape002(e, trigger, menu, menuItems);
            });
        }

    // Mobile Menu Trigger

        // Trigger Function
        function h2ComMenMobileMenuToggle002(trigger) {
            // Create a variable for the menu.
            var menu = $("[data-h2-menu-wrapper-0-0-2] [data-h2-menu]");
            // Find available menu items and buttons.
            var menuItems = [];
            $(menu).children("[data-h2-main-menu]").children("li").each(function() {
                if ($(this).children("[role='menuitem']")) {
                    menuItems = $(menuItems).add($(this).children("[role='menuitem']"));
                }
                if ($(this).children("[data-h2-submenu-trigger]")) {
                    menuItems = $(menuItems).add($(this).children("[data-h2-submenu-trigger]"));
                }
            });
            menuItems = $(menuItems).add($(trigger));
            // If the mobile trigger is active, close the menu.
            if ($(trigger).hasClass("h2-active")) {
                // Remove the tab loop and escape event listeners.
                $(menuItems).off("keydown.mobilemenutabloop");
                $(menuItems).off("keydown.mobilemenuescape");
                // Disable the menu.
                $(menu).removeClass("h2-mobile-menu-active");
                // Remove the active class and aria attributes from the mobile trigger.
                $(trigger).removeClass("h2-active").attr("aria-expanded", "false");
                // Re-enable scrolling on the body element.
                $("body").removeClass("h2-mobile-menu-body-lock");
            }
            // If the mobile trigger is inactive, open the menu.
            else {
                // Disable scrolling on the body element to prevent the user from losing their place on the page.
                $("body").addClass("h2-mobile-menu-body-lock");
                // Activate the mobile trigger.
                $(trigger).addClass("h2-active").attr("aria-expanded", "true");
                // Activate the menu.
                $(menu).addClass("h2-mobile-menu-active");
                // Enable the tab loop and escape event listeners
                h2ComMenMobileMenuTabLoopTrigger002(menuItems);
                h2ComMenMobileMenuEscapeTrigger002(trigger, menu, menuItems);
            }
        }

        // Event Listener
        $("[data-h2-menu-wrapper-0-0-2] [data-h2-mobile-menu-trigger]").on("click", function(e) {
            e.preventDefault();
            h2ComMenMobileMenuToggle002(this);
        });

    // Mobile Menu Page Anchor Handler
    // This script closes the menu and scrolls the user to the anchor if the menu item they've clicked on directs them to a point on their current page.
    function h2ComMenMobileMenuAnchorClick002(trigger) {
        if ($("[data-h2-menu-wrapper-0-0-2] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
            // Set anchor destination.
            var destination = $(trigger).attr("href");
            if (destination.match("^#")) {
                // Create a variable for the menu.
                var menu = $(trigger).closest("[data-h2-menu]");
                // Disable tab loop and escape handlers on submenus.
                $(menu).find("[data-h2-submenu] [role='menuitem']").off("keydown.submenutabloop");
                $(menu).find("[data-h2-submenu] [role='menuitem']").off("keydown.submenuescape");
                $(menu).find("[data-h2-submenu-trigger]").off("keydown.submenutabloop");
                $(menu).find("[data-h2-submenu-trigger]").off("keydown.submenuescape");
                // Disable tab loop and escape handlers on main menu.
                $(menu).find("[role='menuitem']").off("keydown.mobilemenutabloop");
                $(menu).find("[role='menuitem']").off("keydown.mobilemenuescape");
                $(menu).find("[data-h2-mobile-menu-trigger]").off("keydown.mobilemenutabloop");
                $(menu).find("[data-h2-mobile-menu-trigger]").off("keydown.mobilemenuescape");
                // Collapse all submenus.
                $(menu).find("[data-h2-submenu]").removeClass("h2-active");
                $(menu).find("li").removeClass("h2-active");
                // Disable the menu.
                $(menu).removeClass("h2-mobile-menu-active");
                // Remove the active class and aria attributes from the mobile trigger.
                $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
                // Re-enable scrolling on the body element.
                $("body").removeClass("h2-mobile-menu-body-lock");
            }
        }
    }

    $("[data-h2-menu-wrapper-0-0-2] [data-h2-menu] [role='menuitem']").on("click", function(e) {
        h2ComMenMobileMenuAnchorClick002(this);
    });

// Desktop Menu Scripts

    // Markup Layout Reference
    {/* <ul parentSubmenu>
        <li></li>
        <li parentMenuItem>
            <a></a>
            <button trigger></button>
            <ul submenu>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </li>
        <li></li>
    </ul> */}

    // Submenu Tab Loop
    function h2ComMenSubmenuTabLoop002(e, submenuItems, submenuItemCount) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9 && !e.shiftKey) {
            e.preventDefault();
            var currentFocus = document.activeElement;
            $(submenuItems).each(function() {
                if (currentFocus == this) {
                    var currentIndex = $(submenuItems).index($(this));
                    var nextItemIndex = currentIndex + 1;
                    if (nextItemIndex > submenuItemCount) {
                        submenuItems[0].focus();
                    } else {
                        submenuItems[nextItemIndex].focus();
                    }
                }
            });
        }
        else if (keyCode == 9 && e.shiftKey) {
            e.preventDefault();
            var currentFocus = document.activeElement;
            $(submenuItems).each(function() {
                if (currentFocus == this) {
                    var currentIndex = $(submenuItems).index($(this));
                    var previousItemIndex = currentIndex - 1;
                    if (previousItemIndex < 0) {
                        submenuItems[submenuItemCount].focus();
                    } else {
                        submenuItems[previousItemIndex].focus();
                    }
                }
            });
        }
    }

    function h2ComMenSubmenuTabLoopTrigger002(trigger, submenu) {
        // Create a list of submenu items.
        var submenuItems = []; // Creates an empty array.
        $(submenu).children("li").each(function() {
            if ($(this).children("[role='menuitem']")) {
                submenuItems = $(submenuItems).add($(this).children("[role='menuitem']"));
            }
            if ($(this).children("[data-h2-submenu-trigger]")) {
                submenuItems = $(submenuItems).add($(this).children("[data-h2-submenu-trigger]"));
            }
        });
        submenuItems = $(submenuItems).add($(trigger)); // Adds the submenu's trigger to the item array so that it can be tab targeted.

        // Trigger the tab loop event listener on the submenu items.
        var submenuItemCount = $(submenuItems).length - 1; // Checks the number of submenu items in the array.
        $(submenuItems).on("keydown.submenutabloop", function(e) {
            h2ComMenSubmenuTabLoop002(e, submenuItems, submenuItemCount);
        });

    }

    // Submenu Escape Loop
    function h2ComMenSubmenuEscape002(e, trigger, parentMenuItem, parentSubmenu, parentSubmenuTrigger, submenu, submenuItems) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 27) {
            // Remove the current submenu's tab loop and escape event listeners.
            $(submenuItems).off("keydown.submenutabloop");
            $(submenuItems).off("keydown.submenuescape");
            // Close the current submenu.
            $(parentMenuItem).removeClass("h2-active");
            $(trigger).attr("aria-expanded", "false");
            // Close all nested submenus.
            $(parentMenuItem).find("[data-h2-submenu]").removeClass("h2-active");
            $(parentMenuItem).find("li").removeClass("h2-active");
            // Focus the submenu's trigger.
            $(trigger)[0].focus();
            // Add the tab loop and escape event listeners to the parent submenu IF the parent is a submenu.
            if ($(parentSubmenu).h2ComMenHasAttr002("data-h2-submenu") == true) {
                h2ComMenSubmenuTabLoopTrigger002(parentSubmenuTrigger, parentSubmenu);
                h2ComMenSubmenuEscapeTrigger002(parentSubmenuTrigger);
            }
            // Otherwise check to see if the parent is the main menu.
            else if ($(parentSubmenu).closest("[data-h2-menu]").hasClass("h2-mobile-menu-active")) {
                // Get the main menu items.
                var menuItems = [];
                $(parentSubmenu).children("li").each(function() {
                    if ($(this).children("[role='menuitem']")) {
                        menuItems = $(menuItems).add($(this).children("[role='menuitem']"));
                    }
                    if ($(this).children("[data-h2-submenu-trigger]")) {
                        menuItems = $(menuItems).add($(this).children("[data-h2-submenu-trigger]"));
                    }
                });
                // Set the menu.
                var menu = $(parentSubmenu).closest("[data-h2-menu]");
                // Set the mobile menu trigger.
                var mobileTrigger = $(parentSubmenu).closest("[data-h2-menu-wrapper-0-0-2]").find("[data-h2-mobile-menu-trigger]");
                menuItems = $(menuItems).add($(mobileTrigger));
                // Enable the tab loop and escape event listeners.
                h2ComMenMobileMenuTabLoopTrigger002(menuItems);
                h2ComMenMobileMenuEscapeTrigger002(mobileTrigger, menu, menuItems);
            }
        }
    }

    function h2ComMenSubmenuEscapeTrigger002(trigger) {
        // Set hierarchy variables.
        var parentMenuItem = $(trigger).closest("li");
        var parentSubmenu = $(parentMenuItem).parent();
        var parentSubmenuTrigger = $(parentSubmenu).closest("li").children("[data-h2-submenu-trigger]");
        var submenu = $(parentMenuItem).children("[data-h2-submenu]");
        // Create list of submenu items.
        var submenuItems = [];
        $(submenu).children("li").each(function() {
            if ($(this).children("[role='menuitem']")) {
                submenuItems = $(submenuItems).add($(this).children("[role='menuitem']"));
            }
            if ($(this).children("[data-h2-submenu-trigger]")) {
                submenuItems = $(submenuItems).add($(this).children("[data-h2-submenu-trigger]"));
            }
        });
        submenuItems = $(submenuItems).add($(trigger));
        // Trigger the escape event listener on the submenu items.
        $(submenuItems).on("keydown.submenuescape", function(e) {
            h2ComMenSubmenuEscape002(e, trigger, parentMenuItem, parentSubmenu, parentSubmenuTrigger, submenu, submenuItems);
        });
    }

    // Submenu Trigger

        // Trigger Function
        function h2ComMenSubmenuToggle002(trigger) {
            
            var parentMenuItem = $(trigger).closest("li");
            var parentSubmenu = $(parentMenuItem).parent();
            var parentSubmenuTrigger = $(parentSubmenu).closest("li").children("[data-h2-submenu-trigger]");
            var submenu = $(parentMenuItem).children("[data-h2-submenu]");

            // If the submenu is active, close it.
            if ($(parentMenuItem).hasClass("h2-active")) {
                // Find its submenu items and remove their event handlers.
                var submenuItems = [];
                $(submenu).children("li").each(function() {
                    if ($(this).children("[role='menuitem']")) {
                        submenuItems = $(submenuItems).add($(this).children("[role='menuitem']"));
                    }
                    if ($(this).children("[data-h2-submenu-trigger]")) {
                        submenuItems = $(submenuItems).add($(this).children("[data-h2-submenu-trigger]"));
                    }
                });
                submenuItems = $(submenuItems).add($(trigger));
                // Turn off the current submenu's tab loop and escape listeners.
                $(submenuItems).off("keydown.submenutabloop");
                $(submenuItems).off("keydown.submenuescape");
                // Close the submenu.
                $(parentMenuItem).removeClass("h2-active");
                $(trigger).attr("aria-expanded", "false");
                // Close all nested submenus.
                $(parentMenuItem).find("[data-h2-submenu]").removeClass("h2-active");
                $(parentMenuItem).find("li").removeClass("h2-active");
                // Check to see if the parent is a submenu, and turn on tabbing.
                if ($(parentSubmenu).h2ComMenHasAttr002("data-h2-submenu") == true) {
                    h2ComMenSubmenuTabLoopTrigger002(parentSubmenuTrigger, parentSubmenu);
                    h2ComMenSubmenuEscapeTrigger002(parentSubmenuTrigger);
                }
                // Otherwise check to see if the parent menu is the main menu.
                else if ($(parentSubmenu).closest("[data-h2-menu]").hasClass("h2-mobile-menu-active")) {
                    // Get the main menu items.
                    var menuItems = [];
                    $(parentSubmenu).children("li").each(function() {
                        if ($(this).children("[role='menuitem']")) {
                            menuItems = $(menuItems).add($(this).children("[role='menuitem']"));
                        }
                        if ($(this).children("[data-h2-submenu-trigger]")) {
                            menuItems = $(menuItems).add($(this).children("[data-h2-submenu-trigger]"));
                        }
                    });
                    // Set the menu.
                    var menu = $(parentSubmenu).closest("[data-h2-menu]");
                    // Set the mobile menu trigger.
                    var mobileTrigger = $(parentSubmenu).closest("[data-h2-menu-wrapper-0-0-2]").find("[data-h2-mobile-menu-trigger]");
                    menuItems = $(menuItems).add($(mobileTrigger));
                    // Enable the tab loop and escape event listeners.
                    h2ComMenMobileMenuTabLoopTrigger002(menuItems);
                    h2ComMenMobileMenuEscapeTrigger002(mobileTrigger, menu, menuItems);
                }
            }
            // If the submenu isn't active, open it.
            else {
                // Remove the tab loop and escape event listeners on the parent submenu IF it's a submenu.
                if ($(parentSubmenu).h2ComMenHasAttr002("data-h2-submenu") == true) {
                    var submenuItems = [];
                    $(parentSubmenu).children("li").each(function() {
                        if ($(this).children("[role='menuitem']")) {
                            submenuItems = $(submenuItems).add($(this).children("[role='menuitem']"));
                        }
                        if ($(this).children("[data-h2-submenu-trigger]")) {
                            submenuItems = $(submenuItems).add($(this).children("[data-h2-submenu-trigger]"));
                        }
                    });
                    submenuItems = $(submenuItems).add($(parentSubmenuTrigger));
                    // Turn off the parent submenu's tab loop and escape listeners.
                    $(submenuItems).off("keydown.submenutabloop");
                    $(submenuItems).off("keydown.submenuescape");
                } 
                // Otherwise check to see if the parent menu is the main menu.
                else if ($(parentSubmenu).closest("[data-h2-menu]").hasClass("h2-mobile-menu-active")) {
                    // Get the main menu items.
                    var menuItems = [];
                    $(parentSubmenu).children("li").each(function() {
                        if ($(this).children("[role='menuitem']")) {
                            menuItems = $(menuItems).add($(this).children("[role='menuitem']"));
                        }
                        if ($(this).children("[data-h2-submenu-trigger]")) {
                            menuItems = $(menuItems).add($(this).children("[data-h2-submenu-trigger]"));
                        }
                    });
                    // Set the mobile menu trigger.
                    var mobileTrigger = $(parentSubmenu).closest("[data-h2-menu-wrapper-0-0-2]").find("[data-h2-mobile-menu-trigger]");
                    menuItems = $(menuItems).add($(mobileTrigger));
                    // Remove the tab loop and escape event listeners.
                    $(menuItems).off("keydown.mobilemenutabloop");
                    $(menuItems).off("keydown.mobilemenuescape");
                }
                // Open the submenu.
                $(trigger).attr("aria-expanded", "true");
                $(parentMenuItem).addClass("h2-active");
                $(submenu).addClass("h2-active");
                // Add the tab loop event listeners to the newly opened submenu.
                h2ComMenSubmenuTabLoopTrigger002(trigger, submenu);
                // Add the escape event listeners to the newly opened submeny.
                h2ComMenSubmenuEscapeTrigger002(trigger);
            }

        }

        // Trigger Event
        $("[data-h2-menu-wrapper-0-0-2] [data-h2-submenu-trigger]").on("click.submenutrigger", function(e) {
            e.preventDefault();
            h2ComMenSubmenuToggle002(this);
        });