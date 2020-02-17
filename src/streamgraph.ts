import * as d3 from 'd3';

const n = 20;
const m = 200;
const k = 10;

export default function (width: number, height: number) {
  const svg = d3.create('svg')
    // @ts-ignore
    .attr('viewBox', [0, 0, width, height]);

  const path = svg.selectAll('path')
    .data(randomize);
}

function randomize() {
  const layers = d3.stack(d3.transpose(
    Array.from({ length: n }, () => bumps(n, m)),
  ));
}

function bumps(r: number, s: number) {
  const bump = function (a: Array<number>, b: number) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());

    for (let i = 0; i < b; i++) {
      const w = (i / b - y) * z;
      // @ts-ignore
      a[i] += x * Math.exp(-w * w);
    }
  };

  const a: Array<number> = [];

  for (let i = 0; i < n; i++) a[i] = 0;
  for (let i = 0; i < m; i++) bump(a, n);
  return a;
}
