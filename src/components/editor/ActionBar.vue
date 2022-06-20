<template>
  <div class="code-editor-action-bar">
    <div class="left">
      <div class="action">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 5.68809C4 3.88644 5.40423 2.28809 7.31339 2.28809H12.3425C13.3927 2.28809 14.4567 2.67989 15.2604 3.47893L15.2701 3.48859L18.8866 7.18414C19.6883 7.98458 20.0956 9.15706 19.9809 10.2452V18.8881C19.9809 20.6897 18.5767 22.2881 16.6675 22.2881H7.31339C5.40423 22.2881 4 20.6897 4 18.8881V5.68809ZM7.31339 4.28809C6.60742 4.28809 6 4.88974 6 5.68809V18.8881C6 19.6864 6.60742 20.2881 7.31339 20.2881H16.6675C17.3735 20.2881 17.9809 19.6864 17.9809 18.8881V10.1881C17.9809 10.1464 17.9835 10.1047 17.9888 10.0633C18.0504 9.57265 17.8563 8.98011 17.4712 8.59724L17.4615 8.58758L13.8459 4.89292C13.443 4.49478 12.8996 4.28809 12.3425 4.28809H7.31339Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 12.2881C12.5523 12.2881 13 12.7358 13 13.2881V17.2881C13 17.6725 12.7796 18.0229 12.4332 18.1894C12.0867 18.3559 11.6755 18.3091 11.3753 18.069L9.37528 16.469C8.94402 16.1239 8.8741 15.4947 9.21911 15.0634C9.56412 14.6321 10.1934 14.5622 10.6247 14.9072L11 15.2075V13.2881C11 12.7358 11.4477 12.2881 12 12.2881Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.7808 15.0634C15.1259 15.4947 15.0559 16.1239 14.6247 16.469L12.6247 18.069C12.1934 18.414 11.5641 18.344 11.2191 17.9128C10.8741 17.4815 10.944 16.8522 11.3753 16.5072L13.3753 14.9072C13.8065 14.5622 14.4358 14.6321 14.7808 15.0634Z"
          />
        </svg>
        <div class="action-title">Export File</div>
      </div>
      <div class="action">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 6.85219C2 4.89332 3.51277 3.28809 5.48619 3.28809H8.96685C10.0949 3.28809 11.1746 3.68204 11.9849 4.62917L13.1489 5.74962H18.5138C20.4872 5.74962 22 7.35486 22 9.31373V17.724C22 19.6829 20.4872 21.2881 18.5138 21.2881H5.48619C3.51277 21.2881 2 19.6829 2 17.724V6.85219ZM5.48619 5.28809C4.67507 5.28809 4 5.93926 4 6.85219V17.724C4 18.6369 4.67507 19.2881 5.48619 19.2881H18.5138C19.3249 19.2881 20 18.6369 20 17.724V9.31373C20 8.4008 19.3249 7.74962 18.5138 7.74962H12.7459C12.4872 7.74962 12.2387 7.64943 12.0524 7.47008L10.5606 6.03418C10.534 6.00851 10.5087 5.98137 10.4851 5.9529C10.1061 5.49695 9.61099 5.28809 8.96685 5.28809H5.48619Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 9.78809C12.5523 9.78809 13 10.2358 13 10.7881V15.7881C13 16.1725 12.7797 16.5229 12.4332 16.6894C12.0867 16.8559 11.6755 16.8091 11.3753 16.569L8.87531 14.569C8.44405 14.2239 8.37413 13.5947 8.71914 13.1634C9.06415 12.7321 9.69344 12.6622 10.1247 13.0072L11 13.7075V10.7881C11 10.2358 11.4477 9.78809 12 9.78809Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2809 13.1634C15.6259 13.5946 15.556 14.2239 15.1247 14.5689L12.6247 16.5689C12.1934 16.9139 11.5641 16.844 11.2191 16.4128C10.8741 15.9815 10.944 15.3522 11.3753 15.0072L13.8753 13.0072C14.3066 12.6622 14.9359 12.7321 15.2809 13.1634Z"
          />
        </svg>
        <div class="action-title">Export Package</div>
      </div>
    </div>
    <div class="right">
      <div class="main-action" @click="save()">Save</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorActionBar",
  props: {
    owned: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    save() {
      this.$emit("save-css");
    },
  },
};
</script>

<style lang="scss">
.code-editor-action-bar {
  --action-bar-size: 50px;
  background: var(--color-primary);
  height: var(--action-bar-size);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100%;

    .action {
      position: relative;
      height: var(--action-bar-size);
      width: var(--action-bar-size);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background 0.1s ease-in;

      &:hover {
        background: var(--color-primary-hover);
        transition: background 0.1s ease-in;

        .action-title {
          transform: translateX(-50%) scale(1) translateY(2px);
          opacity: 1;
        }
      }

      svg {
        fill: var(--color-secondary);
      }

      .action-title {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) scale(0.8) translateY(-5px);
        opacity: 0;
        background: var(--color-primary-hover);
        color: var(--color-secondary);
        z-index: 10000;
        padding: 2px 5px;
        border-radius: 5px;
        transition: all 0.1s ease-in;
        white-space: nowrap;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    margin-right: var(--action-bar-size);
  }

  .main-action {
    border-radius: 7px;
    background: var(--color-secondary);
    color: var(--color-primary);
    display: grid;
    place-items: center;
    padding: 10px;
    min-width: 50px;
    cursor: pointer;
  }
}
</style>
