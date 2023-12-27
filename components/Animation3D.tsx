'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
	DRACOLoader,
	GLTFLoader,
	OrbitControls,
	RoomEnvironment,
} from 'three/examples/jsm/Addons.js'
import { CircularProgress } from '@nextui-org/react'
import Container from './Container'

const Animation3D = () => {
	const refContainer = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const { current: container } = refContainer
		if (!container) return

		let mixer: THREE.AnimationMixer | undefined
		const clock = new THREE.Clock()

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(container.offsetWidth, container.offsetHeight)
		renderer.setClearColor(0x000000, 0)
		container.childNodes[0] && container.removeChild(container.childNodes[0])
		container.appendChild(renderer.domElement)

		const pmremGenerator = new THREE.PMREMGenerator(renderer)
		const scene = new THREE.Scene()

		scene.environment = pmremGenerator.fromScene(
			new RoomEnvironment(renderer),
			0.04
		).texture
		const camera = new THREE.PerspectiveCamera(
			40,
			container.offsetWidth / container.offsetHeight,
			1,
			100
		)

		camera.position.set(-5, 2, -8)

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.target.set(0, 0.5, 0)
		controls.update()
		controls.enablePan = false
		controls.enableDamping = true

		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('3d/draco/')

		const loader = new GLTFLoader()
		loader.setDRACOLoader(dracoLoader)
		loader.load(
			'/3d/LittlestTokyo.glb',
			function (gltf) {
				const model = gltf.scene
				model.position.set(0.5, 1, 0)
				model.scale.set(0.0065, 0.0065, 0.0065)
				scene.add(model)

				mixer = new THREE.AnimationMixer(model)
				mixer.clipAction(gltf.animations[0]).play()

				animate()
			},
			undefined,
			function (e) {
				console.error(e)
			}
		)

		const handleResize = () => {
			camera.aspect = container.offsetWidth / container.offsetHeight
			camera.updateProjectionMatrix()

			renderer.setSize(container.offsetWidth, container.offsetHeight)
		}

		window.addEventListener('resize', handleResize)

		let req: number
		const animate = () => {
			if (!mixer) return
			req = requestAnimationFrame(animate)
			const delta = clock.getDelta()
			mixer.update(delta)
			controls.update()
			renderer.render(scene, camera)
		}

		return () => {
			cancelAnimationFrame(req)
			container.removeChild(renderer.domElement)
			window.removeEventListener('resize', handleResize)
		}
	}, [refContainer])

	return (
		<Container>
			<div
				ref={refContainer}
				className="-mb-[200px] -mx-[60px] -mt-[100px] h-[500px] pb-[30px] flex justify-center items-center relative"
			>
				<CircularProgress aria-label="Loading 3D..." />
			</div>
		</Container>
	)
}

export default Animation3D
