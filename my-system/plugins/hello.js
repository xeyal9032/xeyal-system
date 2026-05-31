/**
 * Example Plugin: hello
 * A demonstration of how to extend My-System.
 */
export default {
  register: (program, logger, config) => {
    program
      .command('hello')
      .description('A plugin-provided hello world command')
      .option('-n, --name <name>', 'Name to greet', 'Developer')
      .action((options) => {
        const msg = `Hello, ${options.name}! Welcome to the My-System Plugin ecosystem.`;
        console.log('\n🌟 ' + msg + '\n');
        logger.info(`Plugin Hello executed for: ${options.name}`);
      });
  }
};
