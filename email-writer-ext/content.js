console.log("Email writer extention - content script loaded");

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI-Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;

}
function findcomposeToolbar() {
    const selectors = [
        '.btC', // Gmail compose button
        '.aDh', // Gmail reply button   
        '[role="toolbar"]', // General dialog
        'gU.Up'
    ];
    for(const selector of selectors) {
        const toolbar = document.querySelector(selector); 
        if(toolbar){
            return toolbar;
        }
        return null;
    }
}
function injectButton() {
    const existingButton = document.querySelector('.email-writer-button'); 
    if(existingButton) exixtingButton.remove();

    const toolbar = findcomposeToolbar();
    if(!toolbar) {
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found, creating AI button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        console.log("AI button clicked");
        // Here you would add the logic to handle the AI reply generation
    });
    toolbar.insertBefore(button, toolbar.firstChild);
}
const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="Dialog"]') || 
              node.querySelector('.aDh, .btC, [role="Dialog"]'))
        )
        if(hasComposeElements) {
                console.log("Compose elements detected, injecting script");
                setTimeout(injectButton, 500);
        }

    }
}); 


observer.observe(document.body, {
    childList: true,
    subtree: true
});