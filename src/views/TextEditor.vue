<template>
  <div class="text-editor">
    <div class="wrapper">
      <div v-if="editor" class="menu">

        <button
            class="btn"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().undo()"
        >
          <img src="/src/assets/svg/icons/redo.svg" alt="">
        </button>
        <button
            class="btn"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().redo()"
        >
          <img src="/src/assets/svg/icons/undo.svg" alt="">
        </button>
        <button
            class="btn"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"

        >
          <img src="/src/assets/svg/icons/bold.svg" alt="add-head">
        </button>
        <button
            class="btn"
            @click="editor.chain().focus().setParagraph().run()"
        >
          <img src="/src/assets/svg/icons/paragraph.svg" alt="add-paragraph">
        </button>
        <button class="btn" @click="addImage">
          <img src="/src/assets/svg/icons/img.svg" alt="">
        </button>
        <button  class="btn-copy__html" @click="copyHtml" >Скопировать HTML</button>
      </div>
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },

  methods: {
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
    copyHtml(){
      let editorContent = document.querySelector('.ProseMirror')
      try{
        navigator.clipboard.writeText(editorContent.innerHTML)
      }
      catch (e){
        throw e
      }

    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
            history: true,
            heading: {
              levels: [1]
            },
            document,
            Text,
        }
        ),
        Image.configure({
          HTMLAttributes: {
           class: 'image-card'
          }
        }),
        Placeholder.configure({
          placeholder: 'Пиши сюда...'
        })
      ],
      autofocus: true,
      content: ``,

    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style >
.text-editor{
  width: 100%;
  height: 100vw;
  background-color: #1E1E1E;
}
.wrapper{
  max-width: 80%;
  margin:0 auto;

}
.menu{
  padding-top: 80px;
  padding-bottom: 30px;
}
.ProseMirror p{
  color: #EAEAEA;
}
.btn{
  width: 42px;
  height: 38px;
  background-color: #282828;
  border-radius: 5px;
  margin-right: 12px;
}
.image-cart{
  width: 740px;
}
img .ProseMirror-selectednode {
  outline: 3px solid #68CEF8;
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
h1{
  font-style: normal;
  font-weight: 400;
  font-size: 31px;
  color: #fff;
}
.btn-copy__html{
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #639EFF;

}
</style>
