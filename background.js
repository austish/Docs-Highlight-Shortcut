browser.commands.onCommand.addListener((command) => {
  if (command === "toggle-highlight") {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      if (tabs.length > 0) {
        browser.tabs.sendMessage(tabs[0].id, {action: "highlight"});
      }
    });
  }
});
