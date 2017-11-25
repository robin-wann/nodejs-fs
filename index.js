var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;
//console.log(fs.readdirSync('.'));//同步
//异步
/*fs.readdir(__dirname,function(err,files){
	console.log(files);
})*/

fs.readdir(process.cwd(), function(err,files){
	var stats = [];    //避免再次执行fs.stat
	console.log("");
	if(!files.length){
		return console.log('\033[31m No files to show!\033[39m\n');
	}
	console.log('	选择你要查看的文件或目录！\n');

	function file(i){
		var filename = files[i];

		fs.stat(__dirname + '/' + filename, function (err,stat){   //给出文件 目录元数据
			stats[i] = stat;
			if(stat.isDirectory()){
				console.log('	'+i+'	\033[36m' + filename + '\033[39m');
			}else{
				console.log('	'+i+'	\033[90m' + filename + '\033[39m');
			}
			/*i++;*/
			if(++i == files.length){
				/*console.log('');
				process.stdout.write('	\033[33mEnter your choice: \033[39m');
				process.stdin.resume();
				process.stdin.setEncoding('utf-8');*/
				read();
			}else{
				file(i);
			}
		});
	}
	//read user input
	function read(){
		console.log('');
		stdout.write('	\033[33mEnter your choice: \033[39m');
		stdin.resume();
		stdin.setEncoding('utf-8');
		stdin.on('data',option);
	}

	//options chosen by user
	function option(data){
		/*只能检测读出文件  不能检测出目录
		var filename = files[Number(data)];   
		if(!filename){
			stdout.write('	\033[31mEnter your choice: \033[39m');
		}else{
			stdin.pause();
			fs.readFile(__dirname + '/' + filename, 'utf-8' , function(err,data){
				console.log('');
				console.log('\033[90m' + data.replace(/(.*)/g,' 	$1') + '\033[39m');
			});
		}*/
		var filename = files[Number(data)];   
		if(!filename){
			stdout.write('	\033[31mEnter your choice: \033[39m');
		}else{
			stdin.pause();
			if(stats[Number(data)].isDirectory()){
				fs.readdir(__dirname + '/' + filename, function(err,files){
					console.log('');
					console.log('	('+files.length + ' files)');
					files.forEach(function(file){
						console.log('	-	' + file);
					});
					console.log('');
				});
			}else{
				fs.readFile(__dirname + '/' + filename, 'utf-8' , function(err,data){
					console.log('');
					console.log('\033[90m' + data.replace(/(.*)/g,' 	$1') + '\033[39m');
				});
			}
		}
	}

	file(0)
})



