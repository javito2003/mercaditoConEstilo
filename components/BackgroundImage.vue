<template>
  <div class="bg">
    <p class="py-5 text-center">
      This example creates a full page background image.
      Try to resize the browser window to see how it always will cover the full screen (when scrolled to top),
      and that it scales nicely on all screen sizes.
    </p>
  </div>
</template>


<style>
  body, html {
    height: 100%;
  }
  .bg {
    /* The image used */
    background-image: url("https://wallpaperaccess.com/full/1948217.jpg");

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>