import chalk from 'chalk';
import { ProgressBar } from './process-bar';

export enum BuildResult {
    success,
    fail,
};

// TODO: 待实现
const emit = (hook: string, returnValue: any) => {
    console.info(`emit ${hook}`);
    return returnValue;
};


class BuilderManager<T = {}> {
    #name: string;
    #option: T;
    // timer
    #startTime!: Date;

    buildResult: typeof BuildResult;



    constructor(name: string, option: T) {
        this.#name = name;
        this.#option = option;
        this.buildResult = BuildResult;
    }

    option(): T {
        // 1. 获取默认配置
        // 2. 触发 before-build
        // 3. 返回最终配置
        const defaultOption = this.#option;
        // TODO: 待实现
        const beforeBuildOption = emit('before-build', {});
        const mergedOption = Object.assign({}, defaultOption, beforeBuildOption);
        return mergedOption;
    }

    async buildStart(content: string = '') {
        this.#startTime = new Date();
        if (content.length > 0) {
            console.info(content);
        }
        console.info('开始构建', this.#startTime);
    }

    buildProcess(option: { completed: number; total: number }) {
        const pb = new ProgressBar('', 50);
        pb.render({ ...option });
    }

    async buildFinish(result: {
        messageStack: string[];
        status: BuildResult;
    }) {
        const { messageStack, status: resultStatus } = result;
        const message = messageStack.join('\n');
        if (resultStatus === BuildResult.success) {
            console.info(chalk.green(message));
            console.info(chalk.green(`耗时 ${this.#getUseTime()}`))
        } else if (resultStatus === BuildResult.fail) {
            console.info(chalk.red(message));
        }
        emit('after-build', null);
    }

    buildSync () {

    }

    #getUseTime() {
        return new Date().getTime() - this.#startTime.getTime();
    }
}

export { BuilderManager };