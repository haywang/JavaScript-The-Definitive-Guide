// 导入要测试的clock函数
const { clock } = require("./clock");

async function testClock() {
  console.log("开始测试 clock 函数...");

  // 测试1: 基本功能测试 - 使用较短的间隔和有限次数
  console.log("测试1: 基本功能测试");
  const testClock = clock(100, 5); // 100ms间隔，最多5次

  let count = 0;
  const startTime = Date.now();

  for await (const tick of testClock) {
    count++;
    const elapsed = Date.now() - startTime;
    console.log(`第 ${tick} 次滴答，经过约 ${elapsed}ms`);

    // 简单验证时间间隔大致正确（允许一定误差）
    const expectedTime = tick * 100;
    const timeDiff = Math.abs(elapsed - expectedTime);
    if (timeDiff > 50) {
      // 允许50ms误差
      console.error(
        `时间误差过大: 期望约 ${expectedTime}ms, 实际 ${elapsed}ms`
      );
    }
  }

  console.log(`测试完成，共收到 ${count} 次滴答`);

  if (count !== 5) {
    throw new Error(`期望5次滴答，实际收到 ${count} 次`);
  }

  console.log("所有测试通过!");
}

testClock().catch((err) => console.error("测试失败:", err));
