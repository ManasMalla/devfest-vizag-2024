
<template>
    <div class="container">
      <section>
        <select v-model="lang" style="background-color: #D3D3D3; padding: 4px 12px; border-radius: 8px;">
          <option value="plaintext">
            Plain Text
          </option>
          <option value="html">
            HTML
          </option>
          <option value="css">
            CSS
          </option>
          <option value="javascript">
            JavaScript
          </option>
          <option value="c">
            c
          </option>
        </select>
        <ClientOnly>
          <MonacoEditor v-model="val" :lang="lang" :options="options" class="editor">
            Loading...
          </MonacoEditor>
        </ClientOnly>
      </section>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type * as monaco from 'monaco-editor'
  
  const lang = ref<'plaintext' | 'html' | 'css' | 'javascript' | 'c'>('plaintext')
  const options: monaco.editor.IEditorConstructionOptions = {
    automaticLayout: true
  }
  
  const val = ref('Hello nuxt-monaco-editor!')
  const originalVal = 'Hello nuxt-monaco-editor.'
  const modifiedVal = ref('Hello nuxt-monaco-editor!!!')
  
  watchEffect(() => {
    switch (lang.value) {
      case 'plaintext':
        val.value = 'Hello nuxt-monaco-editor!'
        break
      case 'html':
        val.value = '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello nuxt-monaco-editor!</h1>\n  </body>\n</html>'
        break
      case 'css':
        val.value = '.hello__nuxt-monaco-editor {\n  border: 1px solid black;\n}'
        break
      case 'javascript':
        val.value = "alert('Hello nuxt-monaco-editor!')"
        break
      case 'c':
        val.value = "#include<stdion.h>\n int a = 10;"
        break
    }
  })
</script>


<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 80vw;
  height: 100%;
  margin: 10px auto 0;
  padding: 24px;
  overflow-x: hidden;
}

.editor {
  width: 100%;
  height: 500px;
  overflow-x: hidden;
  border: 1px;
}
</style>