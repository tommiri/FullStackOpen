export const parseNumArguments = (
  args: string[],
  minArgs: number,
  maxArgs?: number
): number[] => {
  args.splice(0, 2); // remove commands

  if (args.length < minArgs) throw new Error('Not enough arguments!');
  if (maxArgs) {
    if (args.length > maxArgs) throw new Error('Too many arguments!');
  }

  let parsedArgs: number[] = [];

  args.forEach((arg) => {
    if (isNaN(Number(arg)))
      throw new Error('Provided values must be numbers!');
    parsedArgs.push(Number(arg));
  });

  return parsedArgs;
};
