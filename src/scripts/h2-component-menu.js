import $ from "cash-dom"

// Hydrogen / Component / Scripts

// Helper Scripts

  // Get all menu items.
  function h2ComMenGetAllMenuItems_VERSION() {
    // Set an empty array.
    var allMenuItems = [];
    // Get menu list items.
    var allMenuListItems = Array.prototype.slice.call(document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu] [data-h2-menulist]").children);
    // Loop through children.
    allMenuListItems.forEach(function(item) {
      if (item.tagName == "LI") {
        // Find this list items children.
        var listItemChildren = Array.prototype.slice.call(item.children);
        listItemChildren.forEach(function(child) {
          // If this item is a menu item, add it to the array.
          if (child.getAttribute("role") == "menuitem") {
            allMenuItems.push(child);
          }
          // If this item is a submenu trigger, add it to the array.
          if (child.hasAttribute("data-h2-submenu-trigger") == true) {
            allMenuItems.push(child);
          }
        });
      }
    });
    // Return the array.
    return allMenuItems;
  }

  // Get main menu items.
  function h2ComMenGetMainMenuItems_VERSION() {
    // Set empty array.
    var mainMenuItems = [];
    // Get main menu list items.
    var mainMenuListItems = Array.prototype.slice.call(document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu] >[data-h2-menulist]").children);
    // Loop through children.
    mainMenuListItems.forEach(function(item) {
      if (item.tagName == "LI") {
        // Find this list items children.
        var listItemChildren = Array.prototype.slice.call(item.children);
        listItemChildren.forEach(function(child) {
          // If this item is a menu item, add it to the array.
          if (child.getAttribute("role") == "menuitem") {
            mainMenuItems.push(child);
          }
          // If this item is a submenu trigger, add it to the array.
          if (child.hasAttribute("data-h2-submenu-trigger") == true) {
            mainMenuItems.push(child);
          }
        });
      }
    });
    // Return the array.
    return mainMenuItems;
  }

  // Get main menu items with submenus.
  function h2ComMenGetMainMenuItemsWithSubmenu_VERSION() {
    // Set empty array.
    var mainMenuItemsWithSubmenu = [];
    // Get main menu list items.
    var mainMenuListItems = Array.prototype.slice.call(document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu] >[data-h2-menulist]").children);
    // Loop through children.
    mainMenuListItems.forEach(function(item) {
      if (item.tagName == "LI") {
        // Get children of the <li> and check for menu lists.
        var itemChildren = Array.prototype.slice.call(item.children);
        itemChildren.forEach(function(child) {
          if (child.hasAttribute("data-h2-menulist")) {
            // If this item is a menu item, add it to the array.
            if (child.getAttribute("role") == "menuitem") {
              mainMenuItemsWithSubmenu.push(child);
            }
            // If this item is a submenu trigger, add it to the array.
            if (child.hasAttribute("data-h2-submenu-trigger") == true) {
              mainMenuItemsWithSubmenu.push(child);
            }
          }
        });
      }
    });
    // Return the array.
    return mainMenuItemsWithSubmenu;
  }

  // Remove up/down, right, and escape events from everything.
  function h2ComMenRemoveEvents_VERSION(submenuClear, submenuUpDown) {
    var allMenuItems = document.querySelector("[data-h2-menu-wrapper_VERSION]").querySelectorAll("*");
    var mobileMenuTrigger = document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]");
    allMenuItems.forEach(function(item) {
      item.removeEventListener("keydown", h2ComMenRightTrigger_VERSION);
      // item.removeEventListener("keydown", submenuUpDown);
      item.removeEventListener("keydown", h2ComMenEscapeSubmenu_VERSION);
      item.removeEventListener("click", h2ComMenToggleSubmenu_VERSION);
    });
    mobileMenuTrigger.removeEventListener("keydown", h2ComMenRightTrigger_VERSION);
    // mobileMenuTrigger.removeEventListener("keydown", submenuUpDown);
    mobileMenuTrigger.removeEventListener("keydown", h2ComMenEscapeSubmenu_VERSION);
    mobileMenuTrigger.removeEventListener("click", h2ComMenToggleSubmenu_VERSION);
  }

// Opening and closing submenus.

  // Open a submenu.
  function h2ComMenOpenSubmenu_VERSION(link, submenuTrigger) {
      // Open the submenu.
      link.parentNode.classList.add("h2-active");
      link.setAttribute("aria-expanded", true);
      submenuTrigger.setAttribute("aria-expanded", true);
      // Remove all event listeners.
      h2ComMenRemoveEvents_VERSION();
      // Find submenu and its items.
      var submenu = link.parentNode.querySelector("[data-h2-menulist]");
      var submenuListItems = Array.prototype.slice.call(submenu.children);
      var submenuTargets = [];
      // Check each submenu item for a link or trigger and add it to the target list.
      submenuListItems.forEach(function(item) {
        var itemChildren = Array.prototype.slice.call(item.children);
        itemChildren.forEach(function(child) {
          if (child.getAttribute("role") == "menuitem") {
            submenuTargets.push(child);
          }
          if (child.hasAttribute("data-h2-submenu-trigger")) {
            submenuTargets.push(child);
          }
        });
      });
      // Add the trigger to the list.
      submenuTargets.push(submenuTrigger);
      // Add event listeners.
      submenuTargets.forEach(function(item) {
        item.addEventListener("keydown", h2ComMenRightTrigger_VERSION);
      });
      function submenuUpDown(e) {
        h2ComMenUpDownLoop_VERSION(e, submenuTargets);
      };
      submenuTargets.forEach(function(item) {
        item.addEventListener("keydown", submenuUpDown);
      });
      submenuTargets.forEach(function(item) {
        item.addEventListener("keydown", h2ComMenEscapeSubmenu_VERSION);
      });
      // Focus first menu item.
      submenuTargets[0].focus();
  }

  // Close a submenu.
  function h2ComMenCloseSubmenu_VERSION(link, submenuTrigger) {
      // Remove all event listeners.
      h2ComMenRemoveEvents_VERSION();
      // Get the current link's parent menu, it's list items, and set an empty array for the menu's targets.
      var parentMenu = link.closest("[data-h2-menulist]");
      var parentMenuListItems = Array.prototype.slice.call(parentMenu.children);
      var parentMenuTargets = [];
      // For each list item, get its children and check to see if any of them are a link or submenu trigger. If they are, add them to the targets list.
      parentMenuListItems.forEach(function(item) {
        var itemChildren = Array.prototype.slice.call(item.children);
        itemChildren.forEach(function(child) {
          if (child.getAttribute("role") == "menuitem") {
            parentMenuTargets.push(child);
          }
          if (child.hasAttribute("data-h2-submenu-trigger")) {
            parentMenuTargets.push(child);
          }
        });
      });
      // Check to see if the parent menu is also a submenu by looking at its siblings for a submenu trigger.
      var parentMenusListItem = parentMenu.parentNode;
      var parentMenusListItemsChildren = Array.prototype.slice.call(parentMenusListItem.children);
      var parentMenuSubmenuStatus = false;
      parentMenusListItemsChildren.forEach(function(child) {
        if (child.hasAttribute("data-h2-submenu-trigger")) {
          parentMenuSubmenuStatus = true;
        }
      });
      // If the parent menu is in fact a submenu, we need to add it's trigger to the target list.
      if (parentMenuSubmenuStatus == true) {
        parentMenusListItemsChildren.forEach(function(child) {
          if (child.hasAttribute("data-h2-submenu-trigger")) {
            parentMenuTargets.push(child);
          }
        });
      }
      // If the parent menu isn't a submenu, that means that it's the main menu, and we have to check to see if it's mobile enabled. If it is, we need to add the mobile trigger to the target list so that it's a part of the arrow key loop.
      else {
        if (document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu]").classList.contains("h2-mobile-menu-active")) {
          var mobileMenuTrigger = document.querySelector("[data-h2-mobile-menu-trigger]");
          parentMenuTargets.push(mobileMenuTrigger);
        }
      }
      // Add key event listeners to the target list.
      parentMenuTargets.forEach(function(item) {
        item.addEventListener("keydown", h2ComMenRightTrigger_VERSION);
      });
      function submenuUpDown(e) {
        h2ComMenUpDownLoop_VERSION(e, parentMenuTargets);
      };
      parentMenuTargets.forEach(function(item) {
        item.addEventListener("keydown", submenuUpDown);
      });
      parentMenuTargets.forEach(function(item) {
        item.addEventListener("keydown", h2ComMenEscapeSubmenu_VERSION);
      });
      // Close any nested submenus.
      var childListItems = link.parentNode.querySelectorAll("li");
      childListItems.forEach(function(item) {
        item.classList.remove("h2-active");
      });
      var childLinks = link.parentNode.querySelectorAll("[role='menuitem']");
      childLinks.forEach(function(item) {
        item.setAttribute("aria-expanded", false);
      });
      var childTriggers = link.parentNode.querySelectorAll("[data-h2-submenu-trigger]");
      childTriggers.forEach(function(item) {
        item.setAttribute("aria-expanded", false);
      });
      // Close the active submenu.
      link.parentNode.classList.remove("h2-active");
      link.setAttribute("aria-expanded", false);
      submenuTrigger.setAttribute("aria-expanded", false);
  }

  // Filter script for determining whether a submenu should be opened or closed.
  function h2ComMenToggleSubmenu_VERSION(e) {
    var trigger = e.target;
    var menuItem = "";
    var submenuTrigger = "";
    var siblings = Array.prototype.slice.call(trigger.parentNode.children);
    if (trigger.getAttribute("role") == "menuitem") {
      menuItem = trigger;
      siblings.forEach(function(sibling) {
        if (sibling.hasAttribute("data-h2-submenu-trigger")) {
          submenuTrigger = sibling;
        }
      });
    } 
    else {
      siblings.forEach(function(sibling) {
        if (sibling.getAttribute("role") == "menuitem") {
          menuItem = sibling;
        }
      });
      submenuTrigger = trigger;
    }
    // Check if the parent <li> is active or not.
    if (trigger.parentNode.classList.contains("h2-active")) {
      h2ComMenCloseSubmenu_VERSION(menuItem, submenuTrigger);
    } 
    else {
      h2ComMenOpenSubmenu_VERSION(menuItem, submenuTrigger);
    }
  }

  // Submenu trigger event listener.
  function h2ComMenSubmenuTriggerEvent_VERSION() {
    // Get all submenu triggers.
    var submenuTriggers = document.querySelectorAll("[data-h2-menu-wrapper_VERSION] [data-h2-submenu-trigger]");
    submenuTriggers.forEach(function(trigger) {
      trigger.addEventListener("click", h2ComMenToggleSubmenu_VERSION);
    });
  }

// Up/down arrow loop.

  // Up/Down controller function.
  function h2ComMenUpDownLoop_VERSION(e, items) {
    var key = e.keyCode || e.which;
    var itemCount = items.length - 1;
    var focusedElement = document.activeElement;
    // Next item
    if (key == 40) {
      e.preventDefault();
      items.forEach(function(item) {
        if (item == focusedElement) {
          var currentIndex = items.indexOf(item);
          var nextItemIndex = currentIndex + 1;
          if (nextItemIndex > itemCount) {
            items[0].focus();
          }
          else {
            items[nextItemIndex].focus();
          }
        }
      });
    }
    // Previous item.
    else if (key == 38) {
      e.preventDefault();
      items.forEach(function(item) {
        if (item == focusedElement) {
          var currentIndex = items.indexOf(item);
          var previousItemIndex = currentIndex - 1;
          if (previousItemIndex < 0) {
            items[itemCount].focus();
          }
          else {
            items[previousItemIndex].focus();
          }
        }
      });
    }
  }

  // Main menu up/down.

    // Up/Down on main menu items.
    function h2ComMenUpDownMainMenu_VERSION(e) {
      // Get items.
      var items = h2ComMenGetMainMenuItems_VERSION();
      // Call the up/down controller function.
      h2ComMenUpDownLoop_VERSION(e, items)
    }

    // Up/Down on main menu items AND mobile trigger.
    function h2ComMenUpDownMainMenuWithMobileTrigger_VERSION(e) {
      // Get items.
      var items = h2ComMenGetMainMenuItems_VERSION();
      // Add mobile trigger.
      var mobileTrigger = document.querySelector("[data-h2-mobile-menu-trigger]");
      items.push(mobileTrigger);
      // Call the up/down controller function.
      h2ComMenUpDownLoop_VERSION(e, items)
    }

    // Add up/down event to the main menu.
    function h2ComMenUpDownMainMenuEvent_VERSION() {
      // Get main menu items.
      var items = h2ComMenGetMainMenuItems_VERSION();
      // Add the event listener.
      items.forEach(function(item) {
        item.addEventListener("keydown", h2ComMenUpDownMainMenu_VERSION);
      });
    }

// Right arrow submenu trigger.

  // Right arrow controller.
  function h2ComMenRightTrigger_VERSION(e) {
    var key = e.keyCode || e.which;
    if (key == 39) {
        e.preventDefault();
        h2ComMenToggleSubmenu_VERSION(e);
    }
  }

  // Right arrow on main menu items.
  function h2ComMenRightMainMenu_VERSION() {
    // Get main menu items that have submenus.
    var items = h2ComMenGetMainMenuItemsWithSubmenu_VERSION()
    // Add the event listener.
    items.forEach(function(item) {
      item.addEventListener("keydown", h2ComMenRightTrigger_VERSION);
    });
  }

// Left/Escape Trigger to Close Submenus

  // Left/escape key controller.
  function h2ComMenEscapeSubmenu_VERSION(e) {
    var key = e.keyCode || e.which;
    var trigger = e.target;
    if (key == 37 || key == 27) {
      e.preventDefault();
      // Set empty variables for key elements.
      var menuItem = "";
      var submenuTrigger = "";
      var parent = "";
      // Check to see if trigger is a submenu item or the submenu's trigger (because this requires different DOM levels to be checked).
      if (trigger.getAttribute("role") == "menuitem") {
        // console.log("You exited on a menu item.");
        // Check to see if you're trying to close the main menu.
        var mainMenuCheck = trigger.parentNode.parentNode.parentNode;
        if (mainMenuCheck.hasAttribute("data-h2-menu")){
          // Check to see if the main menu is mobile activated; if not, it doesn't matter because the menu shouldn't do anything as it should always remain open.
          if (mainMenuCheck.classList.contains("h2-mobile-menu-active")) {
            // Remove event listeners from all menus.
            h2ComMenRemoveEvents_VERSION();
            // Close all submenus.
            var submenus = mainMenuCheck.querySelectorAll("[data-h2-menulist]");
            submenus.forEach(function(item) {
              var submenuListItems = Array.prototype.slice.call(item.children);
              submenuListItems.forEach(function(child) {
                child.classList.remove("h2-active");
              });
            });
            var linkItems = mainMenuCheck.querySelectorAll("[role='menuitem']");
            linkItems.forEach(function(item) {
              item.setAttribute("aria-expanded", false);
            });
            var submenuTriggers = mainMenuCheck.querySelectorAll("[data-h2-submenu-trigger]");
            submenuTriggers.forEach(function(subtrigger) {
              subtrigger.setAttribute("aria-expanded", false);
            });
            // Close the main menu.
            mainMenuCheck.classList.remove("h2-mobile-menu-active");
            document.querySelector("[data-h2-mobile-menu-trigger]").classList.remove("h2-active");
            document.querySelector("[data-h2-mobile-menu-trigger]").setAttribute("aria-expanded", false);
            document.querySelector("body").classList.remove("h2-mobile-menu-body-lock");
          }
        }
        else {
          // Set key elements based on the context and close the submenu.
          menuItem = trigger.parentNode.parentNode.parentNode.querySelector("[role='menuitem']");
          submenuTrigger = trigger.parentNode.parentNode.parentNode.querySelector("[data-h2-submenu-trigger]");
          parent = trigger.parentNode.parentNode.parentNode.parentNode;
          h2ComMenCloseSubmenu_VERSION(menuItem, submenuTrigger);
          submenuTrigger.focus();
        }
      } 
      else if (trigger.hasAttribute("data-h2-submenu-trigger") == false) {
        // console.log("You exited on a submenu trigger.");
        // Figure out if the trigger was the parent one, or if it's one in the active menu by testing to see if the sibling submenu is active or not.
        if (trigger.parentNode.classList.contains("h2-active")) {
          // console.log("This trigger is the parent trigger that opens the submenu you're trying to close.");
          // Set the key elements based on this context.
          menuItem = trigger.parentNode.querySelector("[role='menuitem']");
          submenuTrigger = trigger;
          parent = trigger.parentNode.parentNode;
          // Close the submenu and focus the parent trigger.
          h2ComMenCloseSubmenu_VERSION(menuItem, submenuTrigger);
          submenuTrigger.focus();
        } 
        else {
          // console.log("This trigger is a trigger inside the open submenu.");
          // Check to see if you're trying to close the main menu.
          var mainMenuCheck = trigger.parentNode.parentNode.parentNode;
          if (mainMenuCheck.hasAttribute("data-h2-menu")){
            // Check to see if the main menu is mobile activated; if not, it doesn't matter because the menu shouldn't do anything as it should always remain open.
            if (mainMenuCheck.classList.contains("h2-mobile-menu-active")) {
              // Remove event listeners from all menus.
              h2ComMenRemoveEvents_VERSION();
              // Close all submenus.
              var submenus = mainMenuCheck.querySelectorAll("[data-h2-menulist]");
              submenus.forEach(function(item) {
                var submenuListItems = Array.prototype.slice.call(item.children);
                submenuListItems.forEach(function(child) {
                  child.classList.remove("h2-active");
                });
              });
              var linkItems = mainMenuCheck.querySelectorAll("[role='menuitem']");
              linkItems.forEach(function(item) {
                item.setAttribute("aria-expanded", false);
              });
              var submenuTriggers = mainMenuCheck.querySelectorAll("[data-h2-submenu-trigger]");
              submenuTriggers.forEach(function(subtrigger) {
                subtrigger.setAttribute("aria-expanded", false);
              });
              // Close the main menu.
              mainMenuCheck.classList.remove("h2-mobile-menu-active");
              document.querySelector("[data-h2-mobile-menu-trigger]").classList.remove("h2-active");
              document.querySelector("[data-h2-mobile-menu-trigger]").setAttribute("aria-expanded", false);
              document.querySelector("body").classList.remove("h2-mobile-menu-body-lock");
            }
          }
          else {
            // Set key elements based on the context and close the submenu.
            menuItem = trigger.parentNode.parentNode.parentNode.querySelector("[role='menuitem']");
            submenuTrigger = trigger.parentNode.parentNode.parentNode.querySelector("[data-h2-submenu-trigger]");
            parent = trigger.parentNode.parentNode.parentNode.parentNode;
            h2ComMenCloseSubmenu_VERSION(menuItem, submenuTrigger);
            submenuTrigger.focus();
          }
        }
      }
    }
  }

// Main menu tab exit trigger.

  // This function closes all submenus and re-enables up/down, right, and left/escape key listeners if tab is pressed on any main menu items.
  function h2ComMenMainTabExit_VERSION(e) {
    var key = e.keyCode || e.which;
    var trigger = e.target;
    var menu = document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu]");
    var mobileMenuTrigger = document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]");
    var allMenuItems = h2ComMenGetAllMenuItems_VERSION;
    var allRoleMenuListItems = Array.prototype.slice.call(document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu] [data-h2-menulist]").querySelectorAll("[role='menuitem']"));
    var allSubMenuTriggers = Array.prototype.slice.call(document.querySelector("[data-h2-menu-wrapper_VERSION] [data-h2-menu] [data-h2-menulist]").querySelectorAll("[data-h2-submenu-trigger]"));
    // Close submenu function.
    // This is used by both the mobile and desktop logic.
    function closeSubmenus() {

      // Remove event listeners from all submenu items.
      h2ComMenRemoveEvents_VERSION();

      // Close all submenus
        // Remove the active class from all menu items.
        allMenuItems.forEach(function(item) {
          item.classList.remove("h2-active");
        });
        // Update aria-expanded on any role="menuitem" objects.
        allRoleMenuListItems.forEach(function(item) {
          item.setAttribute("aria-expanded", false);
        });
        // Update aria-expanded on any submenu triggers.
        allSubMenuTriggers.forEach(function(item) {
          item.setAttribute("aria-expanded", false);
        });

      // Enable main menu event listeners
        // Up/down keys
          // Get items.
          var resetMainMenuUpDownItems = h2ComMenGetMainMenuItems_VERSION();
          // Add mobile trigger.
          var mobileTrigger = document.querySelector("[data-h2-mobile-menu-trigger]");
          resetMainMenuUpDownItems.push(mobileTrigger);
          // Add Events.
          resetMainMenuUpDownItems.forEach(function(item) {
            item.addEventListener("keydown", h2ComMenUpDownMainMenuWithMobileTrigger_VERSION)
          });
        // Right key
        // Get items.
        var resetMainMenuRightItems = h2ComMenGetMainMenuItems_VERSION();
        resetMainMenuRightItems.forEach(function(item) {
          item.addEventListener("keydown", h2ComMenRightMainMenuWithMobileTrigger_VERSION)
        });

    }
    // If the menu is mobile activated, you need to close the main menu on tab out of the first or last items.
    if (menu.classList.contains("h2-mobile-menu-active")) {
      // Create an index of the main menu items, including the mobile trigger (this should be first in the order).
      var menuItemIndex = [];
      menuItemIndex.push(mobileMenuTrigger);
      menuItemIndex.push(h2ComMenGetMainMenuItems_VERSION());
      // Check to see if the item that was tabbed on is the first or last item in the list.
      var itemCount = menuItemIndex.length - 1;
      var currentIndex = menuItemIndex.indexOf(trigger);
      // If the item was the first item and they tabbed up, close the menu and submenus.
      if (currentIndex === 0) {
        // If they tabbed up...
        // console.log("you're on the first item in the menu.");
        if (key == 9 && e.shiftKey) {
          // Remove event listeners from all menus.
          h2ComMenRemoveEvents_VERSION();
          // Close all submenus.
            // Remove the active class from all menu items.
            allMenuItems.forEach(function(item) {
              item.classList.remove("h2-active");
            });
            // Update aria-expanded on any role="menuitem" objects.
            allRoleMenuListItems.forEach(function(item) {
              item.setAttribute("aria-expanded", false);
            });
            // Update aria-expanded on any submenu triggers.
            allSubMenuTriggers.forEach(function(item) {
              item.setAttribute("aria-expanded", false);
            });
          // Close the main menu.
          menu.classList.remove("h2-mobile-menu-active");
          mobileMenuTrigger.classList.remove("h2-active");
          mobileMenuTrigger.setAttribute("aria-expanded", false);
          document.querySelector("body").classList.remove("h2-mobile-menu-body-lock");
        }
      }
      // If the item was the last menu item and they tabbed down, close the menu and submenus.
      else if (currentIndex == itemCount) {
        // If they tabbed down...
        // console.log("you're on the last item in the menu.");
        if (key == 9 && !e.shiftKey) {
          // Remove event listeners from all menus.
          h2ComMenRemoveEvents_VERSION();
          // Close all submenus.
            // Remove the active class from all menu items.
            allMenuItems.forEach(function(item) {
              item.classList.remove("h2-active");
            });
            // Update aria-expanded on any role="menuitem" objects.
            allRoleMenuListItems.forEach(function(item) {
              item.setAttribute("aria-expanded", false);
            });
            // Update aria-expanded on any submenu triggers.
            allSubMenuTriggers.forEach(function(item) {
              item.setAttribute("aria-expanded", false);
            });
          // Close the main menu.
          menu.classList.remove("h2-mobile-menu-active");
          mobileMenuTrigger.classList.remove("h2-active");
          mobileMenuTrigger.setAttribute("aria-expanded", false);
          document.querySelector("body").classList.remove("h2-mobile-menu-body-lock");
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

  // Add event listeners to tab out of menus.
  function h2comMenTabExitEvent_VERSION() {
    // Get all menu items.
    var items = h2ComMenGetAllMenuItems_VERSION();
    // Add the event listener.
    items.forEach(function(item) {
      item.addEventListener("keydown", h2ComMenMainTabExit_VERSION);
    });
  }

// Mobile menu toggle script.
// This function opens or closes the main menu when on a narrow device.
function h2ComMenMobileMenuToggle_VERSION(trigger) {
  var menu = $("[data-h2-menu-wrapper_VERSION] [data-h2-menu]");
  // Close the menu.
  if ($(trigger).hasClass("h2-active")) {
      // Remove event listeners from all menus.
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.upDownArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.rightArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.escape");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.escape");
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
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.upDownArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.rightArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.escape");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.mainTabExit");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.escape");
      $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.mainTabExit");
      // Get main menu items.
      var resetMainMenuItems = [];
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] >[data-h2-menulist]").children("li").each(function() {
          if ($(this).children("[role='menuitem']")) {
              resetMainMenuItems = $(resetMainMenuItems).add($(this).children("[role='menuitem']"));
          }
          if ($(this).children("[data-h2-submenu-trigger]")) {
              resetMainMenuItems = $(resetMainMenuItems).add($(this).children("[data-h2-submenu-trigger]"));
          }
      });
      // Add mobile trigger to main menu items.
      resetMainMenuItems = $(resetMainMenuItems).add($(trigger));
      // Re-add up/down arrow listeners, left/escape listners.
      $(resetMainMenuItems).on("keydown.upDownArrow", function(e) {
          var key = e.keyCode || e.which;
          var itemCount = $(resetMainMenuItems).length - 1;
          h2ComMenUpDownLoop_VERSION(e, key, resetMainMenuItems, itemCount);
      });
      $(resetMainMenuItems).on("keydown.escape", function(e) {
          var key = e.keyCode || e.which;
          h2ComMenEscapeTrigger_VERSION(e, key, this);
      });
      $(resetMainMenuItems).on("keydown.mainTabExit", function(e) {
          var key = e.keyCode || e.which;
          h2ComMenMainTabExit_VERSION(e, key, this);
      });
      // Get main menu items with submenus.
      var resetMainMenuItemsWithSubmenus = [];
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] >[data-h2-menulist]").children("li").each(function() {
          if ($(this).children("[data-h2-menulist]").length > 0) {
              if ($(this).children("[role='menuitem']")) {
                  resetMainMenuItemsWithSubmenus = $(resetMainMenuItemsWithSubmenus).add($(this).children("[role='menuitem']"));
              }
              if ($(this).children("[data-h2-submenu-trigger]")) {
                  resetMainMenuItemsWithSubmenus = $(resetMainMenuItemsWithSubmenus).add($(this).children("[data-h2-submenu-trigger]"));
              }
          }
      });

      // Add right arrow event listener to main menu items with submenus.
      $(resetMainMenuItemsWithSubmenus).on("keydown.rightArrow", function(e) {
          var key = e.keyCode || e.which;
          h2ComMenRightTrigger_VERSION(e, key, this, resetMainMenuItemsWithSubmenus);
      });
      // Add tab listeners to tab out of the menu and close submenus.
      var resetAllMenuItems = [];
      $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] [data-h2-menulist]").children("li").each(function() {
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
          h2ComMenMainTabExit_VERSION(e, key, this);
      });
  }
}

// Mobile menu anchor navigation.
// This function closes the menu when a link is clicked that specifically takes the user to a point on their current page.
function h2ComMenMobileMenuAnchorClick_VERSION(link) {
  if ($("[data-h2-menu-wrapper_VERSION] [data-h2-menu]").hasClass("h2-mobile-menu-active")) {
      // Set anchor destination.
      var destination = $(link).attr("href");
      if (destination.match("^#")) {
          // Create a variable for the menu.
          var menu = $(link).closest("[data-h2-menu]");
          // Remove event listeners from all menus.
          $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.upDownArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.rightArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.escape");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.escape");
          // Close all submenus.
          $(link).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
          $(link).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
          $(link).closest("[data-h2-menu]").find("[data-h2-submenu-link]").attr("aria-expanded", "false");
          // Close the main menu.
          $(menu).removeClass("h2-mobile-menu-active");
          $("[data-h2-mobile-menu-trigger]").removeClass("h2-active").attr("aria-expanded", "false");
          $("body").removeClass("h2-mobile-menu-body-lock");
      }
  } else {
      // Set anchor destination.
      var destination = $(link).attr("href");
      if (destination.match("^#")) {
          // Remove event listeners from all menus.
          $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.upDownArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.rightArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] *").off("keydown.escape");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.upDownArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.rightArrow");
          $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").off("keydown.escape");
          // Close all submenus.
          $(link).closest("[data-h2-menu]").find("[data-h2-menulist]").children("li").removeClass("h2-active");
          $(link).closest("[data-h2-menu]").find("[role='menuitem']").attr("aria-expanded", "false");
          $(link).closest("[data-h2-menu]").find("[data-h2-submenu-link]").attr("aria-expanded", "false");
      }
  }
}

// function test8() {
//   // Mobile Menu Trigger
//   $("[data-h2-menu-wrapper_VERSION] [data-h2-mobile-menu-trigger]").on("click.toggleMobileMenu", function(e) {
//     e.preventDefault();
//     h2ComMenMobileMenuToggle_VERSION(this);
// });
// }

// function test9() {
//   // Mobile page anchor trigger.
//   $("[data-h2-menu-wrapper_VERSION] [data-h2-menu] [role='menuitem']").on("click.navigate", function() {
//     h2ComMenMobileMenuAnchorClick_VERSION(this);
// });
// }

// On page load.

  // Detect if the document is loaded.
  function h2ComMenDocReady_VERSION(callback){
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
  }

  h2ComMenDocReady_VERSION(function(){
    h2ComMenUpDownMainMenuEvent_VERSION()
    h2comMenTabExitEvent_VERSION();
    h2ComMenRightMainMenu_VERSION();
    h2ComMenSubmenuTriggerEvent_VERSION();
    // test8();
    // test9();
  });

// Exports
export {h2ComMenUpDownMainMenuEvent_VERSION, h2comMenTabExitEvent_VERSION, h2ComMenRightMainMenu_VERSION, h2ComMenSubmenuTriggerEvent_VERSION};