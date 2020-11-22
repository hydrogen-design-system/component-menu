"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h2ComMenAddUpDownToMainMenuItems0013 = h2ComMenAddUpDownToMainMenuItems0013;
exports.h2ComMenAddTabEvents0013 = h2ComMenAddTabEvents0013;
exports.h2ComMenAddRightArrowToMainMenuItemsWithSubmenus0013 = h2ComMenAddRightArrowToMainMenuItemsWithSubmenus0013;
exports.h2ComMenAddSubmenuTriggerEvents0013 = h2ComMenAddSubmenuTriggerEvents0013;
exports.h2ComMenAddMobileMenuTriggerEvent0013 = h2ComMenAddMobileMenuTriggerEvent0013;
exports.h2ComMenAddPageAnchorEvents0013 = h2ComMenAddPageAnchorEvents0013;

var _cashDom = _interopRequireDefault(require("cash-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// "hasAttr" Function
_cashDom.default.fn.h2ComMenHasAttr0013 = function (name) {
  var attr = (0, _cashDom.default)(this).attr(name);
  return _typeof(attr) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && attr !== false;
}; // Toggle submenu.
// Open script.


function h2ComMenOpenSubmenu0013(menuItem, subMenuTrigger) {
  // Open the submenu.
  (0, _cashDom.default)(menuItem).parent().addClass("h2-active");
  (0, _cashDom.default)(menuItem).attr("aria-expanded", "true");
  (0, _cashDom.default)(subMenuTrigger).attr("aria-expanded", "true"); // Remove all event listeners.

  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Find submenu and it's items.

  var subMenuItems = [];
  (0, _cashDom.default)(menuItem).siblings("[data-h2-menulist]").children("li").each(function () {
    if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
      subMenuItems = (0, _cashDom.default)(subMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
    }

    if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
      subMenuItems = (0, _cashDom.default)(subMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
    }
  });
  subMenuItems = (0, _cashDom.default)(subMenuItems).add((0, _cashDom.default)(subMenuTrigger)); // Add event listeners.

  (0, _cashDom.default)(subMenuItems).on("keydown.rightArrow", function (e) {
    var key = e.keyCode || e.which;
    h2ComMenRightTrigger0013(e, key, this);
  });
  (0, _cashDom.default)(subMenuItems).on("keydown.upDownArrow", function (e) {
    var key = e.keyCode || e.which;
    var itemCount = (0, _cashDom.default)(subMenuItems).length - 1;
    h2ComMenUpDownLoop0013(e, key, subMenuItems, itemCount);
  });
  (0, _cashDom.default)(subMenuItems).on("keydown.escape", function (e) {
    var key = e.keyCode || e.which;
    h2ComMenEscapeTrigger0013(e, key, this);
  }); // Focus first menu item.

  (0, _cashDom.default)(subMenuItems)[0].focus();
} // Close script.


function h2ComMenCloseSubmenu0013(menuItem, subMenuTrigger) {
  // Remove all event listeners.
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
  (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Find parent menu and its items.

  var parentMenuItems = []; // Check to see if the main menu is the parent, and whether it is split.

  if ((0, _cashDom.default)(menuItem).parent().parent().parent().h2ComMenHasAttr0013("data-h2-menu") == true) {
    (0, _cashDom.default)(menuItem).parent().parent().parent().children("[data-h2-menulist]").each(function () {
      (0, _cashDom.default)(this).children("li").each(function () {
        if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
          parentMenuItems = (0, _cashDom.default)(parentMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
        }

        if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
          parentMenuItems = (0, _cashDom.default)(parentMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
        }
      });
    });
  } else {
    (0, _cashDom.default)(menuItem).parent().parent("[data-h2-menulist]").children("li").each(function () {
      if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
        parentMenuItems = (0, _cashDom.default)(parentMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
      }

      if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
        parentMenuItems = (0, _cashDom.default)(parentMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
      }
    });
  } // Check to see if the parent is also a submenu, and add its trigger if necessary.


  if ((0, _cashDom.default)(menuItem).parent().parent("[data-h2-menulist]").parent().children("[data-h2-submenu-trigger]").length > 0) {
    // console.log("there's a trigger");
    parentMenuItems = (0, _cashDom.default)(parentMenuItems).add((0, _cashDom.default)(menuItem).parent().parent("[data-h2-menulist]").parent().children("[data-h2-submenu-trigger]"));
  } else {
    // Since the parent is the main menu, check to see if it's mobile activated, and if it is, add the mobile menu trigger to the list.
    if ((0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
      parentMenuItems = (0, _cashDom.default)(parentMenuItems).add((0, _cashDom.default)("[data-h2-mobile-menu-trigger]"));
    }
  } // Add event listeners.


  (0, _cashDom.default)(parentMenuItems).on("keydown.rightArrow", function (e) {
    var key = e.keyCode || e.which;
    h2ComMenRightTrigger0013(e, key, this);
  });
  (0, _cashDom.default)(parentMenuItems).on("keydown.upDownArrow", function (e) {
    var key = e.keyCode || e.which;
    var itemCount = (0, _cashDom.default)(parentMenuItems).length - 1;
    h2ComMenUpDownLoop0013(e, key, parentMenuItems, itemCount);
  });
  (0, _cashDom.default)(parentMenuItems).on("keydown.escape", function (e) {
    var key = e.keyCode || e.which;
    h2ComMenEscapeTrigger0013(e, key, this);
  }); // Close all nested submenus.

  (0, _cashDom.default)(menuItem).parent().find("[data-h2-menulist]").children("li").removeClass("h2-active");
  (0, _cashDom.default)(menuItem).parent().find("[role='menuitem']").attr("aria-expanded", "false");
  (0, _cashDom.default)(menuItem).parent().find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Close the active submenu.

  (0, _cashDom.default)(menuItem).parent().removeClass("h2-active");
  (0, _cashDom.default)(menuItem).attr("aria-expanded", "false");
  (0, _cashDom.default)(subMenuTrigger).attr("aria-expanded", "false");
}

function h2ComMenToggleSubmenu0013(trigger) {
  // Define key elements in the menu item.
  var menuItem = "";
  var subMenuTrigger = "";

  if (trigger.getAttribute('role') === 'menuitem') {
    menuItem = trigger;
    subMenuTrigger = (0, _cashDom.default)(trigger).siblings("[data-h2-submenu-trigger]");
  } else {
    menuItem = (0, _cashDom.default)(trigger).siblings("[role='menuitem']");
    subMenuTrigger = trigger;
  } // Check if the parent <li> is active or not.


  if ((0, _cashDom.default)(trigger).parent().hasClass("h2-active")) {
    h2ComMenCloseSubmenu0013(menuItem, subMenuTrigger);
  } else {
    h2ComMenOpenSubmenu0013(menuItem, subMenuTrigger);
  }
} // Up/down arrow loop.


function h2ComMenUpDownLoop0013(e, key, items, itemCount) {
  // Next item
  if (key == 40) {
    e.preventDefault();
    var currentFocus = document.activeElement;
    (0, _cashDom.default)(items).each(function () {
      if (currentFocus == this) {
        var currentIndex = (0, _cashDom.default)(items).index((0, _cashDom.default)(this));
        var nextItemIndex = currentIndex + 1;

        if (nextItemIndex > itemCount) {
          items[0].focus();
        } else {
          items[nextItemIndex].focus();
        }
      }
    });
  } // Previous item.
  else if (key == 38) {
      e.preventDefault();
      var currentFocus = document.activeElement;
      (0, _cashDom.default)(items).each(function () {
        if (currentFocus == this) {
          var currentIndex = (0, _cashDom.default)(items).index((0, _cashDom.default)(this));
          var previousItemIndex = currentIndex - 1;

          if (previousItemIndex < 0) {
            items[itemCount].focus();
          } else {
            items[previousItemIndex].focus();
          }
        }
      });
    }
} // Right Trigger to Open Submenu


function h2ComMenRightTrigger0013(e, key, trigger) {
  if (key == 39) {
    e.preventDefault(); // Check to see if there's even a submenu to open.

    if ((0, _cashDom.default)(trigger).siblings("[data-h2-menulist]").length > 0) {
      if ((0, _cashDom.default)(trigger).parent().hasClass("h2-active")) {// Do nothing.
      } else {
        // Open the submenu.
        h2ComMenToggleSubmenu0013(trigger);
      }
    }
  }
} // Left/Escape Trigger to Close Submenus


function h2ComMenEscapeTrigger0013(e, key, trigger) {
  if (key == 37 || key == 27) {
    e.preventDefault(); // Set empty variables for key elements.

    var menuItem = "";
    var subMenuTrigger = "";
    var parent = ""; // Check to see if trigger is a submenu item or the submenu's trigger (because this requires different DOM levels to be checked).

    if (trigger.getAttribute('role') === 'menuitem') {
      // console.log("You exited on a menu item.");
      // Check to see if you're trying to close the main menu.
      if ((0, _cashDom.default)(trigger).parent().parent().parent().h2ComMenHasAttr0013("data-h2-menu")) {
        // console.log("You're trying to close the main menu.");
        if ((0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
          var menu = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]"); // Remove event listeners from all menus.

          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

          (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
          (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
          (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Close the main menu.

          (0, _cashDom.default)(menu).removeClass("h2-mobile-menu-active");
          (0, _cashDom.default)("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
          (0, _cashDom.default)("body").removeClass("h2-mobile-menu-body-lock");
        }
      } else {
        // Set the key elements based on this context.
        menuItem = (0, _cashDom.default)(trigger).parent().parent().siblings("[role='menuitem']");
        subMenuTrigger = (0, _cashDom.default)(trigger).parent().parent().siblings("[data-h2-submenu-trigger]");
        parent = (0, _cashDom.default)(trigger).parent().parent().parent().parent(); // Close the submenu and focus the parent trigger.

        h2ComMenCloseSubmenu0013(menuItem, subMenuTrigger);
        (0, _cashDom.default)(subMenuTrigger)[0].focus();
      }
    } else if (trigger.getAttribute('data-h2-submenu-trigger') === "") {
      // console.log("You exited on a submenu trigger.");
      // Figure out if the trigger was the parent one, or if it's one in the active menu by testing to see if the sibling submenu is active or not.
      if ((0, _cashDom.default)(trigger).parent().hasClass("h2-active")) {
        // console.log("This trigger is the parent trigger that opens the submenu you're trying to close.");
        // Set the key elements based on this context.
        menuItem = (0, _cashDom.default)(trigger).siblings("[role='menuitem']");
        subMenuTrigger = trigger;
        parent = (0, _cashDom.default)(trigger).parent().parent(); // Close the submenu and focus the parent trigger.

        h2ComMenCloseSubmenu0013(menuItem, subMenuTrigger);
        (0, _cashDom.default)(subMenuTrigger)[0].focus();
      } else {
        // console.log("This trigger is a trigger inside the open submenu.");
        // Check to see if you're trying to close the main menu.
        if ((0, _cashDom.default)(trigger).parent().parent().parent().h2ComMenHasAttr0013("data-h2-menu")) {
          // console.log("You're trying to close the main menu.");
          if ((0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
            var menu = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]"); // Remove event listeners from all menus.

            (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
            (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
            (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
            (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
            (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
            (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

            (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
            (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
            (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Close the main menu.

            (0, _cashDom.default)(menu).removeClass("h2-mobile-menu-active");
            (0, _cashDom.default)("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
            (0, _cashDom.default)("body").removeClass("h2-mobile-menu-body-lock");
          }
        } else {
          // console.log("You're closing a submenu.");
          // Set the key elements based on this context.
          menuItem = (0, _cashDom.default)(trigger).parent().parent().siblings("[role='menuitem']");
          subMenuTrigger = (0, _cashDom.default)(trigger).parent().parent().siblings("[data-h2-submenu-trigger]");
          parent = (0, _cashDom.default)(trigger).parent().parent().parent().parent(); // Close the submenu and focus the parent trigger.

          h2ComMenCloseSubmenu0013(menuItem, subMenuTrigger);
          (0, _cashDom.default)(subMenuTrigger)[0].focus();
        }
      }
    }
  }
} // Main menu tab exit trigger.
// This function closes all submenus and re-enables up/down, right, and left/escape key listeners if tab is pressed on any main menu items.


function h2ComMenMainTabExit0013(e, key, trigger) {
  // Close submenu function.
  // This is used by both the mobile and desktop logic.
  function closeSubmenus() {
    // Remove event listeners from all submenu items.
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus

    (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
    (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
    (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Get main menu items

    var resetMainMenuItems = [];
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
      (0, _cashDom.default)(this).children("li").each(function () {
        if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
          resetMainMenuItems = (0, _cashDom.default)(resetMainMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
        }

        if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
          resetMainMenuItems = (0, _cashDom.default)(resetMainMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
        }
      });
    }); // If the main menu is mobile activated, add the mobile menu trigger.

    if ((0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
      resetMainMenuItems = (0, _cashDom.default)(resetMainMenuItems).add((0, _cashDom.default)("[data-h2-mobile-menu-trigger]"));
    } // Enable listeners


    (0, _cashDom.default)(resetMainMenuItems).on("keydown.upDownArrow", function (e) {
      var key = e.keyCode || e.which;
      var itemCount = (0, _cashDom.default)(resetMainMenuItems).length - 1;
      h2ComMenUpDownLoop0013(e, key, resetMainMenuItems, itemCount);
    });
    (0, _cashDom.default)(resetMainMenuItems).on("keydown.rightArrow", function (e) {
      var key = e.keyCode || e.which;
      h2ComMenRightTrigger0013(e, key, this, resetMainMenuItems);
    });
  } // If the menu is mobile activated, you need to close the main menu on tab out of the first or last items.


  if ((0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
    var menu = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]"); // Create an index of the main menu items, including the mobile trigger (this should be first in the order).

    var menuItemIndex = [];
    menuItemIndex = (0, _cashDom.default)(menuItemIndex).add((0, _cashDom.default)("[data-h2-menu-wrapper-0013]").find(" [data-h2-mobile-menu-trigger]"));
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
      (0, _cashDom.default)(this).children("li").each(function () {
        if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
          menuItemIndex = (0, _cashDom.default)(menuItemIndex).add((0, _cashDom.default)(this).children("[role='menuitem']"));
        }

        if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
          menuItemIndex = (0, _cashDom.default)(menuItemIndex).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
        }
      });
    }); // Check to see if the item that was tabbed on is the first or last item in the list.

    var itemCount = (0, _cashDom.default)(menuItemIndex).length - 1;
    var currentIndex = (0, _cashDom.default)(menuItemIndex).index((0, _cashDom.default)(trigger)); // If the item was the first item and they tabbed up, close the menu and submenus.

    if (currentIndex === 0) {
      // If they tabbed up...
      // console.log("you're on the first item in the menu.");
      if (key == 9 && e.shiftKey) {
        // Remove event listeners from all menus.
        (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
        (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
        (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
        (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
        (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
        (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

        (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
        (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
        (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Close the main menu.

        (0, _cashDom.default)(menu).removeClass("h2-mobile-menu-active");
        (0, _cashDom.default)("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
        (0, _cashDom.default)("body").removeClass("h2-mobile-menu-body-lock");
      }
    } // If the item was the last menu item and they tabbed down, close the menu and submenus.
    else if (currentIndex == itemCount) {
        // If they tabbed down...
        // console.log("you're on the last item in the menu.");
        if (key == 9 && !e.shiftKey) {
          // Remove event listeners from all menus.
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
          (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

          (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
          (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
          (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Close the main menu.

          (0, _cashDom.default)(menu).removeClass("h2-mobile-menu-active");
          (0, _cashDom.default)("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
          (0, _cashDom.default)("body").removeClass("h2-mobile-menu-body-lock");
        }
      } // Otherwise, tab to the next item like normal and close submenus..
      else {
          if (key == 9 && !e.shiftKey || key == 9 && e.shiftKey) {
            closeSubmenus();
          }
        }
  } // Otherwise, tab as normal while closing submenus.
  else {
      if (key == 9 && !e.shiftKey || key == 9 && e.shiftKey) {
        closeSubmenus();
      }
    }
} // Mobile menu toggle script.
// This function opens or closes the main menu when on a narrow device.


function h2ComMenMobileMenuToggle0013(trigger) {
  var menu = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]"); // Close the menu.

  if ((0, _cashDom.default)(trigger).hasClass("h2-active")) {
    // Remove event listeners from all menus.
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

    (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
    (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
    (0, _cashDom.default)(trigger).closest("[data-h2-menu]").find("[data-h2-submenu-trigger]").attr("aria-expanded", "false"); // Close the main menu.

    (0, _cashDom.default)(menu).removeClass("h2-mobile-menu-active");
    (0, _cashDom.default)(trigger).removeClass("h2-active").attr("aria-expanded", "false");
    (0, _cashDom.default)("body").removeClass("h2-mobile-menu-body-lock");
  } // Open the menu.
  else {
      // Open the main menu.
      (0, _cashDom.default)(menu).addClass("h2-mobile-menu-active");
      (0, _cashDom.default)(trigger).addClass("h2-active").attr("aria-expanded", "true");
      (0, _cashDom.default)("body").addClass("h2-mobile-menu-body-lock"); // Remove event listeners from all menus.

      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.mainTabExit");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.mainTabExit"); // Get main menu items.

      var resetMainMenuItems = [];
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
        (0, _cashDom.default)(this).children("li").each(function () {
          if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
            resetMainMenuItems = (0, _cashDom.default)(resetMainMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
          }

          if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
            resetMainMenuItems = (0, _cashDom.default)(resetMainMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
          }
        });
      }); // Add mobile trigger to main menu items.

      resetMainMenuItems = (0, _cashDom.default)(resetMainMenuItems).add((0, _cashDom.default)(trigger)); // Re-add up/down arrow listeners, left/escape listners.

      (0, _cashDom.default)(resetMainMenuItems).on("keydown.upDownArrow", function (e) {
        var key = e.keyCode || e.which;
        var itemCount = (0, _cashDom.default)(resetMainMenuItems).length - 1;
        h2ComMenUpDownLoop0013(e, key, resetMainMenuItems, itemCount);
      });
      (0, _cashDom.default)(resetMainMenuItems).on("keydown.escape", function (e) {
        var key = e.keyCode || e.which;
        h2ComMenEscapeTrigger0013(e, key, this);
      });
      (0, _cashDom.default)(resetMainMenuItems).on("keydown.mainTabExit", function (e) {
        var key = e.keyCode || e.which;
        h2ComMenMainTabExit0013(e, key, this);
      }); // Get main menu items with submenus.

      var resetMainMenuItemsWithSubmenus = [];
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
        (0, _cashDom.default)(this).children("li").each(function () {
          if ((0, _cashDom.default)(this).children("[data-h2-menulist]").length > 0) {
            if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
              resetMainMenuItemsWithSubmenus = (0, _cashDom.default)(resetMainMenuItemsWithSubmenus).add((0, _cashDom.default)(this).children("[role='menuitem']"));
            }

            if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
              resetMainMenuItemsWithSubmenus = (0, _cashDom.default)(resetMainMenuItemsWithSubmenus).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
            }
          }
        });
      }); // Add right arrow event listener to main menu items with submenus.

      (0, _cashDom.default)(resetMainMenuItemsWithSubmenus).on("keydown.rightArrow", function (e) {
        var key = e.keyCode || e.which;
        h2ComMenRightTrigger0013(e, key, this, resetMainMenuItemsWithSubmenus);
      }); // Add tab listeners to tab out of the menu and close submenus.

      var resetAllMenuItems = [];
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] [data-h2-menulist]").children("li").each(function () {
        if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
          resetAllMenuItems = (0, _cashDom.default)(resetAllMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
        }

        if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
          resetAllMenuItems = (0, _cashDom.default)(resetAllMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
        }
      }); // Add mobile trigger to main menu items.

      resetAllMenuItems = (0, _cashDom.default)(resetAllMenuItems).add((0, _cashDom.default)(trigger));
      (0, _cashDom.default)(resetAllMenuItems).on("keydown.mainTabExit", function (e) {
        var key = e.keyCode || e.which;
        h2ComMenMainTabExit0013(e, key, this);
      });
    }
} // Mobile menu anchor navigation.
// This function closes the menu when a link is clicked that specifically takes the user to a point on their current page.


function h2ComMenMobileMenuAnchorClick0013(link) {
  if ((0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
    // Set anchor destination.
    var destination = (0, _cashDom.default)(link).attr("href");

    if (destination.match("^#")) {
      // Create a variable for the menu.
      var menu = (0, _cashDom.default)(link).closest("[data-h2-menu]"); // Remove event listeners from all menus.

      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

      (0, _cashDom.default)(link).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
      (0, _cashDom.default)(link).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
      (0, _cashDom.default)(link).closest("[data-h2-menu]").find("[data-h2-submenu-link]").attr("aria-expanded", "false"); // Close the main menu.

      (0, _cashDom.default)(menu).removeClass("h2-mobile-menu-active");
      (0, _cashDom.default)("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
      (0, _cashDom.default)("body").removeClass("h2-mobile-menu-body-lock");
    }
  } else {
    // Set anchor destination.
    var destination = (0, _cashDom.default)(link).attr("href");

    if (destination.match("^#")) {
      // Remove event listeners from all menus.
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.upDownArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.rightArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] *").off("keydown.escape");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
      (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").off("keydown.escape"); // Close all submenus.

      (0, _cashDom.default)(link).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
      (0, _cashDom.default)(link).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
      (0, _cashDom.default)(link).closest("[data-h2-menu]").find("[data-h2-submenu-link]").attr("aria-expanded", "false");
    }
  }
}

function h2ComMenAddUpDownToMainMenuItems0013(system) {
  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var mainMenuItems = [];

  if (system == null || system == "") {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
      (0, _cashDom.default)(this).children("li").each(function () {
        if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
          mainMenuItems = (0, _cashDom.default)(mainMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
        }

        if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
          mainMenuItems = (0, _cashDom.default)(mainMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
        }
      });
    });
  } else {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
      if ((0, _cashDom.default)(this).closest("[data-h2-system]").attr("data-h2-system" == system)) {
        (0, _cashDom.default)(this).children("li").each(function () {
          if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
            mainMenuItems = (0, _cashDom.default)(mainMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
          }

          if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
            mainMenuItems = (0, _cashDom.default)(mainMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
          }
        });
      }
    });
  } // Add up/down event listener to main menu items.


  (0, _cashDom.default)(mainMenuItems).on("keydown.upDownArrow", function (e) {
    var key = e.keyCode || e.which;
    var itemCount = (0, _cashDom.default)(mainMenuItems).length - 1;
    h2ComMenUpDownLoop0013(e, key, mainMenuItems, itemCount);
  });
}

function h2ComMenAddTabEvents0013(system) {
  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var allMenuItems = [];

  if (system == null || system == "") {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] [data-h2-menulist]").children("li").each(function () {
      if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
        allMenuItems = (0, _cashDom.default)(allMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
      }

      if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
        allMenuItems = (0, _cashDom.default)(allMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
      }
    });
  } else {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] [data-h2-menulist]").children("li").each(function () {
      if ((0, _cashDom.default)(this).closest("[data-h2-system]").attr("data-h2-system" == system)) {
        if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
          allMenuItems = (0, _cashDom.default)(allMenuItems).add((0, _cashDom.default)(this).children("[role='menuitem']"));
        }

        if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
          allMenuItems = (0, _cashDom.default)(allMenuItems).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
        }
      }
    });
  }

  (0, _cashDom.default)(allMenuItems).on("keydown.mainTabExit", function (e) {
    var key = e.keyCode || e.which;
    h2ComMenMainTabExit0013(e, key, this);
  });
}

function h2ComMenAddRightArrowToMainMenuItemsWithSubmenus0013(system) {
  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within the system's enabler selector (data-h2-system). This check ensures that any code that is loaded by the system is instanced and can be overridden by previous versions if need be.
  var mainMenuItemsWithSubmenu = [];

  if (system == null || system == "") {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
      (0, _cashDom.default)(this).children("li").each(function () {
        if ((0, _cashDom.default)(this).children("[data-h2-menulist]").length > 0) {
          if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
            mainMenuItemsWithSubmenu = (0, _cashDom.default)(mainMenuItemsWithSubmenu).add((0, _cashDom.default)(this).children("[role='menuitem']"));
          }

          if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
            mainMenuItemsWithSubmenu = (0, _cashDom.default)(mainMenuItemsWithSubmenu).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
          }
        }
      });
    });
  } else {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] >[data-h2-menulist]").each(function () {
      if ((0, _cashDom.default)(this).closest("[data-h2-system]").attr("data-h2-system" == system)) {
        (0, _cashDom.default)(this).children("li").each(function () {
          if ((0, _cashDom.default)(this).children("[data-h2-menulist]").length > 0) {
            if ((0, _cashDom.default)(this).children("[role='menuitem']")) {
              mainMenuItemsWithSubmenu = (0, _cashDom.default)(mainMenuItemsWithSubmenu).add((0, _cashDom.default)(this).children("[role='menuitem']"));
            }

            if ((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]")) {
              mainMenuItemsWithSubmenu = (0, _cashDom.default)(mainMenuItemsWithSubmenu).add((0, _cashDom.default)(this).children("[data-h2-submenu-trigger]"));
            }
          }
        });
      }
    });
  } // Add right arrow event listener to main menu items with submenus.


  (0, _cashDom.default)(mainMenuItemsWithSubmenu).on("keydown.rightArrow", function (e) {
    var key = e.keyCode || e.which;
    h2ComMenRightTrigger0013(e, key, this, mainMenuItemsWithSubmenu);
  });
}

function h2ComMenAddSubmenuTriggerEvents0013(system) {
  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within
  var submenuTriggers;

  if (system == null || system == "") {
    submenuTriggers = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-submenu-trigger]");
  } else {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-submenu-trigger]").each(function () {
      if ((0, _cashDom.default)(this).closest("[data-h2-system]").attr("data-h2-system") == system) {
        submenuTriggers.add((0, _cashDom.default)(this));
      }
    });
  } // Submenu trigger click.


  (0, _cashDom.default)(submenuTriggers).on("click.toggleSubmenu", function () {
    h2ComMenToggleSubmenu0013(this);
  });
}

function h2ComMenAddMobileMenuTriggerEvent0013(system) {
  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within
  var mobileTriggers;

  if (system == null || system == "") {
    mobileTriggers = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]");
  } else {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-mobile-menu-trigger]").each(function () {
      if ((0, _cashDom.default)(this).closest("[data-h2-system]").attr("data-h2-system") == system) {
        mobileTriggers.add((0, _cashDom.default)(this));
      }
    });
  } // Mobile Menu Trigger


  (0, _cashDom.default)(mobileTriggers).on("click.toggleMobileMenu", function (e) {
    e.preventDefault();
    h2ComMenMobileMenuToggle0013(this);
  });
}

function h2ComMenAddPageAnchorEvents0013(system) {
  // Determine where the module is being loaded from. If the module is being loaded from the system, the event should only be applied to the component when it exists within
  var menuItems;

  if (system == null || system == "") {
    menuItems = (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] [role='menuitem']");
  } else {
    (0, _cashDom.default)("[data-h2-menu-wrapper-0013] [data-h2-menu] [role='menuitem']").each(function () {
      if ((0, _cashDom.default)(this).closest("[data-h2-system]").attr("data-h2-system") == system) {
        menuItems.add((0, _cashDom.default)(this));
      }
    });
  } // Mobile page anchor trigger.


  (0, _cashDom.default)(menuItems).on("click.navigate", function () {
    h2ComMenMobileMenuAnchorClick0013(this);
  });
}