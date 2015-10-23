var fs = require('fs'),
    replace = require('replace'),
    runner = require('child_process');


var shell = function (command) {
    runner.exec(command,
        function (err, stdout, stderr) {
            //if (err) console.log(err);
            //if (stderr) console.log(stderr);
        }
    );
};

var version = process.argv[2];
if (!version) {
    console.log(" --- no version specified ---");
    process.exit(1);
}

// oxversion
shell('oxversion ' + version);

shell("rm -rf _module/application");
shell("rm -rf _module/extend");
shell("rm -rf _master/copy_this/modules/vt-nca");
console.log("");
console.log("     cleanup finished");

// copy files
shell("cp -r application _module/application");
shell("cp -r extend _module/extend");
shell("cp metadata.php _module/metadata.php");
shell("cp oxid-vt.jpg _module/oxid-vt.jpg");
shell("cp version.jpg _module/version.jpg");
shell("cp README.md _module/README.md");

console.log("     new files copied");

// compile some files
var module = 'Newest Category Articles for OXID eShop',
    company = 'Marat Bedoev',
    email = 'm@marat.ws',
    year = '2015';

replace({
    regex: "###_MODULE_###",
    replacement: module,
    paths: ['./_module'],
    recursive: true,
    silent: true
});
replace({
    regex: "###_VERSION_###",
    replacement: version,
    paths: ['./_module'],
    recursive: true,
    silent: true
});
replace({
    regex: "###_COMPANY_###",
    replacement: company,
    paths: ['./_module'],
    recursive: true,
    silent: true
});
replace({
    regex: "###_EMAIL_###",
    replacement: email,
    paths: ['./_module'],
    recursive: true,
    silent: true
});
replace({
    regex: "###_YEAR_###",
    replacement: year,
    paths: ['./_module'],
    recursive: true,
    silent: true
});

process.on('exit', function (code) {
    console.log("     replacing complete");
    // copy module to master
    shell("cp -r _module _master/copy_this/modules/vt-nca");
    shell("cp _module/README.md _master/README.md");
    console.log("");
    console.log("     build complete! made my day!");
    console.log("");
});