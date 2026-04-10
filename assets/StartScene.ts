import { _decorator, Component, Node, assetManager, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartScene')
export class StartScene extends Component {

    start() {
        console.log("StartScene: Starting to load bundles...");

        // 1. 加载主游戏资源包
        assetManager.loadBundle('Game', (err, bundle) => {
            if (err) {
                console.error("Failed to load Game bundle:", err);
                return;
            }
            console.log("Game bundle loaded successfully.");

            // 2. 加载主场景
            // 注意：由于我们将 mainScene.scene 移动到了 Game 文件夹下
            // 它现在属于 Game bundle，需要通过 bundle 加载
            bundle.loadScene('mainScene', (err, scene) => {
                if (err) {
                    console.error("Failed to load mainScene:", err);
                    return;
                }
                console.log("mainScene loaded, running scene...");
                director.runScene(scene);
            });
        });

        // 3. 后台预加载其他分包以提高后续体验
        assetManager.loadBundle('UI', (err, bundle) => {
            if (!err) console.log("UI bundle preloaded.");
        });
        assetManager.loadBundle('AudioAssets', (err, bundle) => {
            if (!err) console.log("AudioAssets bundle preloaded.");
        });
        assetManager.loadBundle('Effect', (err, bundle) => {
            if (!err) console.log("Effect bundle preloaded.");
        });
    }
}
