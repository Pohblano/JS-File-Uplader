const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');     //used for file path
const fs = require('fs-extra');    //File System-needed for renaming file etc

// Upload and save files
router.route('/upload').post(function (req, res, next) {
  const form = new formidable.IncomingForm();
  //Formidable uploads to operating systems tmp dir by default
  form.uploadDir = "./files";       //set upload directory
  form.keepExtensions = true;     //keep file extension

  form.parse(req, function (err, fields, files) {
    console.log(files)
    console.log("file size: " + JSON.stringify(files.fileUploaded.size));
    console.log("file path: " + JSON.stringify(files.fileUploaded.path));
    console.log("file name: " + JSON.stringify(files.fileUploaded.name));
    console.log("file type: " + JSON.stringify(files.fileUploaded.type));
    //Formidable changes the name of the uploaded file
    //Rename the file to its original name
    fs.rename(files.fileUploaded.path, './files/' + files.fileUploaded.name, function (err) {
      if (err)
        throw err;
      console.log('renamed complete');
    });
    res.redirect('/')
    res.end();
  });
});

// Read list of files
router.route('/readFiles').get(function (req, res) {
  const data = []
  fs.readdir("./files", {
    encoding: "UTF-8"
  }, function (err, files) {
    files.map(x => data.push(`./files/${x}`))
    res.send(data)
    res.status(200)
  });
})
//  Download link routes
router.route('/files/:name').get(function (req, res) {
  fs.access(`./files/${req.fileName}`, (err) => {
    if (err) {
      console.log(`./files/${req.fileName} is not existed on disk`);
      res.redirect('/404');
      return;
    }
    console.log(`begin to download file ./files/${req.fileName} in browser`);
    res.download(`./files/${req.fileName}`, (downloadErr) => {
      if (err) {
        console.log(`file downloading error, now go to 404`, downloadErr);
        res.redirect(`/404`);
      }
      console.log(`file downloading done`);
    });
  });
})
router.param('name', (req, res, next, fileName)=>{
  req.fileName = fileName;
  next();
})

module.exports = router;