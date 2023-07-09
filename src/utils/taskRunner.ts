import ora from 'ora';
import chalk from 'chalk';

export const runTask = async (taskName: string, task: Function) => {
    const spinner = ora(`Running ${taskName}`).start(`Running ${chalk.bold(taskName)}`);
    try {
        await task();
        spinner.stopAndPersist({
            symbol: "✅",
            text: `${chalk.green('Compiled')} ${taskName}`,
        });
    }
    catch (e: any) {
        spinner.stopAndPersist({
            symbol: "❌",
            text:chalk.red(`Failed ${taskName}`),
        });
        console.error(e.message); 
    }
};