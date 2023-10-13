/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */

import * as gfx from 'gophergfx'
import { GUI, GUIController } from 'dat.gui'


export class ExampleApp extends gfx.GfxApp {
    private cameraControls: gfx.OrbitControls;
    private cylinder: gfx.Mesh3;
    private texture: gfx.Texture;

    private gui: GUI;
    public wireframe: boolean;


    // --- Create the ExampleApp class ---
    constructor() {
        // initialize the base class gfx.GfxApp
        super();

        // Load the texture
        this.texture = new gfx.Texture('./campbells.png');

        this.wireframe = true;
        this.gui = new GUI({ width: 300, closed: false });
        this.gui.add(this, 'wireframe')
            .onChange((value) => {
                this.wireframe = value;
                if (this.wireframe) {
                    this.cylinder.material = new gfx.WireframeMaterial();
                } else {
                    let phongMat = new gfx.PhongMaterial();
                    // TODO: Uncomment to see the texture once UV coordinates
                    // are created
                    // phongMat.texture = this.texture;
                    this.cylinder.material = phongMat;
                }
            });
        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.cylinder = new gfx.Mesh3();
    }

    // --- Initialize the graphics scene ---
    createScene(): void {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920 / 1080, 0.1, 10);
        this.cameraControls.setDistance(5);

        // Set a black background
        this.renderer.background.set(0, 0, 0);

        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.25, 0.25, 0.25));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.5, 0.5, 0.5));
        directionalLight.position.set(0, 1, 2)
        this.scene.add(directionalLight);

        // Add an axes display to the scene
        const axes = gfx.Geometry3Factory.createAxes(4);
        this.scene.add(axes);

        this.cylinder = this.createCylinderMesh();
        this.cylinder.material = new gfx.WireframeMaterial(); // default to wireframe
        this.scene.add(this.cylinder);
    }

    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void {
        this.cameraControls.update(deltaTime);
    }

    private createCylinderMesh(): gfx.Mesh3
    {
        const mesh: gfx.Mesh3 = new gfx.Mesh3();
        const vertices: gfx.Vector3[] = [];
        const normals: gfx.Vector3[] = [];
        const indices: number[] = [];
        // TODO: add a 'uvs' array for texture coordinates

        // example 1: two triangles
        vertices.push(new gfx.Vector3(-1, -1, 0)); // 0
        vertices.push(new gfx.Vector3(-1, 1, 0)); // 1
        vertices.push(new gfx.Vector3(1, -1, 0)); // 2
        vertices.push(new gfx.Vector3(1, 1, 0)); // 3

        normals.push(new gfx.Vector3(0, 0, 1)); // 0
        normals.push(new gfx.Vector3(0, 0, 1)); // 1
        normals.push(new gfx.Vector3(0, 0, 1)); // 2
        normals.push(new gfx.Vector3(0, 0, 1)); // 3

        // TODO: push texture coordinates to the 'uvs' array

        // triangle 1
        indices.push(0, 3, 1);
        // triangle 2
        indices.push(0, 2, 3);

        // example 2: bars
        // const nBars = 10;
        // for (let i=0; i<=nBars; i++) {
        //     // a goes 0..1 across the width
        //     const a = i / nBars;
        //     const xStart = -1;
        //     const xEnd = 1;
        //     const xRange = xEnd - xStart;
        //     const x = xStart + a * xRange;
        //     vertices.push(new gfx.Vector3(x, -1, 0));
        //     vertices.push(new gfx.Vector3(x, 1, 0));
        //     normals.push(new gfx.Vector3(0, 0, 1));
        //     normals.push(new gfx.Vector3(0, 0, 1));
        
        //     // TODO: push texture coordinates to the 'uvs' array
        // }

        // for (let i=0; i<nBars; i++) {
        //     // create two triangles each time through
        //     const offset = i*2;
        //     indices.push(offset + 0, offset + 3, offset + 1);
        //     indices.push(offset + 0, offset + 2, offset + 3);
        // }

        // example 3: cylinder barrel
        // const nSlices = 50; // number of pie slices in the cylinder
        // const height = 3;
        // for (let i=0; i<=nSlices; i++) {
        //     // a goes 0..1 around the circle
        //     const a = i / nSlices;
        //     const angle = a * 2 * Math.PI + Math.PI / 2; // + pi/2 so label is facing forward
        //     const x = Math.cos(angle);
        //     const z = Math.sin(-angle);
    
        //     vertices.push(new gfx.Vector3(x, -height / 2, z));
        //     normals.push(new gfx.Vector3(x, 0, z));
    
        //     vertices.push(new gfx.Vector3(x, height / 2, z));
        //     normals.push(new gfx.Vector3(x, 0, z));

        //     // TODO: push texture coordinates to the 'uvs' array
        // }
    
        // for (let i=0; i<nSlices; i++) {
        //     // create two triangles each time through
        //     const offset = i*2;
        //     indices.push(offset + 0, offset + 3, offset + 1);
        //     indices.push(offset + 0, offset + 2, offset + 3);
        // }

        mesh.setVertices(vertices);
        mesh.setIndices(indices);
        mesh.setNormals(normals);
        mesh.createDefaultVertexColors();

        // TODO: set texture coordinates on mesh

        return mesh;
    }
}
