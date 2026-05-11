import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.45));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.48, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0e7490,
      emissiveIntensity: 0.52,
      metalness: 0.72,
      roughness: 0.18,
      transparent: true,
      opacity: 0.62,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.Mesh(
      coreGeometry,
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.45 }),
    );
    wire.scale.setScalar(1.035);
    group.add(wire);

    const rings = [];
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.03 + i * 0.28, 0.01, 8, 96),
        new THREE.MeshBasicMaterial({
          color: i === 1 ? 0xf472b6 : 0x67e8f9,
          transparent: true,
          opacity: 0.72 - i * 0.12,
        }),
      );
      ring.rotation.x = Math.PI / (2.4 + i);
      ring.rotation.y = Math.PI / (4.2 - i * 0.4);
      rings.push(ring);
      group.add(ring);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      pointsGeometry,
      new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.018, transparent: true, opacity: 0.78 }),
    );
    group.add(points);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const cyanLight = new THREE.PointLight(0x22d3ee, 2.4, 10);
    cyanLight.position.set(2, 1.8, 3);
    scene.add(cyanLight);
    const violetLight = new THREE.PointLight(0xa855f7, 1.8, 10);
    violetLight.position.set(-2.4, -1.2, 2.3);
    scene.add(violetLight);

    let frameId;
    let paused = false;
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };

    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const onVisibilityChange = () => {
      paused = document.hidden;
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (paused) return;
      group.rotation.y += 0.0045;
      group.rotation.x += 0.0016;
      group.rotation.y += (pointer.x - group.rotation.y * 0.015) * 0.01;
      group.rotation.x += (-pointer.y - group.rotation.x * 0.015) * 0.01;
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.006 + index * 0.002;
        ring.rotation.x += 0.0015;
      });
      points.rotation.y -= 0.0018;
      renderer.render(scene, camera);
    };

    mount.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wire.material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      pointsGeometry.dispose();
      points.material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-[22rem] min-h-[22rem] w-full sm:h-[30rem] lg:h-[38rem]" data-cursor>
      <div ref={mountRef} className="absolute inset-0" aria-label="Rotating holographic 3D developer core" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgba(2,6,23,0.72)_78%)]" />
    </div>
  );
}
