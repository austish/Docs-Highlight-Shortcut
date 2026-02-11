browser.runtime.onMessage.addListener((message) => {
    if (message.action === "highlight") {
        highlightDocs();
    }
});

function highlightDocs() {
    const highlightBtn = findElement('#bgColorButton');
    if (highlightBtn) {
        clickAndSelectColor(highlightBtn, "yellow");
    } else {
        console.warn("Extension: Highlight button not found.");
    }
}

function findElement(element) {
    const el = document.querySelector(element);
    if (el && isVisible(el)) {
        return el;
    } else {
        console.warn("Extension: " + element + " not found.");
        return null;
    }
}

function clickAndSelectColor(button, colorName) {
    simulateClick(button);

    const colorOption = findElement(`[aria-label="${colorName}"]`);
    if (colorOption) {
        simulateClick(colorOption);
    } else {
        console.warn("Extension: Color option not found.");
    }
}

function simulateClick(element) {
    const mouseEvents = ['mousedown', 'mouseup', 'click'];
    mouseEvents.forEach(eventType => {
        const event = new MouseEvent(eventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        });
        element.dispatchEvent(event);
    });
}

function isVisible(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}
