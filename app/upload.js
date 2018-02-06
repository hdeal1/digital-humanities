//only uploads files. Need to make a data insertion table. SQL queries that take plain text information and store them in a universal format.
//file upload useful for P2P information transfers as well as an outlet for smith to provide mine-able documents.

var limits = {
	fileSize : 10240000,
	files : 5
};

var uploadDir	= '/files/uploadedFiles';
var busboy	= require('connect-busboy');
var fs		= require('fs');
var mkdirp	= require('mkdirp');
var exec	= require('child_process').exec;

module.exports = function (req, res, next) {
	req.upload_path = uploadDir + req.params.type_id + '/' + req.user.username;
	var bb = busboy({limits: limits});
	bb(req, res, function() {
		if (!req.busboy) {
			req.flash('uploadMessage', 'Something went wrong. Try to hand in again.');
			res.redirect('/upload/' + req.params.type_id);
			res.end();
		}
		req.files = [];
		var files = 0, finished = false;

		req.busboy.on('field', function(fieldname, val) {
			req.body[fieldname] = val;
		});
		
		req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			file.on('limit', function() {
				req.err = 'You may only upload files of maximum size ' + (limits.fileSize / 1024 / 1000) + 'MB.\
					   Reduce file size or put files in an archive, then try to upload again.';
				next();
			});
				
			files++;
			fstream = fs.createWriteStream(req.upload_path + '/' + filename);
			file.pipe(fstream);
		
			fstream.on('close', function() {
				req.files.push(filename);
				--files;
				if (!files && finished)
					next();
			});
		});
	
		req.busboy.on('filesLimit', function() {
			req.err = "You may only upload a maximum of ' + limits.files + ' files.";
			next();
		});

		req.busboy.on('finish', function(){
			finished = true;
		});
	req.pipe(req.busboy);
	});
};

