<template>
  <label class="switch">
    <input type="checkbox" :checked="checked" />
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: "form-switch",
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  --switch-height: 15px;
  --switch-width: 28px;
  --switch-offset: calc(var(--switch-height) - 8px);
  --offset-x: 12.5px;

  position: relative;
  display: inline-block;
  width: var(--switch-width);
  height: var(--switch-height);
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-red);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: var(--switch-offset);
  width: var(--switch-offset);
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--color-green);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-green);
}

input:checked + .slider:before {
  -webkit-transform: translateX(var(--offset-x));
  -ms-transform: translateX(var(--offset-x));
  transform: translateX(var(--offset-x));
}

/* Rounded sliders */
.slider.round {
  border-radius: var(--switch-height);
}

.slider.round:before {
  border-radius: 50%;
}
</style>
