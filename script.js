function shouldNotIntercept(navigationEvent) {
    return (
        !navigationEvent.canIntercept ||
        navigationEvent.hashChange ||
        navigationEvent.downloadRequest ||
        navigationEvent.formData
    );
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function UpdatePage(url) {
    console.log(url.pathname.slice(1));
    const main = document.getElementById(url.pathname.slice(1));
    document.getElementById('content').innerHTML = null;
    document
        .getElementById('content')
        .appendChild(main.content.cloneNode(true));
    document
        .getElementById('second_style')
        .setAttribute('href', `${url}/style.css`);
}

if ('navigation' in window) {
    console.log('Navigation API supported!');

    navigation.addEventListener('navigate', (navigateEvent) => {
        if (shouldNotIntercept(navigateEvent)) return;

        const url = new URL(navigateEvent.destination.url);

        navigateEvent.intercept({
            handler() {
                UpdatePage(url);
            },
        });
    });
} else {
    console.error('Navigation API is not supported in this browser.');
}
