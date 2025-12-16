const fs = require('fs');
const https = require('https');
const path = require('path');
const { URL } = require('url');

const urls = [
    // TalkingHead Brunette Example (Likely has visemes)
    'https://raw.githubusercontent.com/met4citizen/TalkingHead/main/avatars/brunette.glb'
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        console.log(`Trying ${url}...`);

        const options = new URL(url);
        const reqOptions = {
            hostname: options.hostname,
            path: options.pathname + options.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        };

        const req = https.request(reqOptions, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                console.log(`Redirecting to ${response.headers.location}`);
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                fs.unlink(dest, () => { });
                reject(new Error(`Failed with status ${response.statusCode}`));
                return;
            }

            console.log(`Content-Type: ${response.headers['content-type']}`);
            response.pipe(file);

            file.on('finish', () => {
                file.close(() => {
                    const stats = fs.statSync(dest);
                    console.log(`Downloaded size: ${stats.size} bytes`);
                    if (stats.size < 2000) {
                        fs.unlink(dest, () => { });
                        reject(new Error('File too small'));
                    } else {
                        console.log('Success!');
                        resolve();
                    }
                });
            });
        });

        req.on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });

        req.end();
    });
};

async function getModel() {
    const dest = path.join(__dirname, 'public', 'avatar.glb');
    try {
        await download(urls[0], dest);
        console.log(`Successfully downloaded Brunette`);
        process.exit(0);
    } catch (e) {
        console.error(`Download failed: ${e.message}`);
        process.exit(1);
    }
}

getModel();
