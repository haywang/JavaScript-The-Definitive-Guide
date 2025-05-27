// 获取DOM元素
const outputDiv = document.getElementById('output');
const simulateABtn = document.getElementById('simulateA');
const simulateBBtn = document.getElementById('simulateB');
const simulateEnterBtn = document.getElementById('simulateEnter');
const stopTestBtn = document.getElementById('stopTest');

// 重定向console.log到页面
const originalConsoleLog = console.log;
console.log = function(message) {
  originalConsoleLog.apply(console, arguments);
  const p = document.createElement('p');
  p.textContent = message;
  outputDiv.appendChild(p);
};

// 创建一个可以关闭的AsyncQueue实例
let keyQueue;
let isTestRunning = false;

// 模拟键盘事件
function simulateKeyPress(key) {
  const event = new KeyboardEvent('keypress', {
    key: key,
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

// 启动测试
function startTest() {
  if (isTestRunning) return;
  
  isTestRunning = true;
  outputDiv.innerHTML = '<p>测试已启动，按键记录：</p>';
  
  // 创建一个新的AsyncQueue实例
  keyQueue = eventStream(document, 'keypress');
  
  // 启动handleKeys函数
  handleKeysTest();
}

// 停止测试
function stopTest() {
  if (!isTestRunning) return;
  
  isTestRunning = false;
  if (keyQueue) {
    keyQueue.close();
    keyQueue = null;
  }
  console.log('测试已停止');
}

// 修改handleKeys函数用于测试
async function handleKeysTest() {
  try {
    for await (const event of keyQueue) {
      console.log(`按下键: ${event.key}`);
      
      // 如果按下Escape键，停止测试
      if (event.key === 'Escape') {
        stopTest();
        break;
      }
    }
  } catch (error) {
    console.error('处理键盘事件时出错:', error);
  }
  console.log('handleKeys函数已退出');
}

// 添加事件监听器
simulateABtn.addEventListener('click', () => {
  if (!isTestRunning) startTest();
  simulateKeyPress('a');
});

simulateBBtn.addEventListener('click', () => {
  if (!isTestRunning) startTest();
  simulateKeyPress('b');
});

simulateEnterBtn.addEventListener('click', () => {
  if (!isTestRunning) startTest();
  simulateKeyPress('Enter');
});

stopTestBtn.addEventListener('click', stopTest);

// 页面加载时自动启动测试
window.addEventListener('load', startTest);

// 添加键盘事件监听器
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    stopTest();
  }
});