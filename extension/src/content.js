// content.js - the content scripts which is run in the context of web pages, and has access
// to the DOM and other web APIs.
import './inject.js'

// Example usage:
const message = {
    action: 'classify',
    text: 'My name is ashwin',
}
chrome.runtime.sendMessage(message, (response) => {
    console.log('received user data', response)
});
