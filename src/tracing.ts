import chalk from "chalk";

export const info = (message: string) => {
  console.info(
    chalk.white.bgBlue.bold("[ComponentFramework-Mock-CLI | INFO]") +
      " " +
      message
  );
};

export const error = (message?: string, ...optionalParams: any[]) => {
  console.error(
    chalk.white.bgRed.bold("[ComponentFramework-Mock-CLI | ERROR]") +
      " " +
      message,
    ...optionalParams
  );
};
