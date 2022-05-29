//import * as BABYLON from 'babylonjs';
//import { Engine } from "babylonjs";
//import { Scene } from 'babylonjs';


// import * as BABYLON from 'babylonjs';


class piLifeApp {

    constructor() {

        const canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;

        const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
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


        // var mesh1, mesh2, mesh3, mesh4;
        // var Meshes = [mesh1, mesh2, mesh3, mesh4];
        // let P_meshName = ["Orchid.glb", "OrchidPlant.glb", "SlipperOrchid.glb", "Cactus_01.glb"]

        // var createScene = function (scene: BABYLON.Scene, Canvas:any) {
        //     //scene.clearColor = new BABYLON.Color3.Black();
        //     scene.clearColor = new BABYLON.Color4(0,0,0,1);

        //     for (let index = 0; index < Meshes.length; index++) {

        //             BABYLON.SceneLoader.ImportMesh(
        //                 null,
        //                 "/Assets/Models/",//Local
        //                 //"https://xsandre-l.github.io/Assets/Models/",//non-Local
        //                 P_meshName[index],
        //                 scene,
        //                 function (
        //                     meshes:any,
        //                     materials:any
        //                 ) {
        //                     scene.createDefaultCameraOrLight(true);
        //                     scene._activeCamera?.attachControl(Canvas,true);
        //                 }
        //             );

        //     }

        //     var buttonbox = document.createElement('div');
        //     buttonbox.id = "buttonbox";
        //     buttonbox.style.position = "absolute";
        //     buttonbox.style.width = "100%";
        //     buttonbox.style.height = "5%";
        //     buttonbox.style.bottom = "3%";
        //     buttonbox.style.columnCount = "2";
        //     buttonbox.style.textAlign = "center";
        //     document.body.appendChild(buttonbox);


        //     var b8 = document.createElement('button');
        //     buttonbox.appendChild(b8);
        //     b8.id = "setLateralLeft";
        //     b8.style.borderRadius = "10px";
        //     b8.textContent = "<<";
        //     b8.style.display = "block";
        //     b8.style.width = "100%";
        //     b8.style.height = "100%";
        //     b8.style.fontSize = "2.1em";
        //     b8.style.backgroundColor = "#3C4043";
        //     b8.style.color = "#DCDCDC";
        //     b8.onclick = function () {
        //         if(CurrMesh - 2 >= 1)
        //         {
        //             CurrMesh -= 2;
        //         }

        //     };

        //     var b2 = document.createElement('button');
        //     buttonbox.appendChild(b2);
        //     b2.id = "setLateralRight";
        //     b2.style.borderRadius = "10px";
        //     b2.textContent = ">>";
        //     b2.style.display = "block";
        //     b2.style.width = "100%";
        //     b2.style.height = "100%";
        //     b2.style.fontSize = "2.1em";
        //     b2.style.backgroundColor = "#3C4043";
        //     b2.style.color = "#DCDCDC";
        //     b2.onclick = function () {
        //         if(CurrMesh + 2 <= 7)
        //         {
        //             //Test
        //             CurrMesh += 2;
        //         }
        //     };

        //     return scene;
        // };

        var mesh1;
        var Meshes = [mesh1];
        let P_meshName = ["Babylonstoren 3D Map.glb"]


        var createScene = function (myScene: BABYLON.Scene, Canvas: any) {


            point = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 30, segments: 32 }, myScene);
            // This creates and positions a free camera (non-mesh)
            // camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5000, -10), myScene);
            camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(0, 5000, -10), myScene, point);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.inputs.clear();



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
                    "../assets/",//Local
                    //"https://xsandre-l.github.io/Assets/Models/",//non-Local
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
                point.translate(new BABYLON.Vector3(0.1, 0, 0), BABYLON.Space.WORLD);

            }
            setInterval(RunLoop, 17);

            return scene;
        }

        createDefaultEngine();
        if (!engine) throw 'engine should not be null.';

        scene = createDefaultScene(scene);
        scene = createScene(scene, canvas);
        scene.environmentTexture = null;
        sceneToRender = scene;


        // scene.onReadyObservable.add( function(){






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
// let lat = 0;
// let long = 0;
let accuracy = 0;
let head = 0;

var errLocation = function (err: any) {
    let text = document.getElementById("text");
    if (text) { text.innerHTML = err.message; }
}

function GetGeoLocation() {
    if (!navigator.geolocation) {
        let text = document.getElementById("text");
        if (text) { text.innerHTML = `not supported`; }
    } else {

        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Getting Geolocation ...");
            //console.log(position.coords.latitude)

            //if (lat != position.coords.latitude || long != position.coords.longitude) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            accuracy = position.coords.accuracy;
            head = Number(position.coords.heading);
            console.log(`latitude : ${lat}  longitude : ${long}`);

            let text = document.getElementById("text");
            if (text) { text.innerHTML = `LAT : ${lat}  LONG : ${long} ACCURACY : ${accuracy} HEAD : ${head}`; }
            //}
            //-33.3692478,18.3920107
            // doSomething(position.coords.latitude, position.coords.longitude);
        }, errLocation, {
            enableHighAccuracy: true,
            maximumAge: 4000, // should be default, just in case
            timeout: 4000
            
        });//, { enableHighAccuracy: true, maximumAge: 10000 }

    }
}
setInterval(GetGeoLocation, 10000);
// GetGeoLocation();
//---