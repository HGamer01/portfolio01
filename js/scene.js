// scene.js - High-End Three.js Background
let scene, camera, renderer, globe, particles;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a Glass Globe (Main Visual)
    const globeGeometry = new THREE.IcosahedronGeometry(2, 15);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9, // Glass effect
        thickness: 0.5,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
    });
    
    globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add Secondary Floating Shapes
    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 2);
    const innerMaterial = new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerGlobe);

    // Particles Cloud
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const purpleLight = new THREE.PointLight(0xa855f7, 2);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Rotation
        globe.rotation.y = elapsedTime * 0.1;
        globe.rotation.x = elapsedTime * 0.05;
        
        innerGlobe.rotation.y = -elapsedTime * 0.15;
        innerGlobe.rotation.z = elapsedTime * 0.1;
        
        particles.rotation.y = -elapsedTime * 0.05;

        // Mouse follow parallax
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    // Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

window.addEventListener('load', initThree);

