const metric = ["b", "kb", "mb", "gb", "tb", "pb", "eb", "zb"];
export default function getSize(size: number): string {
  if (isNaN(size)) return "";

  let index = 0;
  let result = size;
  let current = size / 1000;
  while (current > 1) {
    index++;
    result = current;
    current /= 1000;
  }

  return (Math.round(result * 10) / 10).toString().concat(metric[index]);
}
