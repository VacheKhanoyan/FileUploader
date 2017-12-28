const multer = require('multer');
const path = require('path');
const fs = require('fs');
const line_counter = require('count-lines-in-file');

let storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './resources');
	},
	filename: function(req, file, callback) {
		console.log(file);
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

class api_ver1 {
	initialize(app){

		app.post('/', (req,res)=>{
			let upload = multer({
				storage: storage,
				fileFilter: function(req, file, callback) {
					let ext = path.extname(file.originalname)
					if(ext !== '.txt') {
						return res.send('Invalid file format. Only text files are accepted!');
					}
					callback(null, true)
				}
			}).single('userFile');
			upload(req, res, function(err) {
				if(!req.file){
					return res.send('Nothing to upload');
				}
				let file = req.file;
				line_counter(file.path, (err, lines) => {
					res.end((lines-1) + ' lines of text');
				})
			})
		})
	}
}

module.exports = new api_ver1();
