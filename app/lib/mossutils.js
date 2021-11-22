const glob = require("glob");
const fs = require('fs');
const { execSync } = require('child_process');

function getUrl(dest_txt) {
    // Reading destination directory and removing trailing route
    let url = fs.readFileSync(dest_txt, { encoding: 'utf-8' });
    url = url.substring(0, url.lastIndexOf('\\'));

    // Checking if the user is using tmp folder and adding C: if
    // true, keeps directory otherwise
    if (url.startsWith('\\tmp')) {
        let temp = 'C:';
        url = temp + url;
    }

    // Replacing all backslahes with forwardslashes
    url = url.replace(/\\/g, '/');
    return url
}

function getFiles(url) {
    // Globbing wildcards to get all files to pass to Moss
    let files = glob.sync(url + "/*/*")
    // Surrounding file paths in quotes to avoid errors when
    // spaces are present in file path
    files = files.map(function (file) {
        return '\"' + file + '\"';
    });

    files = files.join(" ");
    return files
}

function runPerlScript(files) {
    // Running Moss through the Strawberry Perl interpreter
    // returns stdout
    return execSync(`/Strawberry/perl/bin/wperl.exe ../../moss.pl ${files}`)
}

function runMoss() {
    let promise = new Promise((res, rej) => {
        try {
            let url = getUrl('../routes/archive/components/destination.txt')
            let files = getFiles(url)
            let mossRes = runPerlScript(files)
            res(mossRes)
        } catch (error) {
            rej(error)
        }
    })
    return promise
}

export {
    runMoss, getUrl, getFiles, runPerlScript
}