
//import * as BABYLON from 'babylonjs';
//import { Engine } from "babylonjs";
//import { Scene } from 'babylonjs';

//import { PolygonFence } from "./coordinate_translation";
// import * as BABYLON from '@babylonjs/core';



/////////////////////


const LB = {
    x: -33.826447,
    y: 18.924780,
    nx: -4500,
    ny: -2287
}
const RB = {
    x: -33.825517,
    y: 18.923640,
    nx: -4500,
    ny: 2287
}
const LF = {
    x: -33.824221,
    y: 18.928252,
    nx: 4500,
    ny: -2287
}
const RF = {
    x: -33.823227,
    y: 18.927184,
    nx: 4500,
    ny: 2287
}

const LB_tr = {
    tX: LB.nx / LB.x,
    tY: LB.nx / LB.x
}
const RB_tr = {
    tX: RB.nx / RB.x,
    tY: RB.ny / RB.y
}
const LF_tr = {
    tX: LF.nx / LF.x,
    tY: LF.ny / LF.y
}
const RF_tr = {
    tX: RF.nx / RF.x,
    tY: RF.ny / RF.y
}

let CURR_X: number;
let CURR_Y: number;

export function translateCoordinates(lat: number, long: number) {
    let x: number = 0;
    let y: number = 0;

    const dist_LB_RB = getDistance(LB.x, LB.y, RB.x, RB.y);
    const dist_LB_RB_N = getDistance(LB.nx, LB.ny, RB.nx, RB.ny);
    console.log('dist1 - ' + dist_LB_RB_N)

    const side1 = dist_LB_RB_N / dist_LB_RB;
    console.log('Change ' + side1)

    // const dist_LB_LF = getDistance(LB.x, LB.y, LF.x, LF.y);
    // const dist_LB_LF_N = getDistance(LB.nx, LB.ny, LF.nx, LF.ny);

    // const side2 = dist_LB_LF_N / dist_LB_LF;


    // x = lat * side1;
    // y = long * side2;

    //  get distance between curr and2 points
    const curr_point1 = getDistance(lat, long, LB.x, LB.y);
    const curr_point2 = getDistance(lat, long, RB.x, RB.y);
    console.log('old dist2 - ' + curr_point1);
    console.log('old dist3 - ' + curr_point2);

    const tryDist1 = curr_point1 * side1;
    const tryDist2 = curr_point2 * side1;

    console.log('new dist2 - ' + tryDist1)
    console.log('new dist2 - ' + tryDist2)



    //const dist_LB_Curr = getDistance()

    // difference between current lat/long and LB

    // const persentOfTotal = { // 
    //     PercX: (diff_LB_Curr.diff_x * 100)/diff_LB_RB.diff_x,
    //     PercY: (diff_LB_Curr.diff_y * 100)/diff_LB_RB.diff_y 
    // }
    //const PointTr = [LB_tr, RB_tr, LF_tr, RF_tr];


    // x += lat*LB_tr.tX;
    // y += long*LB_tr.tY;

    // PointTr.forEach(point => {
    //     x += lat*point.tX;
    //     y += long*point.tY;
    // });

    // x /= 4;
    // y /= 4;
    const points = calculate_third_point(LB.nx, LB.ny, RB.nx, RB.ny,dist_LB_RB, tryDist2, Math.acos((-2*dist_LB_RB*tryDist2)/ (tryDist2*tryDist2 - ((dist_LB_RB * dist_LB_RB) + (tryDist2*tryDist2 )))), false);


    // C^2 = b^2 + c^2 -2(b)(c)cosA

    // cos( (-2(b)(c)) / c^2 - (+b^2 + c^2)) = A

    Math.acos((-2*dist_LB_RB*tryDist2)/ (tryDist2*tryDist2 - ((dist_LB_RB * dist_LB_RB) + (tryDist2*tryDist2 ))))
    CURR_X = points.Px;
    CURR_Y = points.Py;
    console.log(CURR_X + '  ' + CURR_Y)
}

/**
 * Find the coordinates for the third point of a triangle.
 *
 * @param Ax - x coordinate value of first known point
 * @param Ay - y coordinate value of first known point
 * @param Cx - x coordinate value of second known point
 * @param Cy - y coordinate value of second known point
 * @param b - the length of side b
 * @param c - the length of side c
 * @param A - the angle of corner A
 * @param alt - set to true to return the alternative solution.
 * @returns {{Bx: *, By: *}}
 */
function calculate_third_point(Ax: number, Ay: number, Cx: number, Cy: number, b: number, c: number, A: any, alt: any) {

    console.log(Ax + ' ' + Ay + ' ' + Cx + ' ' + Cy + ' ' + b + ' ' + c + ' ' + A + ' ' + alt )
    var Bx;
    var By;
    alt = typeof alt === 'undefined' ? false : alt;

    //unit vector
    let uACx = (Cx - Ax) / b;
    let uACy = (Cy - Ay) / b;

    if(alt) {

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
        let uABy = - uACx * Math.sin(toRadians(A)) + uACy * Math.cos(toRadians(A));

        //second possible position
        Bx = Ax + c * uABx;
        By = Ay + c * uABy;
    }

    return {Px: Bx, Py: By};
}
/**
 * Convert degrees to radians.
 *
 * @param angle
 * @returns {number}
 */
 function toRadians (angle: number) {
    return angle * (Math.PI / 180);
}

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}


type point = { X: number, Y: number };
class PolygonFence {
    PointList: point[] = [
        { X: -33.826447, Y: 18.924780 },
        { X: -33.825517, Y: 18.923640 },
        { X: -33.824221, Y: 18.928252 },
        { X: -33.823227, Y: 18.927184 }];

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

    IsWithinFence(p: { X: number, Y: number }): boolean {
        const sides = this.Count();
        let j = sides - 1;
        let pointStatus: boolean = false;
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

        const canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;

        const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);//, { preserveDrawingBuffer: true, stencil: true }
        let scene: BABYLON.Scene = new BABYLON.Scene(engine);
        let sceneToRender: any = null;

        let point: BABYLON.Mesh;
        let camera;

        var createDefaultEngine = async () => {
            return new BABYLON.Engine(canvas, true);


            // var EN = new BABYLON.WebGPUEngine(canvas);
            // await EN.initAsync();
            // return EN;
        };

        var createDefaultScene = function (scene: BABYLON.Scene) {
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
        let P_meshName = ["Babylonstoren 3D Map.glb"]


        var createScene = function (myScene: BABYLON.Scene, Canvas: any) {

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

                BABYLON.SceneLoader.ImportMesh(
                    null,
                    //"../assets/",//Local
                    "https://xsandre-l.github.io/PiLifePlatform/assets/",//non-Local
                    P_meshName[index],
                    scene,
                    function (
                        meshes: any,
                        materials: any
                    ) {
                        scene.createDefaultCameraOrLight(true);
                        scene._activeCamera?.attachControl(Canvas, true);
                    }
                );
            }


            // Post Process [to be moved into ./Rendering/post-process]
            var motionblur = new BABYLON.MotionBlurPostProcess(
                "mb", // The name of the effect.
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
        }

        createDefaultEngine();
        if (!engine) throw 'engine should not be null.';

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
let geowatch: number;
let accuracy = 0;
let head = 0;

var errLocation = function (err: any) {
    let text = document.getElementById("text");
    if (text) { text.innerHTML = err.message; }

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
}
const PF = new PolygonFence();
function GetGeoLocation() {
    if (!geowatch) {
        if ("geolocation" in navigator && "watchPosition" in navigator.geolocation) {
            geowatch = navigator.geolocation.watchPosition((position) => {
                console.log("Getting Geolocation ...");
                //console.log(position.coords.latitude)

                let lat: number = position.coords.latitude;
                let long: number = position.coords.longitude;
                accuracy = position.coords.accuracy;
                head = Number(position.coords.heading);
                console.log(`latitude : ${lat}  longitude : ${long}`);

                let text = document.getElementById("text");
                

                // if then Translate Point into coordinates
                console.log(PF.IsWithinFence({ X: lat, Y: long }));
                if (PF.IsWithinFence({ X: lat, Y: long })) {
                    translateCoordinates(lat, long);
                    if (text) { text.innerHTML = `LAT : ${lat}  LONG : ${long}  ACCURACY : ${accuracy} HEAD : ${head} | YOU ARE IN THE GARDEN`; }
                }else{
                    if (text) { text.innerHTML = `LAT : ${lat}  LONG : ${long}  ACCURACY : ${accuracy} HEAD : ${head} | NOT IN THE GARDEN !`; }

                }


                //-33.3692478,18.3920107
                //-33.825517, 18.923640
            }, errLocation, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 15000

            });
        }
    } else {
        let text = document.getElementById("text");
        if (text) { text.innerHTML = `not supported`; }
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

