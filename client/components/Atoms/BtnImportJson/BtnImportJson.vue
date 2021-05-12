<template>
  <div>
    <input type="file" id="selectFiles" value="Import" />
    <br />
    <button id="import" class="button" v-on:click="showMyDiv">
      Importer le fichier
    </button>
    <pre id="result" />
  </div>
</template>

<script>
export default {
  name: 'BtnImportJson',
  methods: {
    showMyDiv () {
      document.getElementById('import').onclick = () => {
        const files = document.getElementById('selectFiles').files
        if (files.length <= 0) {
          return false
        }

        const fr = new FileReader()

        fr.onload = (e) => {
          const result = JSON.parse(e.target.result)
          const formatted = JSON.stringify(result, null, 2)
          document.getElementById('result').innerHTML = formatted
        }
        fr.readAsText(files.item(0))
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "BtnImportJson";
</style>
