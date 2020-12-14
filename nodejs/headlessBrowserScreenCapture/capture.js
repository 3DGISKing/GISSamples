const CDP = require('chrome-remote-interface');
const argv = require('minimist')(process.argv.slice(2));
const file = require('fs');

// CLI Args
const url = argv.url || 'https://www.google.com/maps/place/34-38+Rue+de+la+Muette,+78600+Maisons-Laffitte/@48.9507984,2.1376683,79a,35y,39.56t/data=!3m1!1e3!4m5!3m4!1s0x47e6619ab812009f:0xc46594dac01eee00!8m2!3d48.9515814!4d2.1398966';
const format = argv.format === 'jpeg' ? 'jpeg' : 'png';
const viewportWidth = argv.viewportWidth || 1440;
const viewportHeight = argv.viewportHeight || 900;
const delay = argv.delay || 1000;
const userAgent = argv.userAgent;
const fullPage = argv.full;

// Start the Chrome Debugging Protocol
CDP(async function(client) {
    // Extract used DevTools domains.
    const {DOM, Emulation, Network, Page, Runtime} = client;

    // Enable events on domains we are interested in.
    await Page.enable();
    await DOM.enable();
    await Network.enable();

    // If user agent override was specified, pass to Network domain
    if (userAgent) {
        await Network.setUserAgentOverride({userAgent});
    }

    // Set up viewport resolution, etc.
    const deviceMetrics = {
        width: viewportWidth,
        height: viewportHeight,
        deviceScaleFactor: 0,
        mobile: false,
        fitWindow: false,
    };

    await Emulation.setDeviceMetricsOverride(deviceMetrics);
    await Emulation.setVisibleSize({width: viewportWidth, height: viewportHeight});

    // Navigate to target page
    await Page.navigate({url});

    // Wait for page load event to take screenshot
    Page.loadEventFired(async () => {
        // If the `full` CLI option was passed, we need to measure the height of
        // the rendered page and use Emulation.setVisibleSize
        if (fullPage) {
            const {root: {nodeId: documentNodeId}} = await DOM.getDocument();
            const {nodeId: bodyNodeId} = await DOM.querySelector({
                selector: 'body',
                nodeId: documentNodeId,
            });

            const {model: {height}} = await DOM.getBoxModel({nodeId: bodyNodeId});

            await Emulation.setVisibleSize({width: viewportWidth, height: height});
            // This forceViewport call ensures that content outside the viewport is
            // rendered, otherwise it shows up as grey. Possibly a bug?
            await Emulation.forceViewport({x: 0, y: 0, scale: 1});
        }

        setTimeout(async function() {
            const screenshot = await Page.captureScreenshot({format});
            const buffer = new Buffer(screenshot.data, 'base64');

            file.writeFile('screenshot.png', buffer, 'base64', function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Screenshot saved');
                }
                client.close();
            });
        }, delay);
    });
}).on('error', err => {
    console.error('Cannot connect to browser:', err);
});
