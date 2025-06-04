export function generateTrainingLog(
  numEpochs: number,
  lossFn: (epoch: number) => number = (epoch) =>
    +(Math.exp(-0.2 * epoch) + 0.1 * Math.random()),
): string {
  let lines = [];
  for (let epoch = 1; epoch <= numEpochs; epoch++) {
    const loss = lossFn(epoch);
    lines.push(`Epoch ${epoch}: Loss = ${loss.toFixed(2)}`);
  }
  return lines.join("\n");
}
