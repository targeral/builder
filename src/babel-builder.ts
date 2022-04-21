import { BuilderManager } from './builder-manager';

export interface IBabelBuilderOption {
    input: string[];
    outDir: string;
}

export const babelBuilder = async (bm: BuilderManager<IBabelBuilderOption>) => {
    const option =  bm.option();
    console.info(option);
    bm.buildStart('bundless 构建');

    for (let i = 0; i < 10; i ++) {
        bm.buildProcess({ completed: i, total: 9 });
    }
    // 执行构建
    const ifBuildSuccess = Math.random() > 0.5;
    if (ifBuildSuccess) {
        await bm.buildFinish({
            messageStack: ['构建成功'],
            status: bm.buildResult.success,
        });
    } else {
        await bm.buildFinish({ messageStack: ['构建失败', '因为你太可爱了'], status: bm.buildResult.fail })
    };
}