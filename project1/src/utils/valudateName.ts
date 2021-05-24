export function validateName(name: string): boolean {
  const regexp = new RegExp(/^([A-Za-z]+ )+([A-Za-z])+$/);
  return regexp.test(name);
}