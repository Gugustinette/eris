<template>
  <div class="style">
    <div class="style-thumbnail text-cant-be-selected">
      <div class="thumbnail-text">{{ this.thumbnail }}</div>
      <StyleState
        :state="this.style.state"
        @state-click="this.handleStateClick"
      />
    </div>
    <div class="details">
      <h3>{{ style.name }}</h3>
      <h3 class="username">par {{ style.username }}</h3>
      <h3 class="description">{{ style.description }}</h3>
    </div>
  </div>
</template>

<script>
import { useStore } from "../../store";
import { useOnline } from "../../store/online";

// Components
import StyleState from "./StyleState.vue";

export default {
  setup() {
    const store = useStore();
    const online = useOnline();

    return {
      store,
      online,
    };
  },
  name: "option-style-store",
  components: {
    StyleState,
  },
  props: {
    style: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openStyle() {
      this.store.actualOpenedStyle = this.style;
    },
    downloadStyle(style, force) {
      // Check if style is allready downloaded
      if (!this.store.isStyleInstalled(style)) {
        // Style not found => Download
        this.online.downloadStyle(style).then((style) => {
          this.store.addStyle(style);
        });
      } else {
        // If force
        if (force) {
          // Force download
          this.online.downloadStyle(style).then((style) => {
            this.store.editStyle(style);
          });
        }
      }
    },
    handleStateClick(state) {
      if (state === "none") {
        return;
      }
      if (state === "open") {
        this.openStyle();
      }
      if (state === "downloading") {
        return;
      }
      if (state === "late-to-date") {
        this.downloadStyle(this.style, true);
        return;
      }
      if (state === "up-to-date") {
        return;
      }
    },
  },
  mounted() {
    // Create thumbnail (2 first characters of name)
    const thumbnail = this.style.name.substring(0, 2);
    // Set to upper case and add a dot
    this.thumbnail = thumbnail.toUpperCase() + ".";
    // If style is downloaded, check if it is up to date
    if (this.store.isStyleInstalled(this.style)) {
      if (this.store.isStyleUpToDate(this.style)) {
        this.state = "up-to-date";
      } else {
        this.state = "late-to-date";
      }
    }
  },
  data() {
    return {
      thumbnail: "YO.",
    };
  },
};
</script>

<style lang="scss" scoped>
.style {
  width: 200px;
  height: 218px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  justify-content: start;
  align-items: center;

  .style-thumbnail {
    position: relative;
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--color-secondary);
    border-radius: 7px;
    cursor: pointer;

    .thumbnail-text {
      width: 80px;
      height: 80px;
      display: grid;
      place-items: center;
      background: var(--color-background);
      font-size: 26px;
      font-weight: bold;
      border-radius: 15px;
      color: var(--color-secondary);
    }
  }

  .details {
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    width: 100%;

    .username {
      color: var(--color-gray-secondary);
    }

    .description {
      // Prevent overflow
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      margin-top: 15px;
    }
  }
}
</style>
