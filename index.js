import { spawn } from "child_process"
import * as path from 'path'
import { fileURLToPath } from 'url';
    
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.on('uncaughtException', console.error)

function start() {
	let args = [path.join(__dirname, 'bot.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting Bot...')
			p.kill()
			start()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		if (code == "." || code == 1 || code == 0) start()
	})
}
start()