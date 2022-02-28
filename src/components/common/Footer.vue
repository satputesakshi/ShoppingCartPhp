<template>
  <footer>
    <div class="footer"><!-- 
      <div style="margin-left: 20px">
        <h4 class="fw-600">Jordan Kingdom</h4>
      </div> -->
      <div class="about-us">
        <div>
          <h5 class="fw-600">About Us</h5>
        </div>
        <div>
          <h5 class="fw-600">T&C</h5>
        </div>
        <div>
          <h5 class="fw-600">Privacy Policy</h5>
        </div>
        <div>
          <h5 class="fw-600">Contact Us</h5>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  min-height: 50px;
  background: whitesmoke;
  display: flex;
  text-align: -webkit-right;
  justify-content: space-between;
  padding-top: 14px;
}
.about-us {
  display: flex;
  width: 500px;
  justify-content: space-evenly;
}
.fw-600 {
  font-weight: 300;
}
</style>
