"use strict";
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
// import * as BABYLON from '@babylonjs/core';
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
            // Creat4 Objects
            point = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            // camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5000, -10), myScene);
            camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(8000, 4000, 0), myScene, point);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.inputs.clear();
            camera.heightOffset = 5000;
            camera.rotationOffset = 0;
            camera.noRotationConstraint = true;
            camera.radius = 1000;
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
                "https://xsandre-l.github.io/pilifeplatform/assets/", //non-Local
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
                point.translate(new BABYLON.Vector3(1, 0, 0), BABYLON.Space.WORLD);
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
