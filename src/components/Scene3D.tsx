import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ---- 核心几何体（浮动 Torus Knot + 内部发光） ----
function CoreGeometry({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const time = useRef(0);

  // 粒子环绕
  const particleCount = 600;
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 3.5;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.6;
      pos[i * 3 + 2] = Math.cos(phi) * r;
      vel[i] = 0.2 + Math.random() * 0.6;
    }
    return [pos, vel];
  }, []);

  const particleRef = useRef<THREE.Points>(null!);

  // 浮动小几何体
  const floaters = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; speed: number; type: number; color: string }[] = [];
    const colors = ['#4488ff', '#88bbff', '#ff88aa', '#6644ff'];
    for (let i = 0; i < 15; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 3.5 + Math.random() * 4;
      items.push({
        pos: [
          Math.cos(theta) * r,
          (Math.random() - 0.5) * 4,
          Math.sin(theta) * r,
        ],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: 0.3 + Math.random() * 0.7,
        type: Math.floor(Math.random() * 3),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, []);

  const floaterRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    time.current += delta * 0.6;
    const t = time.current;

    // 鼠标跟随
    const rotY = mouse.current[0] * 0.6;
    const rotX = mouse.current[1] * 0.3;

    if (group.current) {
      group.current.rotation.y += (rotY - group.current.rotation.y) * 0.035;
      group.current.rotation.x += (rotX - group.current.rotation.x) * 0.035;
      group.current.position.y = Math.sin(t * 0.4) * 0.12;
    }

    // Torus Knot 自转
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.15;
      knotRef.current.rotation.y += delta * 0.25;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.12;
      wireRef.current.rotation.y += delta * 0.2;
      wireRef.current.rotation.z += delta * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x += delta * 0.08;
      glowRef.current.rotation.y += delta * 0.18;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.03);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.2;
      innerRef.current.rotation.y += delta * 0.3;
      innerRef.current.rotation.z += delta * 0.1;
      // 脉动
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.setScalar(pulse);
    }

    // 粒子漩涡
    if (particleRef.current) {
      const pos = particleRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const angle = Math.atan2(pos[idx + 2], pos[idx]) + delta * velocities[i] * 0.15;
        const r = Math.sqrt(pos[idx] * pos[idx] + pos[idx + 2] * pos[idx + 2]);
        pos[idx] = Math.cos(angle) * r;
        pos[idx + 2] = Math.sin(angle) * r;
        pos[idx + 1] += Math.sin(t * 0.3 + i * 0.1) * delta * 0.15;
      }
      particleRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 浮动小几何体
    floaterRefs.current.forEach((ref, i) => {
      if (ref) {
        const f = floaters[i];
        ref.rotation.x += delta * f.speed * 0.5;
        ref.rotation.y += delta * f.speed * 0.7;
        ref.position.y += Math.sin(t * 0.5 + i) * delta * 0.08;
      }
    });
  });

  return (
    <group ref={group}>
      {/* 核心 Torus Knot — 发光外圈 */}
      <mesh ref={glowRef}>
        <torusKnotGeometry args={[1.0, 0.35, 128, 16]} />
        <meshStandardMaterial
          color="#4488ff"
          emissive="#4488ff"
          emissiveIntensity={0.08}
          transparent
          opacity={0.15}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 核心 Torus Knot — 实体 */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.15}
          clearcoat={0.3}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 核心 Torus Knot — 线框 */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[0.92, 0.32, 32, 8]} />
        <meshBasicMaterial
          color="#88ddff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* 内部发光小球体 */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshPhysicalMaterial
          color="#4488ff"
          emissive="#4488ff"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 光环环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[1.3, 1.5, 64]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0.3, 0.5, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[1.4, 1.55, 64]} />
        <meshBasicMaterial
          color="#ff88aa"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 粒子系统 (环绕轨道) */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#88ddff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 浮动小几何体 */}
      {floaters.map((f, i) => (
        <group
          key={i}
          ref={el => { floaterRefs.current[i] = el; }}
          position={f.pos}
          rotation={f.rot}
        >
          {f.type === 0 && (
            <mesh>
              <octahedronGeometry args={[0.08, 0]} />
              <meshPhysicalMaterial color={f.color} emissive={f.color} emissiveIntensity={0.3} metalness={0.6} roughness={0.2} />
            </mesh>
          )}
          {f.type === 1 && (
            <mesh>
              <icosahedronGeometry args={[0.07, 0]} />
              <meshPhysicalMaterial color={f.color} emissive={f.color} emissiveIntensity={0.2} metalness={0.8} roughness={0.15} />
            </mesh>
          )}
          {f.type === 2 && (
            <mesh>
              <boxGeometry args={[0.07, 0.07, 0.07]} />
              <meshPhysicalMaterial color={f.color} emissive={f.color} emissiveIntensity={0.25} metalness={0.7} roughness={0.2} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// ---- AI 科技网格背景 ----
function TechGrid() {
  const gridRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.rotation.z += delta * 0.01;
      gridRef.current.position.y = Math.sin(Date.now() * 0.0003) * 0.05;
    }
  });

  const lineCount = 24;
  const lines: THREE.Vector3[][] = [];

  for (let i = 0; i < lineCount; i++) {
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 24; j++) {
      const t = j / 24;
      const x = (i / lineCount - 0.5) * 14;
      const z = (t - 0.5) * 14;
      const y = Math.sin(t * Math.PI * 2 + i * 0.4) * 0.2;
      pts.push(new THREE.Vector3(x, y - 2, z));
    }
    lines.push(pts);
  }

  return (
    <group ref={gridRef}>
      {lines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(pts.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={i % 2 === 0 ? '#4488ff' : '#ff88aa'} transparent opacity={0.025} />
        </line>
      ))}
    </group>
  );
}

// ---- 深度粒子背景（星空效果） ----
function StarField() {
  const starRef = useRef<THREE.Points>(null!);
  const count = 800;
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return [pos];
  }, []);

  useFrame((_, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#88bbff"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ---- 主场景 ----
export default function Scene3D() {
  const mouse = useRef<[number, number]>([0, 0]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <ambientLight intensity={0.3} color="#8888ff" />
        <directionalLight position={[5, 8, 6]} intensity={1.5} />
        <directionalLight position={[-4, 3, 5]} intensity={0.6} color="#4488ff" />
        <directionalLight position={[0, -3, -5]} intensity={0.2} color="#ff88aa" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#4488ff" />
        <pointLight position={[0, 0, -3]} intensity={0.3} color="#ff88aa" />

        <TechGrid />
        <StarField />
        <CoreGeometry mouse={mouse} />
      </Canvas>

      {/* 鼠标/触摸跟踪 */}
      <div
        className="absolute inset-0 z-10"
        onMouseMove={e => {
          mouse.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
        }}
        onTouchMove={e => {
          const t = e.touches[0];
          if (t) {
            mouse.current[0] = (t.clientX / window.innerWidth) * 2 - 1;
            mouse.current[1] = -(t.clientY / window.innerHeight) * 2 + 1;
          }
        }}
      />
    </div>
  );
}
