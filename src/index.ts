import { BuilderManager } from './builder-manager';
import { babelBuilder, IBabelBuilderOption } from './babel-builder';

const main = async () => {
    const babelBuilderManager = new BuilderManager<IBabelBuilderOption>('babel-builder', {
        input: ['index.ts'],
        outDir: 'dist/babel',
    });

    await babelBuilder(babelBuilderManager);

    // const buildResult = await b.build();
    // const { messageStack, status: resultStatus } = buildResult;
    // const message = messageStack.join('\n');
    // if (resultStatus === BuildResult.success) {
    //     console.info(chalk.green(message));
    // } else if (resultStatus === BuildResult.fail) {
    //     console.info(chalk.red(message));
    // }
};

main().then();