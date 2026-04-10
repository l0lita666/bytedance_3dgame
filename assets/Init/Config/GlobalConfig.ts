import { clamp, randomRange, v2, v3 } from "cc";
import { TrapInfo, WeaponInfo } from "./GlobalClass";

export const GlobalConfig = {
    //#region -------------框架配置

    //#endregion

    //#region --------------当前游戏自定义
    /**2D->3D的缩放大小 */
    Scale2DTo3D: 1 / 30,
    /**是否显示2d碰撞体 */
    ShowCollider2D: true,

    //奖励
    Award: {
        //
        WinAward: 612,
        WinLvStep: 38,          //关卡奖励递增数量
        WinVideoRate: 3.8,        //视频多倍
        LoseAward: 185,
        VideoAward: 520,          //视频奖励
        VideoMistryAward: 18,     //
        OnlineAwardMin: 345,        //每分钟奖励
        //体力
        addStep: 1,        //增长数量
        LvCost: 1,         //关卡消耗
        recoverTime: 280, //体力恢复时长
        max: 10,          //自动增长的体力上限
        //
    },

    //胜利奖励配置-按照此顺奖励序 
    AwardCfg: [
        //武器Id, lv:需要通过的关卡
        { id: 0, lv: 3 },
        { id: 1, lv: 3 },
        { id: 2, lv: 3 },
        { id: 3, lv: 3 },
        { id: 4, lv: 3 },
        { id: 5, lv: 3 },
    ],

    //商店物品价格配置
    GoodsCfg: {
        //武器-价格
        Weapon: {
            0: 320,
            1: 350,
            2: 380,
            3: 420,
            4: 450,
            5: 500,
        }
    },

    // 签到 7天奖励 配置: type:0 - 金币, 
    SignCfg: [
        { awardNum: 600, type: 0 },
        { awardNum: 900, type: 0 },
        { awardNum: 1100, type: 0 },
        { awardNum: 1300, type: 0 },
        { awardNum: 1600, type: 0 },
        { awardNum: 2000, type: 0 },
        { awardNum: 2500, type: 0 },
    ],

    //角色成长属性比例 配置
    RolePropCfg: {
        // 属性 -default:初始, step每一级增加, max：上限
        roleNum: { default: 1, step: 1, maxLv: 100 },
        goldRate: { default: 1, step: 0.1, maxLv: 50 },
        bossInfo: { default: 1, lvupNum: 3, maxLv: 27 },
        // 花费
        roleNumCost: { default: 120, step: 210 },
        goldRateCost: { default: 90, step: 420 },
        bossCost: { default: 1100, step: 280 },
        // 获取属性
        getRoleNumByLv: (lv: number) => {
            lv = clamp(lv, 1, lv);
            const _cfg = GlobalConfig.RolePropCfg;
            return (lv - 1) * _cfg.roleNum.step + _cfg.roleNum.default;
        },
        getGoldRateByLv: (lv: number) => {
            lv = clamp(lv, 1, lv);
            const _cfg = GlobalConfig.RolePropCfg;
            return (lv - 1) * _cfg.goldRate.step + _cfg.goldRate.default;
        },
        getBossInfoByLv: (lv: number) => {
            lv = clamp(lv, 1, lv);
            const _cfg = GlobalConfig.RolePropCfg;
            let res = { bossNum: 0, lastLv: 0 };
            res.bossNum = Math.floor((lv - 1) / _cfg.bossInfo.lvupNum) + 1;
            let stepLv = lv % _cfg.bossInfo.lvupNum;
            res.lastLv = stepLv == 0 ? 3 : stepLv;
            return res;
        },
        // 花费
        getRoleNumCostByLv: (lv: number) => {
            lv = clamp(lv, 1, lv);
            const _cfg = GlobalConfig.RolePropCfg;
            return (lv - 1) * _cfg.roleNumCost.step + _cfg.roleNumCost.default;
        },
        getGoldRateCostByLv: (lv: number) => {
            lv = clamp(lv, 1, lv);
            const _cfg = GlobalConfig.RolePropCfg;
            return (lv - 1) * _cfg.goldRateCost.step + _cfg.goldRateCost.default;
        },
        getBossCostByLv: (lv: number) => {
            lv = clamp(lv, 1, lv);
            const _cfg = GlobalConfig.RolePropCfg;
            return (lv - 1) * _cfg.bossCost.step + _cfg.bossCost.default;
        },
    },
    // 玩家 
    Player: {
        moveSpd: 7.25,
        //--普通
        scale: 1.25,     //模型缩放
        cldRadius: 1.05, //碰撞范围
        hp: 1,
        atkRate: 1.2,     //攻击比例
        checkRadius: 2.3,     //检测道具中心的半径
        //
        centerCldRadius: 2.2, //中心检测范围

        //--巨人--
        giantScale: 2.65,
        giantCldRadius: 1.15,
        giantHp: 10,
        giantAtkRate: 3.1,
    },

    EnemyCfg: {
        cldRadius: 1.1,
        creatSize: v2(4.8, 4.8), //刷新点附近的随机位置范围
        followDist: 7.5,          //追踪玩家中心的距离   
        lvupStep: 0.08,         //关卡成长
    },

    //敌方属性
    Enemy: {
        //普通兵
        0: {
            spd: 7.4,
            atk: 1,
            hp: 2,
            scale: 1.15,
        },
        //炸弹
        1: {
            spd: 8.8,
            atk: 1,
            hp: 8,
            scale: 1.22,
            boomRadius: 3.1,  //爆炸半径
            boomAtk: 2.8,
        },
        //刺客
        2: {
            spd: 10.8,
            atk: 1.3,
            hp: 5,
            scale: 1.4,
        },
        //巨人
        3: {
            spd: 7.8,
            atk: 1.6,
            hp: 18,
            scale: 2.9,
        },
        //Boss
        4: {
            spd: 7.2,
            atk: 1.6,
            hp: 30,
            scale: 2.6,
        },
    },

    //显示调试碰撞体3d
    ShowDebugCld: false,
    //显示调试视角
    ShowDebugCamera: false, //true false
    //调试视角高度
    DebugCameraHeight: 150,


    //以玩家为中心的可显示模型的区域
    VisibleSize: v2(80, 80),

    //以玩家为中心的可运行道具区域
    RunPropSize: v2(50, 50),

    //路面实际宽度
    RoadWidth: 9.32,  //9.25

    //玩家队形2d
    Formation: [{ "x": 0, "y": 0, "z": 0 }, { "x": 30, "y": 0, "z": 0 }, { "x": 15, "y": -30, "z": 0 }, { "x": -15, "y": -30, "z": 0 }, { "x": -30, "y": 0, "z": 0 }, { "x": -15, "y": 30, "z": 0 }, { "x": 15, "y": 30, "z": 0 }, { "x": 45, "y": 30, "z": 0 }, { "x": 60, "y": 0, "z": 0 }, { "x": 45, "y": -30, "z": 0 }, { "x": 30, "y": -60, "z": 0 }, { "x": 0, "y": -60, "z": 0 }, { "x": -30, "y": -60, "z": 0 }, { "x": -45, "y": -30, "z": 0 }, { "x": -60, "y": 0, "z": 0 }, { "x": -45, "y": 30, "z": 0 }, { "x": -30, "y": 60, "z": 0 }, { "x": 0, "y": 60, "z": 0 }, { "x": 30, "y": 60, "z": 0 }, { "x": 60, "y": 60, "z": 0 }, { "x": 75, "y": 30, "z": 0 }, { "x": 90, "y": 0, "z": 0 }, { "x": 75, "y": -30, "z": 0 }, { "x": 60, "y": -60, "z": 0 }, { "x": 45, "y": -90, "z": 0 }, { "x": 15, "y": -90, "z": 0 }, { "x": -15, "y": -90, "z": 0 }, { "x": -45, "y": -90, "z": 0 }, { "x": -60, "y": -60, "z": 0 }, { "x": -75, "y": -30, "z": 0 }, { "x": -90, "y": 0, "z": 0 }, { "x": -75, "y": 30, "z": 0 }, { "x": -60, "y": 60, "z": 0 }, { "x": -45, "y": 90, "z": 0 }, { "x": -15, "y": 90, "z": 0 }, { "x": 15, "y": 90, "z": 0 }, { "x": 45, "y": 90, "z": 0 }, { "x": 75, "y": 90, "z": 0 }, { "x": 90, "y": 60, "z": 0 }, { "x": 105, "y": 30, "z": 0 }, { "x": 120, "y": 0, "z": 0 }, { "x": 105, "y": -30, "z": 0 }, { "x": 90, "y": -60, "z": 0 }, { "x": 75, "y": -90, "z": 0 }, { "x": 60, "y": -120, "z": 0 }, { "x": 30, "y": -120, "z": 0 }, { "x": 0, "y": -120, "z": 0 }, { "x": -30, "y": -120, "z": 0 }, { "x": -60, "y": -120, "z": 0 }, { "x": -75, "y": -90, "z": 0 }, { "x": -90, "y": -60, "z": 0 }, { "x": -105, "y": -30, "z": 0 }, { "x": -120, "y": 0, "z": 0 }, { "x": -105, "y": 30, "z": 0 }, { "x": -90, "y": 60, "z": 0 }, { "x": -75, "y": 90, "z": 0 }, { "x": -60, "y": 120, "z": 0 }, { "x": -30, "y": 120, "z": 0 }, { "x": 0, "y": 120, "z": 0 }, { "x": 30, "y": 120, "z": 0 }, { "x": 60, "y": 120, "z": 0 }, { "x": 90, "y": 120, "z": 0 }, { "x": 105, "y": 90, "z": 0 }, { "x": 120, "y": 60, "z": 0 }, { "x": 135, "y": 30, "z": 0 }, { "x": 150, "y": 0, "z": 0 }, { "x": 135, "y": -30, "z": 0 }, { "x": 120, "y": -60, "z": 0 }, { "x": 105, "y": -90, "z": 0 }, { "x": 90, "y": -120, "z": 0 }, { "x": 75, "y": -150, "z": 0 }, { "x": 45, "y": -150, "z": 0 }, { "x": 15, "y": -150, "z": 0 }, { "x": -15, "y": -150, "z": 0 }, { "x": -45, "y": -150, "z": 0 }, { "x": -75, "y": -150, "z": 0 }, { "x": -90, "y": -120, "z": 0 }, { "x": -105, "y": -90, "z": 0 }, { "x": -120, "y": -60, "z": 0 }, { "x": -135, "y": -30, "z": 0 }, { "x": -150, "y": 0, "z": 0 }, { "x": -135, "y": 30, "z": 0 }, { "x": -120, "y": 60, "z": 0 }, { "x": -105, "y": 90, "z": 0 }, { "x": -90, "y": 120, "z": 0 }, { "x": -75, "y": 150, "z": 0 }, { "x": -45, "y": 150, "z": 0 }, { "x": -15, "y": 150, "z": 0 }, { "x": 15, "y": 150, "z": 0 }, { "x": 45, "y": 150, "z": 0 }, { "x": 75, "y": 150, "z": 0 }, { "x": 105, "y": 150, "z": 0 }, { "x": 120, "y": 120, "z": 0 }, { "x": 135, "y": 90, "z": 0 }, { "x": 150, "y": 60, "z": 0 }, { "x": 165, "y": 30, "z": 0 }, { "x": 180, "y": 0, "z": 0 }, { "x": 165, "y": -30, "z": 0 }, { "x": 150, "y": -60, "z": 0 }, { "x": 135, "y": -90, "z": 0 }, { "x": 120, "y": -120, "z": 0 }, { "x": 105, "y": -150, "z": 0 }, { "x": 90, "y": -180, "z": 0 }, { "x": 60, "y": -180, "z": 0 }, { "x": 30, "y": -180, "z": 0 }, { "x": 0, "y": -180, "z": 0 }, { "x": -30, "y": -180, "z": 0 }, { "x": -60, "y": -180, "z": 0 }, { "x": -90, "y": -180, "z": 0 }, { "x": -105, "y": -150, "z": 0 }, { "x": -120, "y": -120, "z": 0 }, { "x": -135, "y": -90, "z": 0 }, { "x": -150, "y": -60, "z": 0 }, { "x": -165, "y": -30, "z": 0 }, { "x": -180, "y": 0, "z": 0 }, { "x": -165, "y": 30, "z": 0 }, { "x": -150, "y": 60, "z": 0 }, { "x": -135, "y": 90, "z": 0 }, { "x": -120, "y": 120, "z": 0 }, { "x": -105, "y": 150, "z": 0 }, { "x": -90, "y": 180, "z": 0 }, { "x": -60, "y": 180, "z": 0 }, { "x": -30, "y": 180, "z": 0 }, { "x": 0, "y": 180, "z": 0 }, { "x": 30, "y": 180, "z": 0 }, { "x": 60, "y": 180, "z": 0 }, { "x": 90, "y": 180, "z": 0 }]
    ,
    //队形缩放
    FormationScale: 0.9,

    //#endregion
}

//武器配置: 类型顺序与 weaponType 一致
export const WeaponCfg: { [type: number]: WeaponInfo } = {
    //手枪
    0: {
        atk: 1.1,
        atkSpd: 2.1,
        perfab: 'Pistol',
        bullet: 'mergePistolBullet',
        bulletSpd: 22,
        propScale: 5.2,  //作为道具显示的缩放
    },
    //短枪
    1: {
        atk: 1.1,
        atkSpd: 1.1,
        perfab: 'Shotgun',
        bullet: 'mergeShotgunBullet',
        bulletSpd: 23,
        propScale: 3.2,  //作为道具显示的缩放
    },
    //喷火枪
    2: {
        atk: 3.3,
        atkSpd: 1.1,
        perfab: 'FireGun',
        bullet: 'mergeFireGunBullet',
        bulletSpd: 18,
        propScale: 2.1,  //作为道具显示的缩放
    },
    //机关枪
    3: {
        atk: 1.1,
        atkSpd: 3.3,
        perfab: 'MachineGun',
        bullet: 'mergeMachineGunBullet',
        bulletSpd: 33,
        propScale: 2.1,  //作为道具显示的缩放
    },
    //手榴弹
    4: {
        atk: 0.9,
        atkSpd: 1.1,
        perfab: 'Grenades',
        bullet: ' ', //todo
        bulletSpd: 5.5,
        propScale: 2.1,  //作为道具显示的缩放
        boomRadius: 3.3,  //爆炸范围
    },
    //无人机
    5: {
        atk: 1.1,
        atkSpd: 4.4,
        perfab: 'Drone',
        bullet: 'mergeDroneBullet',
        bulletSpd: 22,
        propScale: 2.1,  //作为道具显示的缩放
        droneheight: 7.2,
    },
}

//武器配置: 类型顺序与 weaponType 一致
export const TrapCfg: { [type: number]: TrapInfo } = {
    //圆形电锯
    0: {
        atk: 5,     //攻击力
        perfab: 'ElectricSaw',
        isMuilty: false,
    },
    //地刺
    1: {
        atk: 5,
        perfab: 'Spininess',
        isMuilty: false,
    },
    //锤子
    2: {
        atk: 5,
        perfab: 'Hammer',
        isMuilty: false,
    },
    //导弹
    3: {
        atk: 5,
        perfab: 'Rocket',
        isMuilty: true,
    },
    //炮台
    4: {
        atk: 5,
        atkSpd: 5,
        bulletType: 'mergeFortBarbetteBullet',
        perfab: 'FortBarbette',
        isMuilty: true,
    },
    //高空钉
    5: {
        atk: 5,
        perfab: 'UpperAirNail',
        isMuilty: false,
    },
    //地雷
    6: {
        atk: 5,
        perfab: 'LandMine',
        isMuilty: true,
    },
}