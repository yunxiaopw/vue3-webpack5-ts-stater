<template>
  <div class="message">nihao</div>
  <!-- <img src="../assets/pngs/images.png" alt="" /> -->
  <!-- <span class="iconfont icon-close"></span> -->
  <!-- <span class="word">预览文字Abcd</span> -->
  <span>预览文字Abcd1123123sadaasasdasdasdasdasdasdasd</span>
</template>

<script setup lang="ts">
import * as THREE from "three";

// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time: any) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
</script>

<style lang="less">
.message {
  color: red;
}


</style>
