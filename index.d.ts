/**
 * @fileoverview Declarations for the pose tracking API.
 */

/**
 * Version number of this package.
 */
export const VERSION: string;

/**
 * Represents pairs of (start,end) indexes so that we can connect landmarks
 * with lines to provide a skeleton when we draw the points.
 */
export declare type LandmarkConnectionArray = Array<[number, number]>;

/**
 * PoseEvent.onPose returns an array of landmarks. This array provides the
 * edges to connect those landmarks to one another.
 */
export declare const POSE_N_CONNECTIONS: LandmarkConnectionArray;



/**
 * Subgroup of FACEMESH_CONNECTIONS.
 */
 export declare const FACEMESH_LIPS: LandmarkConnectionArray;

 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_LEFT_EYE: LandmarkConnectionArray;
 
 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_LEFT_EYEBROW: LandmarkConnectionArray;
 
 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_LEFT_IRIS: LandmarkConnectionArray;
 
 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_RIGHT_EYE: LandmarkConnectionArray;
 
 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_RIGHT_EYEBROW: LandmarkConnectionArray;
 
 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_RIGHT_IRIS: LandmarkConnectionArray;
 
 /**
  * Subgroup of FACEMESH_CONNECTIONS.
  */
 export declare const FACEMESH_FACE_OVAL: LandmarkConnectionArray;
 
 /**
  * onResults returns an array of landmarks. This array provides the combination
  * of contours listed above.
  */
 export declare const FACEMESH_CONTOURS: LandmarkConnectionArray;
 
 /**
  * onResults returns an array of landmarks. This array provides the edges of
  * the full set of landmarks.
  */
 export declare const FACEMESH_TESSELATION: LandmarkConnectionArray;
 

/**
 * Provide a way to access landmarks by their friendly names. Using an
 * interface allows us to prevent obfuscation for external javascript linkage,
 * while still allowing optimization for internal linkages.
 */
export declare const POSE_LANDMARKS: {
  NOSE: number,
  RIGHT_EYE_INNER: number,
  RIGHT_EYE: number,
  RIGHT_EYE_OUTER: number,
  LEFT_EYE_INNER: number,
  LEFT_EYE: number,
  LEFT_EYE_OUTER: number,
  RIGHT_EAR: number,
  LEFT_EAR: number,
  MOUTH_RIGHT: number,
  MOUTH_LEFT: number,
  RIGHT_SHOULDER: number,
  LEFT_SHOULDER: number,
  RIGHT_ELBOW: number,
  LEFT_ELBOW: number,
  RIGHT_WRIST: number,
  LEFT_WRIST: number,
  RIGHT_PINKY: number,
  LEFT_PINKY: number,
  RIGHT_INDEX: number,
  LEFT_INDEX: number,
  RIGHT_THUMB: number,
  LEFT_THUMB: number,
  RIGHT_HIP: number,
  LEFT_HIP: number
};

/**
 * Just the left-side landmarks for pose.
 */
export declare const POSE_LANDMARKS_LEFT: {
  LEFT_EYE_INNER: number,
  LEFT_EYE: number,
  LEFT_EYE_OUTER: number,
  LEFT_EAR: number,
  LEFT_RIGHT: number,
  LEFT_SHOULDER: number,
  LEFT_ELBOW: number,
  LEFT_WRIST: number,
  LEFT_PINKY: number,
  LEFT_INDEX: number,
  LEFT_THUMB: number,
  LEFT_HIP: number,
  LEFT_KNEE: number,
  LEFT_ANKLE: number,
  LEFT_HEEL: number,
  LEFT_FOOT_INDEX: number,
};

/**
 * Just the right-side landmarks for pose.
 */
export declare const POSE_LANDMARKS_RIGHT: {
  RIGHT_EYE_INNER: number,
  RIGHT_EYE: number,
  RIGHT_EYE_OUTER: number,
  RIGHT_EAR: number,
  RIGHT_LEFT: number,
  RIGHT_SHOULDER: number,
  RIGHT_ELBOW: number,
  RIGHT_WRIST: number,
  RIGHT_PINKY: number,
  RIGHT_INDEX: number,
  RIGHT_THUMB: number,
  RIGHT_HIP: number,
  RIGHT_KNEE: number,
  RIGHT_ANKLE: number,
  RIGHT_HEEL: number,
  RIGHT_FOOT_INDEX: number
};

/**
 * Just the neutral landmarks for pose.
 */
export declare const POSE_LANDMARKS_NEUTRAL: {
  NOSE: number,
};

/**
 * Represents a single normalized landmark.
 */
export declare interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

/**
 * Detected points are returned as a collection of normalized landmarks.
 */
export type NormalizedLandmarkList = NormalizedLandmark[];

/**
 * Multiple lists of landmarks.
 */
 export type NormalizedLandmarkListList = NormalizedLandmarkList[];


/**
 * Shows the vertex type of a mesh in order to decode the vertex buffer list.
 */
export interface VertexType {
  VERTEX_PT: 0;  // Position (XYZ) + Texture (UV)
}

/**
 * Shows the type of primitive shape in a mesh in order to give shape.
 */
export interface PrimitiveType {
  TRIANGLE: 0;
}

/**
 * Represents the Layout of a Matrix for the MatrixData proto
 */
export interface Layout {
  COLUMN_MAJOR: 0;
  ROW_MAJOR: 1;
}


/**
 * A const object harboring all the default variables for the perspective
 * camera in FaceGeometry
 */
export interface DefaultCameraParams {
  verticalFovDegrees: 63.0;
  near: 1.0;
  far: 10000.0;
}

/**
 * Collects the enums into a single namespace
*/
export declare const FACE_GEOMETRY: {
  VertexType: VertexType,
  PrimitiveType: PrimitiveType,
  Layout: Layout,
  DEFAULT_CAMERA_PARAMS: DefaultCameraParams;
};

/**
 * A representation of a mesh given by the Mesh3d proto
 */
export interface Mesh {
  getVertexBufferList(): Float32Array;
  getVertexType(): VertexType;
  getIndexBufferList(): Uint32Array;
  getPrimitiveType(): PrimitiveType;
}

/**
 * A representation of a matrix given by the MatrixData proto.
 */
export interface MatrixData {
  getPackedDataList(): number[];
  getRows(): number;
  getCols(): number;
  getLayout(): Layout;
}

/**
 * A representation of a face geometry from the face geometry proto.
 */
export interface FaceGeometry {
  getMesh(): Mesh;
  getPoseTransformMatrix(): MatrixData;
}

/**
 * Converts a MatrixData proto to a traditional JS array.
 */
 export function matrixDataToMatrix(mat: MatrixData): number[][];


/**
 * Represents a single landmark (not normalized).
 */
export interface Landmark extends NormalizedLandmark {}

/**
 * Detected points are returned as a collection of landmarks.
 */
export type LandmarkList = Landmark[];

/**
 * We support several ways to get image inputs.
 */
export type InputImage = HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;

/**
 * Legal inputs.
 */
export interface InputMap {
  image: InputImage;
}

/**
 * GpuBuffers should all be compatible with Canvas' `drawImage`
 */
type GpuBuffer = HTMLCanvasElement|HTMLImageElement|ImageBitmap;


// pose related
/**
 * Possible results from Pose.
 */
export interface Results {
  poseLandmarks: NormalizedLandmarkList;
  poseWorldLandmarks: LandmarkList;
  segmentationMask: GpuBuffer;
  image: GpuBuffer;
}

/**
 * Configurable options for Pose.
 */
export interface Options {
  selfieMode?: boolean;
  modelComplexity?: 0|1|2;
  smoothLandmarks?: boolean;
  enableSegmentation?: boolean;
  smoothSegmentation?: boolean;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
}

/**
 * Listener for any results from Pose.
 */
export type ResultsListener = (results: Results) => (Promise<void>|void);

/**
 * Contains all of the setup options to drive the pose solution.
 */
export interface PoseConfig {
  locateFile?: (path: string, prefix?: string) => string;
}

/**
 * Declares the interface of Pose.
 */
declare interface PoseInterface {
  close(): Promise<void>;
  onResults(listener: ResultsListener): void;
  initialize(): Promise<void>;
  reset(): void;
  send(inputs: InputMap, at?: number): Promise<void>;
  setOptions(options: Options): void;
}

/**
 * Encapsulates the entire Pose solution. All that is needed from the developer
 * is the source of the image data. The user will call `send`
 * repeatedly and if a pose is detected, then the user can receive callbacks
 * with this metadata.
 */
export declare class Pose implements PoseInterface {
  constructor(config?: PoseConfig);

  /**
   * Shuts down the object. Call before creating a new instance.
   */
  close(): Promise<void>;

  /**
   * Registers a single callback that will carry any results that occur
   * after calling Send().
   */
  onResults(listener: ResultsListener): void;

  /**
   * Initializes the solution. This includes loading ML models and mediapipe
   * configurations, as well as setting up potential listeners for metadata. If
   * `initialize` is not called manually, then it will be called the first time
   * the developer calls `send`.
   */
  initialize(): Promise<void>;

  /**
   * Tells the graph to restart before the next frame is sent.
   */
  reset(): void;

  /**
   * Processes a single frame of data, which depends on the options sent to the
   * constructor.
   */
  send(inputs: InputMap, at?: number): Promise<void>;

  /**
   * Adjusts options in the solution. This may trigger a graph reload the next
   * time the graph tries to run.
   */
  setOptions(options: Options): void;
}


/**
* Possible results from FaceMesh.
*/
export interface FaceResults {
 multiFaceLandmarks: NormalizedLandmarkListList;
//  multiFaceGeometry: FaceGeometry[];
 image: GpuBuffer;
}

/**
* Configurable options for FaceMesh.
*/
export interface FaceOptions {
 cameraNear?: number;
 cameraFar?: number;
 cameraVerticalFovDegrees?: number;
 enableFaceGeometry?: boolean;
 selfieMode?: boolean;
 maxNumFaces?: number;
 refineLandmarks?: boolean;
 minDetectionConfidence?: number;
 minTrackingConfidence?: number;
}

/**
* Listener for any results from FaceMesh.
*/
export type ResultsListener = (results: FaceResults) => (Promise<void>|void);



/**
 * Contains all of the setup options to drive the face solution.
 */
 export interface FaceMeshConfig {
  locateFile?: (path: string, prefix?: string) => string;
}


/**
 * Declares the interface of FaceMesh.
 */
 declare interface FaceMeshInterface {
  close(): Promise<void>;
  onResults(listener: ResultsListener): void;
  initialize(): Promise<void>;
  reset(): void;
  send(inputs: InputMap): Promise<void>;
  setOptions(options: FaceOptions): void;
}

/**
 * Encapsulates the entire FaceMesh solution. All that is needed from the
 * developer is the source of the image data. The user will call `send`
 * repeatedly and if a face is detected, then the user can receive callbacks
 * with this metadata.
 */
export declare class FaceMesh implements FaceMeshInterface {
  constructor(config?: FaceMeshConfig);

  /**
   * Shuts down the object. Call before creating a new instance.
   */
  close(): Promise<void>;

  /**
   * Registers a single callback that will carry any results that occur
   * after calling Send().
   */
  onResults(listener: ResultsListener): void;

  /**
   * Initializes the solution. This includes loading ML models and mediapipe
   * configurations, as well as setting up potential listeners for metadata. If
   * `initialize` is not called manually, then it will be called the first time
   * the developer calls `send`.
   */
  initialize(): Promise<void>;

  /**
   * Tells the graph to restart before the next frame is sent.
   */
  reset(): void;

  /**
   * Processes a single frame of data, which depends on the options sent to the
   * constructor.
   */
  send(inputs: InputMap): Promise<void>;

  /**
   * Adjusts options in the solution. This may trigger a graph reload the next
   * time the graph tries to run.
   */
  setOptions(options: FaceOptions): void;
}

