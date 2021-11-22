function runMoss() {
    // Reading destination directory and removing trailing route
    let url = fs.readFileSync('./destination.txt', { encoding: 'utf-8' });
    url = url.substring(0, url.lastIndexOf('\\'));

    // Checking if the user is using tmp folder and adding C: if
    // true, keeps directory otherwise
    if (url.startsWith('\\tmp')) {
        let temp = 'C:';
        url = temp + url;
    }

    // Replacing all backslahes with forwardslashes
    url = url.replace(/\\/g, '/');

    // Globbing wildcards to get all files to pass to Moss
    glob(url + "/*/*", function (er, files) {
        if (er) {
            console.log(err)
        }

        // Surrounding file paths in quotes to avoid errors when
        // spaces are present in file path
        files = files.map(function (file) {
            return '\"' + file + '\"';
        });

        files = files.join(" ");

        alert("This may take a minute");

        // Running Moss through the Strawberry Perl interpreter
        // and printing output to stdout
        exec(`/Strawberry/perl/bin/wperl.exe ../../moss.pl ${files}`, (error, stdout, stderr) => {
            if (error) {
                alert(`exec error: ${error}`);
                return;
            }
            alert(`stdout: ${stdout}`);
        });
    })
}

export {
    runMoss
}