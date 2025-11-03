'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';

type Node = { position: THREE.Vector3; label?: string };

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function NetworkPoints() {
  const group = useRef<THREE.Group>(null);

  const sphereRadius = 1.25; // slightly larger sphere
  const { nodes, lines } = useMemo(() => {
    // Create points distributed on a sphere
    const nodes: Node[] = [];
    const linePositions: number[] = [];
    const count = 75; // a little more dense

    function randomOnSphere(r: number) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    }

    for (let i = 0; i < count; i++) {
      nodes.push({ position: randomOnSphere(sphereRadius) });
    }

    // Add a few labeled nodes
    const labeled = [
      { label: 'Python' },
      { label: 'TensorFlow' },
      { label: 'Keras' },
      { label: 'OpenCV' },
      { label: 'AWS' },
      { label: 'Azure' },
      { label: 'Docker' },
      { label: 'Kubernetes' },
      { label: 'Node.js' },
      { label: 'React' },
      { label: 'SQL' },
      { label: 'Java' },
      { label: 'Linux' },
      { label: 'Security' },
      { label: 'SVM' },
      { label: 'Dlib' },
      { label: 'CNN' },
      { label: 'TensorRT' },
      { label: 'REST APIs' },
      { label: 'Microservices' }
    ];
    labeled.forEach((l, i) => {
      nodes[i].label = l.label;
    });

    // Connect near neighbors across the sphere (no strict cap), then ensure no isolated node
    const degree: number[] = new Array(count).fill(0);
    const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
    const edges = new Set<string>();

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < 0.9) {
          const key = edgeKey(i, j);
          if (!edges.has(key)) {
            edges.add(key);
            degree[i]++;
            degree[j]++;
            linePositions.push(
              nodes[i].position.x,
              nodes[i].position.y,
              nodes[i].position.z,
              nodes[j].position.x,
              nodes[j].position.y,
              nodes[j].position.z
            );
          }
        }
      }
    }

    // Ensure every node has at least one connection
    for (let i = 0; i < count; i++) {
      if (degree[i] === 0) {
        let nearest = -1;
        let nearestDist = Infinity;
        for (let j = 0; j < count; j++) {
          if (i === j) continue;
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = j;
          }
        }
        if (nearest !== -1) {
          const key = edgeKey(i, nearest);
          if (!edges.has(key)) {
            edges.add(key);
            degree[i]++;
            degree[nearest]++;
            linePositions.push(
              nodes[i].position.x,
              nodes[i].position.y,
              nodes[i].position.z,
              nodes[nearest].position.x,
              nodes[nearest].position.y,
              nodes[nearest].position.z
            );
          }
        }
      }
    }

    return { nodes, lines: new Float32Array(linePositions) };
  }, []);

  // Lines
  const lineGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(lines, 3));
    return geom;
  }, [lines]);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.05;
    if (group.current) group.current.position.x = 2.0; // push sphere to the right side
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={new THREE.Color('white')} opacity={0.16} transparent />
      </lineSegments>
      {nodes.map((n, idx) => (
        <Point key={idx} position={n.position} label={n.label} />
      ))}
    </group>
  );
}

function Point({ position, label }: { position: THREE.Vector3; label?: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const pulse = useRef(Math.random());

  useFrame(({ clock }) => {
    const s = 0.035 + 0.01 * Math.sin(clock.getElapsedTime() * 2 + pulse.current);
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={'white'} transparent opacity={0.9} />
      {label && (
        <Html center distanceFactor={8} position={[0, 0.18, 0]}>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur border border-white/10">
            {label}
          </span>
        </Html>
      )}
    </mesh>
  );
}

function Constellations() {
  const isDark = useIsDark();
  const group = useRef<THREE.Group>(null);

  const { pointsAttr, linesAttr } = useMemo(() => {
    const count = 420; // fill the whole page background
    const positions: number[] = [];
    const linePositions: number[] = [];
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const x = randomInRange(-10, 10);
      const y = randomInRange(-6, 6);
      const z = randomInRange(-4, 4);
      pts.push(new THREE.Vector3(x, y, z));
      positions.push(x, y, z);
    }

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = pts[i].distanceTo(pts[j]);
        if (d < 1.25) {
          linePositions.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return {
      pointsAttr: new Float32Array(positions),
      linesAttr: new Float32Array(linePositions)
    };
  }, []);

  // Subtle breathing motion
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.02;
    group.current.position.y = Math.sin(t * 0.2) * 0.1;
  });

  const pointGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pointsAttr, 3));
    return geom;
  }, [pointsAttr]);

  const lineGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(linesAttr, 3));
    return geom;
  }, [linesAttr]);

  const color = useMemo(() => new THREE.Color('#4b5563'), [isDark]); // dark grey

  return (
    <group ref={group}>
      <points geometry={pointGeom}>
        <pointsMaterial size={0.05} sizeAttenuation color={color} opacity={0.6} transparent blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={color} opacity={0.22} transparent blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export function NeuralSphere({ className = '' }: { className?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} className={className}>
      <ambientLight intensity={0.6} />
      {/* Background constellations */}
      <Constellations />
      {/* Main neural sphere on the right */}
      <NetworkPoints />
    </Canvas>
  );
}


