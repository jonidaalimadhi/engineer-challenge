function validateSearchInput(input: string): boolean {
  const reg_only_letters_and_space = /^[a-zA-Z\s]*$/;
  return reg_only_letters_and_space.test(input);
}

export default validateSearchInput;
