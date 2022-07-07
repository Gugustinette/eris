<template>
  <div class="rules">
    <nav>
      <ErisLogo />
    </nav>
    <div class="content">
      <h2>Policy</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro ad
        consequuntur ullam excepturi quod tempore ab sit optio? Maiores
        exercitationem natus cumque facilis fugiat, laborum, nam asperiores
        provident voluptatum corporis expedita commodi voluptatem qui magni
        consequatur dolorem, aut perferendis rem delectus eos alias perspiciatis
        similique. Minus quaerat tenetur vel adipisci, architecto dignissimos
        assumenda.
      </p>
    </div>
  </div>
</template>

<script>
import ErisLogo from "@/components/ErisLogo.vue";

export default {
  name: "PolicyView",
  components: {
    ErisLogo,
  },
};
</script>

<style lang="scss">
.rules {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 1920px;
  display: grid;
  place-items: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 25px;
    z-index: 2;

    p {
      margin: 0px 80px;
      text-align: center;
    }
  }
}
</style>
