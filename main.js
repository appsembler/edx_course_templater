"use strict";

console.log('working');

async function makeDownload() {

    // Placeholder for things that take a long time to tar up.
    let target_location = document.getElementById('dlink');
    let download_placeholder = document.createElement('p');
    let creating_file = document.createTextNode('Creating tar file...');
    let filename = document.getElementById('filename').value;
    let file_source = document.getElementById('filesource').value;
    download_placeholder.appendChild(creating_file);
    target_location.appendChild(download_placeholder);

    // Get ready to add them files.
    let tar = new tarball.TarWriter();

    // Add the files as you get them.
    let thefile = await fetch(file_source)
        .then(res => res.blob())
        .then(blob => {
            // console.log('blob obtained');
            // console.log(blob);
            tar.addFile('testfile.txt', blob );
    });

    // Take the tar and make a download link with it.
    let written = await tar.write()
        .then( (tarblob) => {
            // console.log('tar written');
            // console.log(tarblob);

            // Remove the placeholder and put in the download link.
            let download_link = document.createElement('a');
            let click_to_download_txt = document.createTextNode('Click to download archive');

            target_location.removeChild(download_placeholder);
            download_link.setAttribute('href', URL.createObjectURL(tarblob) );
            download_link.setAttribute('download', filename);

            download_link.appendChild(click_to_download_txt);
            target_location.appendChild(download_link);
    });

}
