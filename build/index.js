//import * as BABYLON from 'babylonjs';
//import { Engine } from "babylonjs";
//import { Scene } from 'babylonjs';
const path = 'https://xsandre-l.github.io/PiLifePlatform/';
// const path = '../';
const Departments = {
    Info: {
        pos: { x: -33.822943, z: 18.926317 },
    },
    Parking_DayVisitors: {
        pos: { x: -33.822252, z: 18.926559 },
    },
    Parking_Hotel: {
        pos: { x: -33.824077, z: 18.925289 },
    },
    Bakery: {
        pos: { x: -33.823777, z: 18.926940 },
    },
    FarmShop: {
        pos: { x: -33.823525, z: 18.927064 },
    },
    Butchery: {
        pos: { x: -33.823520, z: 18.926908 },
    },
    MilkRoom: {},
    SweatRoom: {},
    Pantry: {},
    FunctionsAndEvents: {
        pos: { x: -33.823690, z: 18.928110 },
    },
    ScentRoom: {},
    Cellars: {},
    HotelReception: {},
    OldBullfrog: {},
    GuavaAvenue: {},
    OliveAndCitrusOrchard: {},
    CycadCollection: {},
    WeaverNests: {
        pos: { x: -33.824803, z: 18.926983 },
    },
    Ducks: {
        pos: { x: -33.824893, z: 18.926829 },
    },
    Chickens: {
        pos: { x: -33.824998, z: 18.926711 },
    },
    Berries: {
        pos: { x: -33.825094, z: 18.926572 },
    },
    StreamAndCliviaWalk: {
        pos: { x: -33.825692, z: 18.926209 },
    },
    PricklyPearMaze: {
        pos: { x: -33.825277, z: 18.926287 },
    },
    CitrusBlock: {
        pos: { x: -33.825025, z: 18.926053 },
    },
    EdibleFlowerGarden: {
        pos: { x: -33.824769, z: 18.925812 },
    },
    CalabashSnail: {
        pos: { x: -33.824450, z: 18.926295 },
    },
    VegetableGarden: {
        pos: { x: -33.824711, z: 18.926531 },
    },
    StoneFruit: {
        pos: { x: -33.825424, z: 18.925439 },
    },
    SubtropicalFruit: {
        pos: { x: -33.825781, z: 18.925817 },
    },
    PuffAdder: {
        pos: { x: -33.826285, z: 18.925169 },
    },
    MulberryMeditation: {
        pos: { x: -33.826017, z: 18.925155 },
    },
    BeesAndMacadamias: {
        pos: { x: -33.826117, z: 18.925010 },
    },
    Nursery: {
        pos: { x: -33.826307, z: 18.924728 },
    },
    GardenOfTheSan: {
        pos: { x: -33.825823, z: 18.924846 },
    },
    Bathrooms: {
        pos: { x: -33.825531, z: 18.924584 },
    },
    SpaEntrance: {
        pos: { x: -33.825549, z: 18.924189 },
    },
    GreenhouseRestaurant: {
        pos: { x: -33.825649, z: 18.924088 },
    },
    HealingGarden: {
        pos: { x: -33.825932, z: 18.924012 },
    },
    CliviaHouse: {
        pos: { x: -33.826581, z: 18.925027 },
    },
    SucculentHouse: {
        pos: { x: -33.826719, z: 18.924869 },
    },
    SpiceHouse: {
        pos: { x: -33.826187, z: 18.924316 },
    },
    WelwitschiaRockery: {},
    KitchenGarden: {},
    WaterBlommetjiePond: {},
    RicePaddy: {},
    Wetland: {},
    Babel: {
        pos: { x: -33.823756, z: 18.926544 },
        iconPath: `${path}assets/textures/Restoraunt Icon.png`
    },
    GlasKas: {
        pos: { x: -33.825649, z: 18.924088 },
        iconPath: `${path}assets/textures/Restoraunt Icon.png`
    }
};
// const LB = {
//     x: -33.826447,
//     y: 18.924780,
//     nx: -4500,
//     ny: -2287
// }
// const RB = {
//     x: -33.825517,
//     y: 18.923640,
//     nx: -4500,
//     ny: 2287
// }
// const RF = {
//     x: -33.823227,
//     y: 18.927184,
//     nx: 4500,
//     ny: 2287
// }
// const LF = {
//     x: -33.824221,
//     y: 18.928252,
//     nx: 4500,
//     ny: -2287
// }
const LB = {
    x: -33.840022,
    y: 18.936838,
    nx: 3688,
    ny: 51928
};
const RB = {
    x: -33.840022,
    y: 18.910960,
    nx: 56819,
    ny: 9297
};
const RF = {
    x: -33.817955,
    y: 18.910960,
    nx: 14977,
    ny: -46506
};
const LF = {
    x: -33.817955,
    y: 18.936838,
    nx: -41392,
    ny: -1278
};
// RB -33.82
let CURR_X;
let CURR_Y;
export function translateCoordinates(lat, long) {
    // let x: number = 0;
    // let y: number = 0;
    const dist_LB_RB = getDistance(LB.x, LB.y, RB.x, RB.y);
    const dist_LB_RB_N = getDistance(LB.nx, LB.ny, RB.nx, RB.ny);
    //console.log('dist 1 old - ' + dist_LB_RB);
    // console.log('dist1 - ' + dist_LB_RB_N)
    const side1Change = dist_LB_RB_N / dist_LB_RB;
    //console.log('Change ' + side1Change)
    //  get distance between curr and2 points
    const dist_P_LB = getDistance(lat, long, LB.x, LB.y);
    const dist_P_RB = getDistance(lat, long, RB.x, RB.y);
    const tryDist1 = dist_P_LB * side1Change;
    const tryDist2 = (dist_P_RB * side1Change);
    //const Aang = Math.acos(((Math.pow(dist_LB_RB_N,2) + Math.pow(tryDist1,2) - Math.pow(tryDist2 , 2)) / (2 * dist_LB_RB_N * tryDist1)));
    const Aang = Math.acos(((dist_LB_RB ** 2 + dist_P_LB ** 2 - dist_P_RB ** 2) / (2 * dist_LB_RB * dist_P_LB)));
    //console.log(ang);
    const points = calculate_third_point(LB.nx, LB.ny, RB.nx, RB.ny, dist_LB_RB_N, tryDist1, Aang, false);
    // C^2 = b^2 + c^2 -2(b)(c)cosA
    // acos( (c^2 + b^2 - a^2) / (2(b)(c))) = A
    // Math.acos((dist_LB_RB_N**2+tryDist1**2-tryDist2**2) / (2*dist_LB_RB_N*tryDist1))
    //(points.Px > 0 ? points.Px / 1.4 : points.Px)
    //+ (1 * (tryDist1 < tryDist2 ? tryDist1 / 2.9 : tryDist2 / 2.9))
    // return { x: ((points.Px *-1) + 2100)/1.1, z: (((points.Py*-1) +3200) /1.1)}
    return { x: (((points.Px * -1) + 2100) / 1.1), z: points.Px > 0 ? (((points.Py * -1) + 3200) / 1.1) : (((points.Py * -1) + 3500) / 1.1) };
}
/**
 * Find the coordinates for the third point of a triangle.
 *
 * @param LBx - x coordinate value of first known point
 * @param LBy - y coordinate value of first known point
 * @param RBx - x coordinate value of second known point
 * @param RBy - y coordinate value of second known point
 * @param b - the length of side b
 * @param c - the length of side c
 * @param A - the angle of corner A
 * @param alt - set to true to return the alternative solution.
 * @returns {{Bx: *, By: *}}
 */
function calculate_third_point(LBx, LBy, RBx, RBy, b, c, A, alt) {
    //console.log(LBx + ' ' + LBy + ' ' + RBx + ' ' + RBy + ' ' + b + ' ' + c + ' ' + A + ' ' + alt)
    var Bx;
    var By;
    alt = typeof alt === 'undefined' ? false : alt;
    //unit vector
    let uACx = (RBx - LBx) / b; // actual coords per new base unit
    let uACy = (RBy - LBy) / b;
    if (alt) {
        //rotated vector
        let uABx = uACx * Math.cos(A) - uACy * Math.sin(A);
        let uABy = uACx * Math.sin(A) + uACy * Math.cos(A);
        //B position uses length of edge
        Bx = LBx + c * uABx;
        By = LBy + c * uABy;
    }
    else {
        //vector rotated into another direction
        let uABx = uACx * Math.cos(A) + uACy * Math.sin(A);
        let uABy = -uACx * Math.sin(A) + uACy * Math.cos(A);
        //second possible position
        Bx = LBx + c * uABx;
        By = LBy + c * uABy;
    }
    return { Px: Bx, Py: By };
}
function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}
class PolygonFence {
    constructor() {
        this.PointList = [
            { X: LB.x, Y: LB.y },
            { X: RB.x, Y: RB.y },
            { X: RF.x, Y: RF.y },
            { X: LF.x, Y: LF.y }
        ];
    }
    Count() {
        return this.PointList.length;
    }
    IsWithinFence(p) {
        const sides = this.Count();
        let j = sides - 1;
        let pointStatus = false;
        for (let index = 0; index < sides; index++) {
            const element = this.PointList[index];
            if (this.PointList[index].Y < p.Y && this.PointList[j].Y >= p.Y || this.PointList[j].Y < p.Y && this.PointList[index].Y >= p.Y) {
                if (this.PointList[index].X + (p.Y - this.PointList[index].Y) / (this.PointList[j].Y - this.PointList[index].Y) * (this.PointList[j].X - this.PointList[index].X) < p.X) {
                    pointStatus = !pointStatus;
                }
            }
            j = index;
        }
        return pointStatus;
    }
}
//////////////////////
class piLifeApp {
    constructor() {
        this.camMode = true;
        const canvas = document.getElementById("renderCanvas");
        const engine = new BABYLON.Engine(canvas, true); //, { preserveDrawingBuffer: true, stencil: true }
        let scene = new BABYLON.Scene(engine);
        let sceneToRender = null;
        let point;
        //let camMode: boolean = true;
        let followCamera;
        let flyCamera;
        let deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        var createDefaultEngine = async () => {
            // 
            const webGPUSupported = await BABYLON.WebGPUEngine.IsSupportedAsync;
            if (false) {
                const engine = new BABYLON.WebGPUEngine(canvas, { antialiasing: true });
                await engine.initAsync();
                return engine;
            }
            else {
                console.log("WebGPU Not Supported. Defaulted To WebGL");
                return new BABYLON.Engine(canvas, true);
            }
        };
        var createDefaultScene = function (scene) {
            // Setup the scene
            //scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            return scene;
        };
        let mesh1;
        let DepartmentPin;
        var Meshes = [mesh1, DepartmentPin];
        let P_meshName = ["Babylonstoren 3D Map.glb", "Department Pin.glb"];
        var createScene = function (myScene, Canvas) {
            // Create Objects
            var material0 = new BABYLON.StandardMaterial("mat0", scene);
            material0.diffuseColor = new BABYLON.Color3(255, 0, 0);
            point = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 40, segments: 32 }, myScene);
            point.rotate(new BABYLON.Vector3(0, 1, 0), 1.5);
            point.material = material0;
            const leftFront = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const rightFront = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const leftBack = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const rightBack = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            leftFront.position = new BABYLON.Vector3(4500, 0, -2287);
            rightFront.position = new BABYLON.Vector3(4500, 0, 2287);
            leftBack.position = new BABYLON.Vector3(-4500, 0, -2287);
            rightBack.position = new BABYLON.Vector3(-4500, 0, 2287);
            drawDashedLine([new BABYLON.Vector3(LB.nx, 0, LB.ny), new BABYLON.Vector3(RB.nx, 1, RB.ny), new BABYLON.Vector3(RF.nx, 1, RF.ny), new BABYLON.Vector3(LF.nx, 1, LF.ny), new BABYLON.Vector3(LB.nx, 1, LB.ny)], scene);
            // followCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5000, -10), myScene);
            followCamera = new BABYLON.FollowCamera("followcam", new BABYLON.Vector3(8000, 4000, 0), myScene);
            followCamera.lockedTarget = point;
            followCamera.heightOffset = 5000;
            followCamera.noRotationConstraint = false;
            followCamera.radius = 1000;
            followCamera.maxZ = 100000;
            followCamera.minZ = 100;
            followCamera.lowerHeightOffsetLimit = 1000;
            followCamera.upperHeightOffsetLimit = 8000;
            followCamera.cameraAcceleration = 0.1;
            followCamera.maxCameraSpeed = 50;
            followCamera.speed = 0;
            followCamera.upperRotationOffsetLimit = 0;
            followCamera.lowerRotationOffsetLimit = 0;
            followCamera.rotationOffset = -440;
            // function createFlyCam(scene: BABYLON.Scene) {
            //     flyCamera = new BABYLON.FlyCamera('flycam', new BABYLON.Vector3(0, 4000, 0), scene);
            //     flyCamera.setTarget(BABYLON.Vector3.Zero());
            //     flyCamera.speed = 100;
            //     flyCamera.rollCorrect = 5;
            //     flyCamera.maxZ = 100000;
            //     flyCamera.minZ = 100;
            //     flyCamera.attachControl();
            // }
            // createFlyCam(scene);
            // scene.setActiveCameraById('flycam');
            // followCamera.inverseRotationSpeed = 0.1;
            //followCamera.inputs.removeByType('ArcRotateCameraPointersInput');
            //followCamera.inputs.removeByType('FollowCameraPointersInput')
            // followCamera.cameraAcceleration =100;
            //followCamera.inputs.attached.wheelDeltaPercentage();
            scene.onPointerDown = (evt) => {
                if (evt.button == 0) {
                    engine.enterPointerlock();
                }
                // if (evt.button == 1) {
                //     engine.exitPointerlock();
                // }
            };
            let camMode = false;
            window.addEventListener("keydown", function (e) {
                if (e.altKey) {
                    if (camMode == false) {
                        console.log('FOLLOW CAM');
                        camMode = true;
                        scene.setActiveCameraById('followcam');
                    }
                    else {
                        console.log('FLYCAM');
                        camMode = false;
                        //createFlyCam(scene);
                        scene.setActiveCameraById('flycam');
                    }
                }
            });
            //scene.onKeyboardObservable
            scene.setActiveCameraById('followcam');
            //133.03200303596768528483053511355
            // This attaches the followCamera to the canvas
            // followCamera.attachControl(Canvas, true);
            // followCamera.speed = 40;
            // followCamera.keysUp.push(87);
            // followCamera.keysDown.push(83);
            // followCamera.keysLeft.push(65);
            // followCamera.keysRight.push(68);
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), myScene);
            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;
            for (let index = 0; index < Meshes.length; index++) {
                BABYLON.SceneLoader.ImportMesh("", 
                //"../assets/",//Local
                "https://xsandre-l.github.io/PiLifePlatform/assets/", //non-Local
                P_meshName[index], scene, async function (meshes, materials) {
                    var _a;
                    //scene.createDefaultCameraOrLight(true);
                    (_a = scene._activeCamera) === null || _a === void 0 ? void 0 : _a.attachControl(Canvas, true);
                    if (index == 1) {
                        var vals = Object.values(Departments);
                        for (let depo in vals) {
                            if (vals[depo].pos) {
                                const { x, z } = vals[depo].pos;
                                //console.log(x + ' ' + z);
                                if (x) {
                                    const pos = translateCoordinates(x, z);
                                    createDepartmentPin(meshes[0], new BABYLON.Vector3(pos.x, 0, pos.z), Departments.Babel.iconPath, scene);
                                }
                            }
                        }
                    }
                });
            }
            var pipeline = new BABYLON.DefaultRenderingPipeline("defaultPipeline", // The name of the pipeline
            true, // Do you want the pipeline to use HDR texture?
            scene, // The scene instance
            [followCamera] // The list of cameras to be attached to
            );
            pipeline.samples = 4;
            pipeline.fxaaEnabled = true;
            pipeline.grainEnabled = true;
            pipeline.grain.intensity = 2;
            //Post Process [to be moved into ./Rendering/post-process]
            var motionblur = new BABYLON.MotionBlurPostProcess("mb", // The name of the effect.
            scene, // The scene containing the objects to blur according to their velocity.
            1.0, // The required width/height ratio to downsize to before computing the render pass.
            followCamera // The followCamera to apply the render pass to.
            );
            motionblur.motionStrength = 1.2;
            let lines = drawDashedLine([new BABYLON.Vector3(LB.nx, 0, LB.ny), new BABYLON.Vector3(RB.nx, 0, RB.ny), new BABYLON.Vector3(point.position.x, 1, point.position.z), new BABYLON.Vector3(LB.nx, 0, LB.ny)], scene);
            const RunLoop = () => {
                //point.translate(new BABYLON.Vector3(1, 0, 0), BABYLON.Space.WORLD);
                //point.position = new BABYLON.Vector3(CURR_X, 0, CURR_Y);
                if (getDistance(CURR_X, CURR_Y, point.position.x, point.position.z) > 10) {
                    //console.log(getDistance(CURR_X,CURR_Y,point.position.x,point.position.z))
                    point.translate(new BABYLON.Vector3(CURR_X - point.position.x, 0, CURR_Y - point.position.z).normalize(), (getDistance(CURR_X, CURR_Y, point.position.x, point.position.z) * 0.05), BABYLON.Space.WORLD);
                    lines.dispose();
                    lines = drawDashedLine([new BABYLON.Vector3(LB.nx, 1, LB.ny), new BABYLON.Vector3(RB.nx, 1, RB.ny), new BABYLON.Vector3(point.position.x, 1, point.position.z), new BABYLON.Vector3(LB.nx, 1, LB.ny)], scene);
                }
            };
            setInterval(RunLoop, 16);
            return scene;
        };
        async function createDepartmentPin(pinMesh, pinPosition, texturePath, scene) {
            let newPin = await pinMesh.clone("newPin");
            newPin.position = new BABYLON.Vector3(pinPosition.x, 0, pinPosition.z);
            newPin.scaling = new BABYLON.Vector3(100, 100, 100);
            let BabelRestoraunt_Icon = BABYLON.MeshBuilder.CreatePlane('Icon', { height: 150, width: 100 }, scene);
            let BabelIconMat = new BABYLON.PBRMaterial('IconMat', scene);
            // let BabelIconTex = 
            BabelIconMat.albedoTexture = await new BABYLON.Texture(texturePath, scene, true);
            BabelIconMat.albedoColor = new BABYLON.Color3(0.5, 0.1, 1);
            BabelIconMat.opacityTexture = await new BABYLON.Texture(texturePath, scene, true);
            BabelIconMat.transparencyMode = 2;
            BabelIconMat.metallic = 0;
            BabelIconMat.roughness = 100;
            BabelRestoraunt_Icon.material = BabelIconMat;
            BabelIconMat.needAlphaTesting();
            BabelRestoraunt_Icon.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
            BabelRestoraunt_Icon.position = new BABYLON.Vector3(pinPosition.x, 300, pinPosition.z);
        }
        createDefaultEngine();
        if (!engine)
            throw 'engine should not be null.';
        scene = createDefaultScene(scene);
        scene = createScene(scene, canvas);
        scene.environmentTexture = null;
        sceneToRender = scene;
        // Start rendering the scene based on the engine render loop.
        engine.runRenderLoop(function () {
            if (sceneToRender) {
                sceneToRender.render();
            }
        });
        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }
}
new piLifeApp();
function drawDashedLine(pointArray, scene, inst) {
    const options = {
        points: pointArray, //vec3 array,
    };
    let dashedlines = BABYLON.MeshBuilder.CreateDashedLines("dashedlines", options, scene); //scene is optional and defaults to the current scene
    // Update
    options.points[0].x += 6;
    options.instance = dashedlines;
    return dashedlines = BABYLON.MeshBuilder.CreateDashedLines("dashedlines", options); //No scene 
}
// export default engine;
// Location
let geowatch;
let accuracy = 0;
let head = 0;
var errLocation = function (err) {
    let text = document.getElementById("text");
    if (text) {
        text.innerHTML = err.message;
    }
    switch (err.code) {
        case err.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case err.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case err.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case err.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
    }
};
const PF = new PolygonFence();
function GetGeoLocation() {
    if (!geowatch) {
        if ("geolocation" in navigator && "watchPosition" in navigator.geolocation) {
            geowatch = navigator.geolocation.watchPosition((position) => {
                console.log("Getting Geolocation ...");
                //console.log(position.coords.latitude)
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                accuracy = position.coords.accuracy;
                head = Number(position.coords.heading);
                console.log(`latitude : ${lat}  longitude : ${long}`);
                let text = document.getElementById("text");
                // if then Translate Point into coordinates
                console.log(PF.IsWithinFence({ X: lat, Y: long }));
                if (PF.IsWithinFence({ X: lat, Y: long })) {
                    const curr = translateCoordinates(lat, long);
                    CURR_X = curr.x;
                    CURR_Y = curr.z; //4064.9325016956275
                    if (text) {
                        text.innerHTML = `LOC : ${lat}, ${long}   | <span class="in">YOU ARE IN THE GARDEN</span>`;
                    }
                }
                else {
                    if (text) {
                        text.innerHTML = `LOC : ${lat}, ${long}   | <span class="out">NOT IN THE GARDEN !</span>`;
                    }
                }
                //-33.3692478,18.3920107
                //-33.825517, 18.923640
            }, errLocation, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 15000
            });
        }
    }
    else {
        let text = document.getElementById("text");
        if (text) {
            text.innerHTML = `not supported`;
        }
    }
}
GetGeoLocation();
function stopWatch() {
    navigator.geolocation.clearWatch(geowatch);
    geowatch = NaN;
}
//setInterval(GetGeoLocation, 10000);
// GetGeoLocation();
//---
