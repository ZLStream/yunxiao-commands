#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// 根据平台选择二进制文件
const platform = os.platform();
const arch = os.arch();

let binaryName;
if (platform === 'darwin' && arch === 'arm64') {
  binaryName = 'yx-code-darwin-arm64';
} else if (platform === 'darwin' && arch === 'x64') {
  binaryName = 'yx-code-darwin-amd64';
} else if (platform === 'linux' && arch === 'x64') {
  binaryName = 'yx-code-linux-amd64';
} else {
  console.error(`Unsupported platform: ${platform}-${arch}`);
  process.exit(1);
}

const binaryPath = path.join(__dirname, binaryName);

// 执行二进制文件，传递所有参数
const child = spawn(binaryPath, process.argv.slice(2), {
  stdio: 'inherit',
  shell: false
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
