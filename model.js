loader.load('model.stl', function(geometry) {
    // Создаем материал и меш
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x111111,
        shininess: 50
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Центрируем модель
    geometry.computeBoundingBox();
    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z));
    
    // Добавляем в сцену
    scene.add(mesh);
    
    // Настраиваем камеру
    const size = geometry.boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const distance = Math.abs(maxDim / Math.sin(fov / 2));
    
    camera.position.set(distance, distance * 0.5, distance);
    camera.lookAt(new THREE.Vector3());
    
    // Настраиваем контролы
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Масштабирование (опционально)
    const scale = 10 / maxDim;
    mesh.scale.set(scale, scale, scale);
});
