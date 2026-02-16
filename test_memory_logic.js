// Test script to verify memory game logic
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = R(0, i); [r[i], r[j]] = [r[j], r[i]] } return r };

let memConfig = { ops: ['+', '-', '×'], size: 'medium', level: 'medio' };

console.log('Testing memory game logic...');
console.log('Initial config:', memConfig);

// Test with default config
function testMemStart(config) {
  console.log('\n=== Testing with config:', config);

  try {
    const pairCount = config.size === 'small' ? 6 : config.size === 'medium' ? 8 : 10;
    console.log('Pair count:', pairCount);

    const ranges = {
      facil: { sum: [1, 10], sub: [5, 15], mul: [2, 5], div: [2, 5] },
      medio: { sum: [1, 12], sub: [5, 20], mul: [2, 9], div: [2, 10] },
      dificil: { sum: [5, 25], sub: [10, 40], mul: [3, 12], div: [3, 12] }
    };
    const r = ranges[config.level];

    if (!r) {
      console.error('ERROR: Level not found in ranges:', config.level);
      return false;
    }

    console.log('Ranges for level:', r);

    const pairs = [];
    for (let i = 0; i < pairCount; i++) {
      const op = config.ops[R(0, config.ops.length - 1)];
      console.log(`  Generating pair ${i} with op: "${op}"`);

      let a, b, ans;
      if (op === '+') { a = R(r.sum[0], r.sum[1]); b = R(r.sum[0], r.sum[1]); ans = a + b }
      else if (op === '-') { const mx = r.sub[1]; a = R(r.sub[0], mx); b = R(r.sub[0], Math.min(a - 1, mx)); ans = a - b }
      else if (op === '×') { a = R(r.mul[0], r.mul[1]); b = R(r.mul[0], r.mul[1]); ans = a * b }
      else { b = R(r.div[0], r.div[1]); const q = R(r.div[0], r.div[1]); a = b * q; ans = q }

      console.log(`    Generated: ${a} ${op} ${b} = ${ans}`);
      pairs.push({ q: `${a} ${op} ${b}`, a: String(ans), id: i });
    }

    console.log('Total pairs generated:', pairs.length);

    const memCards = shuffle([...pairs.map(p => ({ text: p.q, id: p.id, type: 'q' })), ...pairs.map(p => ({ text: p.a, id: p.id, type: 'a' }))]);
    console.log('Total cards after shuffle:', memCards.length);
    console.log('Sample cards:', memCards.slice(0, 4));

    return true;
  } catch (error) {
    console.error('ERROR during test:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Test with different configurations
testMemStart({ ops: ['+', '-', '×'], size: 'medium', level: 'medio' });
testMemStart({ ops: ['+', '-', '×', '÷'], size: 'medium', level: 'medio' });
testMemStart({ ops: ['÷'], size: 'small', level: 'facil' });
testMemStart({ ops: ['+'], size: 'large', level: 'dificil' });

console.log('\n=== All tests completed ===');
