<template>
  <div class="side-bar">
    <a href="#"><img src="../assets/icon/logo.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/screen.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/car.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/street.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/drag.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/cabinet.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/search.svg" alt="" /></a>
    <a href="#"><img src="../assets/icon/statistical.svg" alt="" /></a>
  </div>
</template>
<script></script>
<style>
.side-bar {
  width: 66px;
  background-color: #1c3048;
  padding-top: 11px;
  padding-left: 11px;
  padding-right: 11px;
  min-height: 100%;
  box-sizing: border-box;
}

.side-bar a:first-child {
  margin-bottom: 27px;
}

.side-bar a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  margin-right: 0;
}
.side-bar a:nth-child(3) {
  background-color: #1aa4c8;
  border-radius: 6px;
}

.side-bar a:hover {
  background-color: #1aa4c8;
  border-radius: 6px;
}
</style>
