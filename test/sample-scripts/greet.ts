export function greet(...names: string[]) {
  if (names.length) names.forEach(name => console.log(`hi, ${name}`));
}
