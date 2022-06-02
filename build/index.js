//import * as BABYLON from 'babylonjs';
//import { Engine } from "babylonjs";
//import { Scene } from 'babylonjs';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { PolygonFence } from "./coordinate_translation";
// import * as BABYLON from '@babylonjs/core';
/////////////////////
const LB = {
    x: -33.826447,
    y: 18.924780,
    nx: -4500,
    ny: -2287
};
const RB = {
    x: -33.825517,
    y: 18.923640,
    nx: -4500,
    ny: 2287
};
const LF = {
    x: -33.824221,
    y: 18.928252,
    nx: 4500,
    ny: -2287
};
const RF = {
    x: -33.823227,
    y: 18.927184,
    nx: 4500,
    ny: 2287
};
const LB_tr = {
    tX: LB.nx / LB.x,
    tY: LB.nx / LB.x
};
const RB_tr = {
    tX: RB.nx / RB.x,
    tY: RB.ny / RB.y
};
const LF_tr = {
    tX: LF.nx / LF.x,
    tY: LF.ny / LF.y
};
const RF_tr = {
    tX: RF.nx / RF.x,
    tY: RF.ny / RF.y
};
let CURR_X;
let CURR_Y;
export function translateCoordinates(lat, long) {
    let x = 0;
    let y = 0;
    const dist_LB_RB = getDistance(LB.x, LB.y, RB.x, RB.y);
    const dist_LB_RB_N = getDistance(LB.nx, LB.ny, RB.nx, RB.ny);
    const side1 = dist_LB_RB_N / dist_LB_RB;
    const dist_LB_LF = getDistance(LB.x, LB.y, LF.x, LF.y);
    const dist_LB_LF_N = getDistance(LB.nx, LB.ny, LF.nx, LF.ny);
    const side2 = dist_LB_LF_N / dist_LB_LF;
    x = lat * side1;
    y = long * side2;
    //  get distance between curr and2 points
    const curr_point1 = getDistance(lat, long, LB.x, LB.y);
    const curr_point2 = getDistance(lat, long, RB.x, RB.y);
    const tryDist1 = curr_point1 * side1;
    const tryDist2 = curr_point2 * side1;
    //const dist_LB_Curr = getDistance()
    // difference between current lat/long and LB
    // const persentOfTotal = { // 
    //     PercX: (diff_LB_Curr.diff_x * 100)/diff_LB_RB.diff_x,
    //     PercY: (diff_LB_Curr.diff_y * 100)/diff_LB_RB.diff_y 
    // }
    const PointTr = [LB_tr, RB_tr, LF_tr, RF_tr];
    // x += lat*LB_tr.tX;
    // y += long*LB_tr.tY;
    // PointTr.forEach(point => {
    //     x += lat*point.tX;
    //     y += long*point.tY;
    // });
    // x /= 4;
    // y /= 4;
    const points = calculate_third_point(LB.nx, LB.ny, RB.nx, RB.ny, dist_LB_RB, tryDist1, tryDist2, false);
    console.log(x + '  ' + y);
    CURR_X = points.Px;
    CURR_Y = points.Py;
}
function calculate_third_point(Ax, Ay, Cx, Cy, b, c, A, alt) {
    var Bx;
    var By;
    alt = typeof alt === 'undefined' ? false : alt;
    //unit vector
    let uACx = (Cx - Ax) / b;
    let uACy = (Cy - Ay) / b;
    if (alt) {
        //rotated vector
        let uABx = uACx * Math.cos(toRadians(A)) - uACy * Math.sin(toRadians(A));
        let uABy = uACx * Math.sin(toRadians(A)) + uACy * Math.cos(toRadians(A));
        //B position uses length of edge
        Bx = Ax + c * uABx;
        By = Ay + c * uABy;
    }
    else {
        //vector rotated into another direction
        let uABx = uACx * Math.cos(toRadians(A)) + uACy * Math.sin(toRadians(A));
        let uABy = -uACx * Math.sin(toRadians(A)) + uACy * Math.cos(toRadians(A));
        //second possible position
        Bx = Ax + c * uABx;
        By = Ay + c * uABy;
    }
    return { Px: Bx, Py: By };
}
/**
 * Convert degrees to radians.
 *
 * @param angle
 * @returns {number}
 */
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}
class PolygonFence {
    constructor() {
        this.PointList = [
            { X: -33.826447, Y: 18.924780 },
            { X: -33.825517, Y: 18.923640 },
            { X: -33.824221, Y: 18.928252 },
            { X: -33.823227, Y: 18.927184 }
        ];
    }
    // PolygonFence(points: point[])
    // {
    //     foreach (Point p in points)
    //     {
    //         this.PointList.Add(p);
    //     }
    // }
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
        const canvas = document.getElementById("renderCanvas");
        const engine = new BABYLON.Engine(canvas, true); //, { preserveDrawingBuffer: true, stencil: true }
        let scene = new BABYLON.Scene(engine);
        let sceneToRender = null;
        let point;
        let camera;
        var createDefaultEngine = () => __awaiter(this, void 0, void 0, function* () {
            return new BABYLON.Engine(canvas, true);
            // var EN = new BABYLON.WebGPUEngine(canvas);
            // await EN.initAsync();
            // return EN;
        });
        var createDefaultScene = function (scene) {
            // Setup the scene
            //scene = new BABYLON.Scene(engine);
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            // var camera = new BABYLON.ArcRotateCamera(
            //     "camera1",
            //     // -(Math.PI / 2), 
            //     // Math.PI / 2, 
            //     BABYLON.Tools.ToRadians(45),
            //     BABYLON.Tools.ToRadians(45),
            //     30,
            //     new BABYLON.Vector3(0, 5, 0),
            //     scene
            // );
            return scene;
        };
        var mesh1;
        var Meshes = [mesh1];
        let P_meshName = ["Babylonstoren 3D Map.glb"];
        var createScene = function (myScene, Canvas) {
            // Create Objects
            point = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const leftFront = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const rightFront = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const leftBack = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            const rightBack = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            leftFront.position = new BABYLON.Vector3(4500, 0, -2287);
            rightFront.position = new BABYLON.Vector3(4500, 0, 2287);
            leftBack.position = new BABYLON.Vector3(-4500, 0, -2287);
            rightBack.position = new BABYLON.Vector3(-4500, 0, 2287);
            // camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5000, -10), myScene);
            camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(8000, 4000, 0), myScene, point);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.inputs.clear();
            camera.heightOffset = 5000;
            camera.rotationOffset = 0;
            camera.noRotationConstraint = true;
            camera.radius = 1000;
            //133.03200303596768528483053511355
            // This attaches the camera to the canvas
            // camera.attachControl(Canvas, true);
            // camera.speed = 40;
            // camera.keysUp.push(87);
            // camera.keysDown.push(83);
            // camera.keysLeft.push(65);
            // camera.keysRight.push(68);
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), myScene);
            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;
            // Our built-in 'ground' shape. Params: name, options, scene
            //const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, myScene);
            for (let index = 0; index < Meshes.length; index++) {
                BABYLON.SceneLoader.ImportMesh(null, 
                //"../assets/",//Local
                "https://xsandre-l.github.io/PiLifePlatform/assets/", //non-Local
                P_meshName[index], scene, function (meshes, materials) {
                    var _a;
                    scene.createDefaultCameraOrLight(true);
                    (_a = scene._activeCamera) === null || _a === void 0 ? void 0 : _a.attachControl(Canvas, true);
                });
            }
            // Post Process [to be moved into ./Rendering/post-process]
            var motionblur = new BABYLON.MotionBlurPostProcess("mb", // The name of the effect.
            scene, // The scene containing the objects to blur according to their velocity.
            1.0, // The required width/height ratio to downsize to before computing the render pass.
            camera // The camera to apply the render pass to.
            );
            motionblur.motionStrength = 1.2;
            //----
            function RunLoop() {
                //point.translate(new BABYLON.Vector3(1, 0, 0), BABYLON.Space.WORLD);
                point.position = new BABYLON.Vector3(CURR_X, 0, CURR_Y);
            }
            setInterval(RunLoop, 16);
            return scene;
        };
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
                if (text) {
                    text.innerHTML = `LAT : ${lat}  LONG : ${long}  ACCURACY : ${accuracy} HEAD : ${head}`;
                }
                // if then Translate Point into coordinates
                console.log(PF.IsWithinFence({ X: lat, Y: long }));
                if (PF.IsWithinFence({ X: lat, Y: long })) {
                    translateCoordinates(lat, long);
                    if (text) {
                        text.innerHTML = `LAT : ${lat}  LONG : ${long}  ACCURACY : ${accuracy} HEAD : ${head} | YOU ARE IN THE GARDEN`;
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
