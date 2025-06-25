// ������������� Three.js ����
const scenes = {};
const cameras = {};
const renderers = {};
const controls = {};

function initAllModelViewers() {
    initModelViewer('model1');
    initModelViewer('model2');
    initModelViewer('model3');
}

function initModelViewer(modelId) {
    const container = document.getElementById(modelId).querySelector('.model-viewer');

    // �����
    scenes[modelId] = new THREE.Scene();
    scenes[modelId].background = new THREE.Color(0xf0f0f0);

    // ������
    cameras[modelId] = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameras[modelId].position.z = 5;

    // ��������
    renderers[modelId] = new THREE.WebGLRenderer({ antialias: true });
    renderers[modelId].setSize(container.clientWidth