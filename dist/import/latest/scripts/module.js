// Hydrogen / Component / Scripts

import $ from "cash-dom"

// "hasAttr" Function
$.fn.h2ComMenHasAttr = function (name) {
  var attr = $(this).attr(name);
  return (typeof attr !== typeof undefined && attr !== false);
};

// Toggle submenu.

  // Open script.
  function h2ComMenOpenSubmenu(menuItem, subMenuTrigger) {
    // Open the submenu.
    $(menuItem).parent().addClass("h2-active");
    $(menuItem).attr("aria-expanded", "true");
    $(subMenuTrigger).attr("aria-expanded", "true");
    // Remove all event listeners.
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
    // Find submenu and it's items.
    var subMenuItems = [];
    $(menuItem).siblings("[data-h2-menulist]").children("li").each(function() {
      if ($(this).children("[role='menuitem']")) {
        subMenuItems = $(subMenuItems).add($(this).children("[role='menuitem']"));
      }
      if ($(this).children("[data-h2-submenu-trigger]")) {
        subMenuItems = $(subMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
      }
    });
    subMenuItems = $(subMenuItems).add($(subMenuTrigger));
    // Add event listeners.
    $(subMenuItems).on("keydown.rightArrow", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenRightTrigger(e, key, this);
    });
    $(subMenuItems).on("keydown.upDownArrow", function(e) {
      var key = e.keyCode || e.which;
      var itemCount = $(subMenuItems).length - 1;
      h2ComMenUpDownLoop(e, key, subMenuItems, itemCount);
    });
    $(subMenuItems).on("keydown.escape", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenEscapeTrigger(e, key, this);
    });
    // Focus first menu item.
    $(subMenuItems)[0].focus();
  }

  // Close script.
  function h2ComMenCloseSubmenu(menuItem, subMenuTrigger) {
    // Remove all event listeners.
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
    // Find parent menu and its items.
    var parentMenuItems = [];
    // Check to see if the main menu is the parent, and whether it is split.
    if ($(menuItem).parent().parent().parent().h2ComMenHasAttr("data-h2-menu-container") == true) {
      $(menuItem).parent().parent().parent().children("[data-h2-menulist]").each(function() {
        $(this).children("li").each(function() {
          if ($(this).children("[role='menuitem']")) {
            parentMenuItems = $(parentMenuItems).add($(this).children("[role='menuitem']"));
          }
          if ($(this).children("[data-h2-submenu-trigger]")) {
            parentMenuItems = $(parentMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
          }
        });
      });
    } 
    else {
      $(menuItem).parent().parent("[data-h2-menulist]").children("li").each(function() {
        if ($(this).children("[role='menuitem']")) {
          parentMenuItems = $(parentMenuItems).add($(this).children("[role='menuitem']"));
        }
        if ($(this).children("[data-h2-submenu-trigger]")) {
          parentMenuItems = $(parentMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
        }
      });
    }
    // Check to see if the parent is also a submenu, and add its trigger if necessary.
    if ($(menuItem).parent().parent("[data-h2-menulist]").parent().children("[data-h2-submenu-trigger]").length > 0) {
      // console.log("there's a trigger");
      parentMenuItems = $(parentMenuItems).add($(menuItem).parent().parent("[data-h2-menulist]").parent().children("[data-h2-submenu-trigger]"));
    } 
    else {
      // Since the parent is the main menu, check to see if it's mobile activated, and if it is, add the mobile menu trigger to the list.
      if ($("[data-h2-menu-wrapper] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
          parentMenuItems = $(parentMenuItems).add($("[data-h2-mobile-menu-trigger]"));
      }
    }
    // Add event listeners.
    $(parentMenuItems).on("keydown.rightArrow", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenRightTrigger(e, key, this);
    });
    $(parentMenuItems).on("keydown.upDownArrow", function(e) {
      var key = e.keyCode || e.which;
      var itemCount = $(parentMenuItems).length - 1;
      h2ComMenUpDownLoop(e, key, parentMenuItems, itemCount);
    });
    $(parentMenuItems).on("keydown.escape", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenEscapeTrigger(e, key, this);
    });
    // Close all nested submenus.
    $(menuItem).parent().find("[data-h2-menulist]").children("li").removeClass("h2-active");
    $(menuItem).parent().find("[role='menuitem']").attr("aria-expanded", "false");
    $(menuItem).parent().find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
    // Close the active submenu.
    $(menuItem).parent().removeClass("h2-active");
    $(menuItem).attr("aria-expanded", "false");
    $(subMenuTrigger).attr("aria-expanded", "false");
  }

  function h2ComMenToggleSubmenu(trigger) {
    // Define key elements in the menu item.
    var menuItem = "";
    var subMenuTrigger = "";
    if (trigger.getAttribute('role') === 'menuitem') {
      menuItem = trigger;
      subMenuTrigger = $(trigger).siblings("[data-h2-submenu-trigger]");
    } else {
      menuItem = $(trigger).siblings("[role='menuitem']");
      subMenuTrigger = trigger;
    }
    // Check if the parent <li> is active or not.
    if ($(trigger).parent().hasClass("h2-active")) {
      h2ComMenCloseSubmenu(menuItem, subMenuTrigger);
    } else {
      h2ComMenOpenSubmenu(menuItem, subMenuTrigger);
    }
  }

// Up/down arrow loop.
function h2ComMenUpDownLoop(e, key, items, itemCount) {
  // Next item
  if (key == 40) {
    e.preventDefault();
    var currentFocus = document.activeElement;
    $(items).each(function() {
      if (currentFocus == this) {
        var currentIndex = $(items).index($(this));
        var nextItemIndex = currentIndex + 1;
        if (nextItemIndex > itemCount) {
          items[0].focus();
        } else {
          items[nextItemIndex].focus();
        }
      }
    });
  }
  // Previous item.
  else if (key == 38) {
    e.preventDefault();
    var currentFocus = document.activeElement;
    $(items).each(function() {
      if (currentFocus == this) {
        var currentIndex = $(items).index($(this));
        var previousItemIndex = currentIndex - 1;
        if (previousItemIndex < 0) {
          items[itemCount].focus();
        } else {
          items[previousItemIndex].focus();
        }
      }
    });
  }
}

// Right Trigger to Open Submenu
function h2ComMenRightTrigger(e, key, trigger) {
  if (key == 39) {
    e.preventDefault();
    // Check to see if there's even a submenu to open.
    if ($(trigger).siblings("[data-h2-menulist]").length > 0) {
      if ($(trigger).parent().hasClass("h2-active")) {
        // Focus the submenu.
        // Define key elements in the menu item.
        var menuItem = "";
        var subMenuTrigger = "";
        if (trigger.getAttribute('role') === 'menuitem') {
          menuItem = trigger;
          subMenuTrigger = $(trigger).siblings("[data-h2-submenu-trigger]");
        } else {
          menuItem = $(trigger).siblings("[role='menuitem']");
          subMenuTrigger = trigger;
        }
        h2ComMenOpenSubmenu(menuItem, subMenuTrigger)
      } else {
        // Open the submenu.
        h2ComMenToggleSubmenu(trigger);
      }
    }
  }
}

// Left/Escape Trigger to Close Submenus
function h2ComMenEscapeTrigger(e, key, trigger) {
  if (key == 37 || key == 27) {
    e.preventDefault();
    // Set empty variables for key elements.
    var menuItem = "";
    var subMenuTrigger = "";
    var parent = "";
    // Check to see if trigger is a submenu item or the submenu's trigger (because this requires different DOM levels to be checked).
    if (trigger.getAttribute('role') === 'menuitem') {
      // console.log("You exited on a menu item.");
      // Check to see if you're trying to close the main menu.
      if ($(trigger).parent().parent().parent().h2ComMenHasAttr("data-h2-menu-container")) {
        // console.log("You're trying to close the main menu.");
        if ($("[data-h2-menu-wrapper] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
          var menu = $("[data-h2-menu-wrapper] [data-h2-menu]");
          // Remove event listeners from all menus.
          $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
          $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
          $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
          $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
          $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
          $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
          // Close all submenus.
          $(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
          $(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
          $(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
          // Close the main menu.
          $(menu).removeClass("h2-mobile-menu-active");
          $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
          $("body").removeClass("h2-mobile-menu-body-lock");
        }
      } 
      else {
        // Set the key elements based on this context.
        menuItem = $(trigger).parent().parent().siblings("[role='menuitem']");
        subMenuTrigger = $(trigger).parent().parent().siblings("[data-h2-submenu-trigger]");
        parent = $(trigger).parent().parent().parent().parent();
        // Close the submenu and focus the parent trigger.
        h2ComMenCloseSubmenu(menuItem, subMenuTrigger);
        $(subMenuTrigger)[0].focus();
      }
    } 
    else if (trigger.getAttribute('data-h2-submenu-trigger') === "") {
      // console.log("You exited on a submenu trigger.");
      // Figure out if the trigger was the parent one, or if it's one in the active menu by testing to see if the sibling submenu is active or not.
      if ($(trigger).parent().hasClass("h2-active")) {
        // console.log("This trigger is the parent trigger that opens the submenu you're trying to close.");
        // Set the key elements based on this context.
        menuItem = $(trigger).siblings("[role='menuitem']");
        subMenuTrigger = trigger;
        parent = $(trigger).parent().parent();
        // Close the submenu and focus the parent trigger.
        h2ComMenCloseSubmenu(menuItem, subMenuTrigger);
        $(subMenuTrigger)[0].focus();
      } 
      else {
        // console.log("This trigger is a trigger inside the open submenu.");
        // Check to see if you're trying to close the main menu.
        if ($(trigger).parent().parent().parent().h2ComMenHasAttr("data-h2-menu-container")) {
          // console.log("You're trying to close the main menu.");
          if ($("[data-h2-menu-wrapper] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
            var menu = $("[data-h2-menu-wrapper] [data-h2-menu]");
            // Remove event listeners from all menus.
            $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
            $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
            $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
            $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
            $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
            $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
            // Close all submenus.
            $(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
            $(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
            $(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
            // Close the main menu.
            $(menu).removeClass("h2-mobile-menu-active");
            $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
            $("body").removeClass("h2-mobile-menu-body-lock");
          }
        } 
        else {
          // console.log("You're closing a submenu.");
          // Set the key elements based on this context.
          menuItem = $(trigger).parent().parent().siblings("[role='menuitem']");
          subMenuTrigger = $(trigger).parent().parent().siblings("[data-h2-submenu-trigger]");
          parent = $(trigger).parent().parent().parent().parent();
          // Close the submenu and focus the parent trigger.
          h2ComMenCloseSubmenu(menuItem, subMenuTrigger);
          $(subMenuTrigger)[0].focus();
        }
      }
    }
  }
}

// Main menu tab exit trigger.
// This function closes all submenus and re-enables up/down, right, and left/escape key listeners if tab is pressed on any main menu items.
function h2ComMenMainTabExit(e, key, trigger) {
  // Close submenu function.
  // This is used by both the mobile and desktop logic.
  function closeSubmenus() {
    // Remove event listeners from all submenu items.
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
    // Close all submenus
    $(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
    $(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
    $(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
    // Get main menu items
    var resetMainMenuItems = [];
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      $(this).children("li").each(function() {
        if ($(this).children("[role='menuitem']")) {
          resetMainMenuItems = $(resetMainMenuItems).add($(this).children("[role='menuitem']"));
        }
        if ($(this).children("[data-h2-submenu-trigger]")) {
          resetMainMenuItems = $(resetMainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
        }
      });
    });
    // If the main menu is mobile activated, add the mobile menu trigger.
    if ($("[data-h2-menu-wrapper] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
      resetMainMenuItems = $(resetMainMenuItems).add($("[data-h2-mobile-menu-trigger]"));
    }
    // Enable listeners
    $(resetMainMenuItems).on("keydown.upDownArrow", function(e) {
      var key = e.keyCode || e.which;
      var itemCount = $(resetMainMenuItems).length - 1;
      h2ComMenUpDownLoop(e, key, resetMainMenuItems, itemCount);
    });
    $(resetMainMenuItems).on("keydown.rightArrow", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenRightTrigger(e, key, this, resetMainMenuItems);
    });
  }
  // If the menu is mobile activated, you need to close the main menu on tab out of the first or last items.
  if ($("[data-h2-menu-wrapper] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
    var menu = $("[data-h2-menu-wrapper] [data-h2-menu]");
    // Create an index of the main menu items, including the mobile trigger (this should be first in the order).
    var menuItemIndex = [];
    menuItemIndex = $(menuItemIndex).add($("[data-h2-menu-wrapper]").find(" [data-h2-mobile-menu-trigger]"));
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      $(this).children("li").each(function() {
        if ($(this).children("[role='menuitem']")) {
          menuItemIndex = $(menuItemIndex).add($(this).children("[role='menuitem']"));
        }
        if ($(this).children("[data-h2-submenu-trigger]")) {
          menuItemIndex = $(menuItemIndex).add($(this).children("[data-h2-submenu-trigger]"));
        }
      });
    });
    // Check to see if the item that was tabbed on is the first or last item in the list.
    var itemCount = $(menuItemIndex).length - 1;
    var currentIndex = $(menuItemIndex).index($(trigger));
    // If the item was the first item and they tabbed up, close the menu and submenus.
    if (currentIndex === 0) {
      // If they tabbed up...
      // console.log("you're on the first item in the menu.");
      if (key == 9 && e.shiftKey) {
        // Remove event listeners from all menus.
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
        // Close all submenus.
        $(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
        $(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
        $(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
        // Close the main menu.
        $(menu).removeClass("h2-mobile-menu-active");
        $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
        $("body").removeClass("h2-mobile-menu-body-lock");
      }
    }
    // If the item was the last menu item and they tabbed down, close the menu and submenus.
    else if (currentIndex == itemCount) {
      // If they tabbed down...
      // console.log("you're on the last item in the menu.");
      if (key == 9 && !e.shiftKey) {
        // Remove event listeners from all menus.
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
        // Close all submenus.
        $(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
        $(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
        $(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
        // Close the main menu.
        $(menu).removeClass("h2-mobile-menu-active");
        $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
        $("body").removeClass("h2-mobile-menu-body-lock");
      }
    } 
    // Otherwise, tab to the next item like normal and close submenus..
    else {
      if (key == 9 && !e.shiftKey || key == 9 && e.shiftKey) {
        closeSubmenus();
      }
    }
  } 
  // Otherwise, tab as normal while closing submenus.
  else {
    if (key == 9 && !e.shiftKey || key == 9 && e.shiftKey) {
      closeSubmenus();
    }
  }
}

// Mobile menu toggle script.
// This function opens or closes the main menu when on a narrow device.
function h2ComMenMobileMenuToggle(trigger) {
  var menu = $("[data-h2-menu-wrapper] [data-h2-menu]");
  // Close the menu.
  if ($(trigger).hasClass("h2-active")) {
    // Remove event listeners from all menus.
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
    // Close all submenus.
    $(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
    $(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
    $(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false");
    // Close the main menu.
    $(menu).removeClass("h2-mobile-menu-active");
    $(trigger).removeClass("h2-active").attr("aria-expanded", "false");
    $("body").removeClass("h2-mobile-menu-body-lock");
  }
  // Open the menu.
  else {
    // Open the main menu.
    $(menu).addClass("h2-mobile-menu-active");
    $(trigger).addClass("h2-active").attr("aria-expanded", "true");
    $("body").addClass("h2-mobile-menu-body-lock");
    // Remove event listeners from all menus.
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
    $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.mainTabExit");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.mainTabExit");
    // Get main menu items.
    var resetMainMenuItems = [];
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      $(this).children("li").each(function() {
        if ($(this).children("[role='menuitem']")) {
          resetMainMenuItems = $(resetMainMenuItems).add($(this).children("[role='menuitem']"));
        }
        if ($(this).children("[data-h2-submenu-trigger]")) {
          resetMainMenuItems = $(resetMainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
        }
      });
    });
    // Add mobile trigger to main menu items.
    resetMainMenuItems = $(resetMainMenuItems).add($(trigger));
    // Re-add up/down arrow listeners, left/escape listners.
    $(resetMainMenuItems).on("keydown.upDownArrow", function(e) {
      var key = e.keyCode || e.which;
      var itemCount = $(resetMainMenuItems).length - 1;
      h2ComMenUpDownLoop(e, key, resetMainMenuItems, itemCount);
    });
    $(resetMainMenuItems).on("keydown.escape", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenEscapeTrigger(e, key, this);
    });
    $(resetMainMenuItems).on("keydown.mainTabExit", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenMainTabExit(e, key, this);
    });
    // Get main menu items with submenus.
    var resetMainMenuItemsWithSubmenus = [];
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      $(this).children("li").each(function() {
        if ($(this).children("[data-h2-menulist]").length > 0) {
          if ($(this).children("[role='menuitem']")) {
            resetMainMenuItemsWithSubmenus = $(resetMainMenuItemsWithSubmenus).add($(this).children("[role='menuitem']"));
          }
          if ($(this).children("[data-h2-submenu-trigger]")) {
            resetMainMenuItemsWithSubmenus = $(resetMainMenuItemsWithSubmenus).add($(this).children("[data-h2-submenu-trigger]"));
          }
        }
      });
    });

    // Add right arrow event listener to main menu items with submenus.
    $(resetMainMenuItemsWithSubmenus).on("keydown.rightArrow", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenRightTrigger(e, key, this, resetMainMenuItemsWithSubmenus);
    });
    // Add tab listeners to tab out of the menu and close submenus.
    var resetAllMenuItems = [];
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menulist]").children("li").each(function() {
      if ($(this).children("[role='menuitem']")) {
        resetAllMenuItems = $(resetAllMenuItems).add($(this).children("[role='menuitem']"));
      }
      if ($(this).children("[data-h2-submenu-trigger]")) {
        resetAllMenuItems = $(resetAllMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
      }
    });
    // Add mobile trigger to main menu items.
    resetAllMenuItems = $(resetAllMenuItems).add($(trigger));

    $(resetAllMenuItems).on("keydown.mainTabExit", function(e) {
      var key = e.keyCode || e.which;
      h2ComMenMainTabExit(e, key, this);
    });
  }
}

// Mobile menu anchor navigation.
// This function closes the menu when a link is clicked that specifically takes the user to a point on their current page.
function h2ComMenMobileMenuAnchorClick(link) {
  if ($("[data-h2-menu-wrapper] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
    // Set anchor destination.
    var destination = $(link).attr("href");
    if (destination.match("^#")) {
      // Create a variable for the menu.
      var menu = $(link).closest("[data-h2-menu]");
      // Remove event listeners from all menus.
      $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
      $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
      $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
      $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
      $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
      $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
      // Close all submenus.
      $(link).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
      $(link).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
      $(link).closest("[data-h2-menu]").find("[data-h2-submenu-link]").attr("aria-expanded", "false");
      // Close the main menu.
      $(menu).removeClass("h2-mobile-menu-active");
      $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
      $("body").removeClass("h2-mobile-menu-body-lock");
    }
  } 
  else {
    // Set anchor destination.
    var destination = $(link).attr("href");
    if (destination.match("^#")) {
      var menuType = "";
      var menuAttr = $(link).closest("[data-h2-menu-wrapper]").attr("data-h2-menu-wrapper");
      if (menuAttr.includes("top(")) {
        menuType = "top";
      } else if (menuAttr.includes("side(")) {
        menuType = "side";
      }
      if (menuType == "top") {
        // Remove event listeners from all menus.
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
        // Close all submenus.
        $(link).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
        $(link).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
        $(link).closest("[data-h2-menu]").find("[data-h2-submenu-link]").attr("aria-expanded", "false");
      } else {
        console.log("You clicked an anchor!");
        // Remove event listeners from all menus.
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-menu] *").off("keydown.escape");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
        $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").off("keydown.escape");
        // Enable main menu.
        var mainMenus = $(link).closest("[data-h2-menu]").children("[data-h2-menulist]");
        // Up/Down
        var mainMenuItems = [];
        $(mainMenus).each(function() {
          $(this).children("li").each(function() {
            if ($(this).children("[role='menuitem']")) {
              mainMenuItems = $(mainMenuItems).add($(this).children("[role='menuitem']"));
            }
            if ($(this).children("[data-h2-submenu-trigger]")) {
              mainMenuItems = $(mainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
            }
          });
        });
        console.log(mainMenuItems);
        $(mainMenuItems).on("keydown.upDownArrow", function(e) {
          var key = e.keyCode || e.which;
          var itemCount = $(mainMenuItems).length - 1;
          h2ComMenUpDownLoop(e, key, mainMenuItems, itemCount);
        });
        // Right
        var mainMenuItemsWithSubmenu = [];
        $(mainMenus).each(function() {
          $(this).children("li").each(function() {
            if ($(this).children("[data-h2-menulist]").length > 0) {
              if ($(this).children("[role='menuitem']")) {
                mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[role='menuitem']"));
              }
              if ($(this).children("[data-h2-submenu-trigger]")) {
                mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[data-h2-submenu-trigger]"));
              }
            }
          });
        });
        $(mainMenuItemsWithSubmenu).on("keydown.rightArrow", function(e) {
          var key = e.keyCode || e.which;
          h2ComMenRightTrigger(e, key, this, mainMenuItemsWithSubmenu);
        });
      }
    }
  }
}

function h2ComMenAddUpDownToMainMenuItems(system) {

  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var mainMenuItems = [];
  if (system == null || system == "" || system == "latest") {
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      $(this).children("li").each(function() {
        if ($(this).children("[role='menuitem']")) {
          mainMenuItems = $(mainMenuItems).add($(this).children("[role='menuitem']"));
        }
        if ($(this).children("[data-h2-submenu-trigger]")) {
          mainMenuItems = $(mainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
        }
      });
    });
  } 
  else {
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      // Check if the menu wrapper has the system attribute.
      if ($(this).closest("[data-h2-menu-wrapper]").h2ComMenHasAttr("data-h2-system")) {
        // Check if the system attribute matches the current system version.
        if ($(this).closest("[data-h2-menu-wrapper]").attr("data-h2-system") == system){
          $(this).children("li").each(function() {
            if ($(this).children("[role='menuitem']")) {
              mainMenuItems = $(mainMenuItems).add($(this).children("[role='menuitem']"));
            }
            if ($(this).children("[data-h2-submenu-trigger]")) {
              mainMenuItems = $(mainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
            }
          });
        }
      } 
      else {
        // Since the menu wrapper doesn't have the system attribute, find the closest element that does and check to see if its value matches the current system version.
        if ($(this).closest("[data-h2-system]").attr("data-h2-system") == system) {
          $(this).children("li").each(function() {
            if ($(this).children("[role='menuitem']")) {
              mainMenuItems = $(mainMenuItems).add($(this).children("[role='menuitem']"));
            }
            if ($(this).children("[data-h2-submenu-trigger]")) {
              mainMenuItems = $(mainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
            }
          });
        }
      }
    });
  }

  // Add up/down event listener to main menu items.
  $(mainMenuItems).on("keydown.upDownArrow", function(e) {
    var key = e.keyCode || e.which;
    var itemCount = $(mainMenuItems).length - 1;
    h2ComMenUpDownLoop(e, key, mainMenuItems, itemCount);
  });

}

function h2ComMenAddTabEvents(system) {

  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var allMenuItems = [];
  if (system == null || system == "" || system == "latest") {
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menulist]").children("li").each(function() {
      if ($(this).children("[role='menuitem']")) {
        allMenuItems = $(allMenuItems).add($(this).children("[role='menuitem']"));
      }
      if ($(this).children("[data-h2-submenu-trigger]")) {
        allMenuItems = $(allMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
      }
    });
  } 
  else {
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menulist]").children("li").each(function() {
      // Check if the menu wrapper has the system attribute.
      if ($(this).closest("[data-h2-menu-wrapper]").h2ComMenHasAttr("data-h2-system")) {
        // Check if the system attribute matches the current system version.
        if ($(this).closest("[data-h2-menu-wrapper]").attr("data-h2-system") == system) {

          if ($(this).children("[role='menuitem']")) {
            allMenuItems = $(allMenuItems).add($(this).children("[role='menuitem']"));
          }
          if ($(this).children("[data-h2-submenu-trigger]")) {
            allMenuItems = $(allMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
          }

        }
      } 
      else {
        // Since the menu wrapper doesn't have the system attribute, find the closest element that does and check to see if its value matches the current system version.
        if ($(this).closest("[data-h2-system]").attr("data-h2-system") == system) {

          if ($(this).children("[role='menuitem']")) {
            allMenuItems = $(allMenuItems).add($(this).children("[role='menuitem']"));
          }
          if ($(this).children("[data-h2-submenu-trigger]")) {
            allMenuItems = $(allMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
          }
          
        }
      }

    });
  }

  $(allMenuItems).on("keydown.mainTabExit", function(e) {
    var key = e.keyCode || e.which;
    h2ComMenMainTabExit(e, key, this);
  });

}

function h2ComMenAddRightArrowToMainMenuItemsWithSubmenus(system) {

  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var mainMenuItemsWithSubmenu = [];
  if (system == null || system == "" || system == "latest") {
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      $(this).children("li").each(function() {
        if ($(this).children("[data-h2-menulist]").length > 0) {
          if ($(this).children("[role='menuitem']")) {
            mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[role='menuitem']"));
          }
          if ($(this).children("[data-h2-submenu-trigger]")) {
            mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[data-h2-submenu-trigger]"));
          }
        }
      });
    });
  } 
  else {
    $("[data-h2-menu-wrapper] [data-h2-menu] [data-h2-menu-container] >[data-h2-menulist]").each(function() {
      // Check if the menu wrapper has the system attribute.
      if ($(this).closest("[data-h2-menu-wrapper]").h2ComMenHasAttr("data-h2-system")) {
        // Check if the system attribute matches the current system version.
        if ($(this).closest("[data-h2-menu-wrapper]").attr("data-h2-system") == system) {

          $(this).children("li").each(function() {
            if ($(this).children("[data-h2-menulist]").length > 0) {
              if ($(this).children("[role='menuitem']")) {
                mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[role='menuitem']"));
              }
              if ($(this).children("[data-h2-submenu-trigger]")) {
                mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[data-h2-submenu-trigger]"));
              }
            }
          });

        }
      } 
      else {
        // Since the menu wrapper doesn't have the system attribute, find the closest element that does and check to see if its value matches the current system version.
        if ($(this).closest("[data-h2-system]").attr("data-h2-system") == system) {

          $(this).children("li").each(function() {
            if ($(this).children("[data-h2-menulist]").length > 0) {
              if ($(this).children("[role='menuitem']")) {
                mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[role='menuitem']"));
              }
              if ($(this).children("[data-h2-submenu-trigger]")) {
                mainMenuItemsWithSubmenu = $(mainMenuItemsWithSubmenu).add($(this).children("[data-h2-submenu-trigger]"));
              }
            }
          });
          
        }
      }

    });
  }

  // Add right arrow event listener to main menu items with submenus.
  $(mainMenuItemsWithSubmenu).on("keydown.rightArrow", function(e) {
    var key = e.keyCode || e.which;
    h2ComMenRightTrigger(e, key, this, mainMenuItemsWithSubmenu);
  });

}

function h2ComMenAddSubmenuTriggerEvents(system) {

  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var submenuTriggers = [];
  if (system == null || system == "" || system == "latest") {
    submenuTriggers = $("[data-h2-menu-wrapper] [data-h2-submenu-trigger]");
  } 
  else {
    $("[data-h2-menu-wrapper] [data-h2-submenu-trigger]").each(function() {
      // Check if the menu wrapper has the system attribute.
      if ($(this).closest("[data-h2-menu-wrapper]").h2ComMenHasAttr("data-h2-system")) {
        // Check if the system attribute matches the current system version.
        if ($(this).closest("[data-h2-menu-wrapper]").attr("data-h2-system") == system) {

          submenuTriggers = $(submenuTriggers).add($(this));

        }
      } 
      else {
        // Since the menu wrapper doesn't have the system attribute, find the closest element that does and check to see if its value matches the current system version.
        if ($(this).closest("[data-h2-system]").attr("data-h2-system") == system) {

          submenuTriggers = $(submenuTriggers).add($(this));
          
        }
      }

    });
  }

  // Submenu trigger click.
  $(submenuTriggers).on("click.toggleSubmenu", function() {
    h2ComMenToggleSubmenu(this);
  });

}

function h2ComMenAddMobileMenuTriggerEvent(system) {

  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var mobileTriggers = [];
  if (system == null || system == "" || system == "latest") {
    mobileTriggers = $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]");
  } else {
    $("[data-h2-menu-wrapper] [data-h2-mobile-menu-trigger]").each(function() {
      // Check if the menu wrapper has the system attribute.
      if ($(this).closest("[data-h2-menu-wrapper]").h2ComMenHasAttr("data-h2-system")) {
        // Check if the system attribute matches the current system version.
        if ($(this).closest("[data-h2-menu-wrapper]").attr("data-h2-system") == system) {

          mobileTriggers = $(mobileTriggers).add($(this));

        }
      } 
      else {
        // Since the menu wrapper doesn't have the system attribute, find the closest element that does and check to see if its value matches the current system version.
        if ($(this).closest("[data-h2-system]").attr("data-h2-system") == system) {

          mobileTriggers = $(mobileTriggers).add($(this));
          
        }
      }
    });
  }

  // Mobile Menu Trigger
  $(mobileTriggers).on("click.toggleMobileMenu", function(e) {
    e.preventDefault();
    h2ComMenMobileMenuToggle(this);
  });

}

function h2ComMenAddPageAnchorEvents(system) {

  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var menuItems = [];
  if (system == null || system == "" || system == "latest") {
    menuItems = $("[data-h2-menu-wrapper] [data-h2-menu] [role='menuitem']");
  } else {
    $("[data-h2-menu-wrapper] [data-h2-menu] [role='menuitem']").each(function() {
      // Check if the menu wrapper has the system attribute.
      if ($(this).closest("[data-h2-menu-wrapper]").h2ComMenHasAttr("data-h2-system")) {
        // Check if the system attribute matches the current system version.
        if ($(this).closest("[data-h2-menu-wrapper]").attr("data-h2-system") == system) {

          menuItems = $(menuItems).add($(this));

        }
      } 
      else {
        // Since the menu wrapper doesn't have the system attribute, find the closest element that does and check to see if its value matches the current system version.
        if ($(this).closest("[data-h2-system]").attr("data-h2-system") == system) {

          menuItems = $(menuItems).add($(this));
          
        }
      }

    });
  }
  // Mobile page anchor trigger.
  $(menuItems).on("click.navigate", function() {
    h2ComMenMobileMenuAnchorClick(this);
  });

}

export {
  h2ComMenAddUpDownToMainMenuItems, 
  h2ComMenAddTabEvents, 
  h2ComMenAddRightArrowToMainMenuItemsWithSubmenus, 
  h2ComMenAddSubmenuTriggerEvents, 
  h2ComMenAddMobileMenuTriggerEvent, 
  h2ComMenAddPageAnchorEvents
};