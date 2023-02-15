<template>
    <div class="text-editor">
        <div class="wrapper">
            <div
                v-if="editor"
                class="menu"
            >
                <button
                    :disabled="!editor.can().undo()"
                    class="menu-button"
                    @click="undoBtn"
                >
                    <img
                        alt="icon"
                        src="/src/assets/svg/icons/redo.svg"
                    />
                </button>
                <button
                    :disabled="!editor.can().redo()"
                    class="menu-button"
                    @click="redoBtn"
                >
                    <img
                        alt="icon"
                        src="/src/assets/svg/icons/undo.svg"
                    />
                </button>
                <button
                    class="menu-button"
                    @click="toggleHeading"
                >
                    <img
                        alt="add-head"
                        src="/src/assets/svg/icons/bold.svg"
                    />
                </button>
                <button
                    class="menu-button"
                    @click="setParagraph"
                >
                    <img
                        alt="add-paragraph"
                        src="/src/assets/svg/icons/paragraph.svg"
                    />
                </button>
                <button
                    class="menu-button"
                    @click="addImage"
                >
                    <img
                        alt="icon"
                        src="/src/assets/svg/icons/img.svg"
                    />
                </button>
                <button
                    class="menu-button__copy"
                    @click="copyHtml"
                >
                    Скопировать HTML
                </button>
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

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: true,
                    heading: {
                        levels: [1],
                    },
                    document,
                    Text,
                }),
                Image,
                Placeholder.configure({
                    placeholder: 'Пиши сюда...',
                }),
            ],
            autofocus: true,
            content: ``,
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },

    methods: {
        addImage() {
            const url = window.prompt('URL')

            if (url) {
                this.editor.chain().focus().setImage({ src: url }).run()
            }
        },
        copyHtml() {
            const editorContent = document.querySelector('.ProseMirror')
            try {
                navigator.clipboard.writeText(editorContent.innerHTML)
            } catch (e) {
                throw e
            }
        },
        redoBtn() {
            this.editor.chain().focus().redo().run()
        },
        undoBtn() {
            this.editor.chain().focus().undo().run()
        },
        toggleHeading() {
            this.editor.chain().focus().toggleHeading({ level: 1 }).run()
        },
        setParagraph() {
            this.editor.chain().focus().setParagraph().run()
        },
    },
}
</script>

<style>
.text-editor {
    width: 100%;
    height: 100vh;
    background-color: #1e1e1e;
}

.wrapper {
    max-width: 80%;
    margin: 0 auto;
}

.menu {
    padding-top: 80px;
    padding-bottom: 30px;
}

.ProseMirror p {
    color: #eaeaea;
    font-family: Roboto;
}

.menu-button {
    width: 42px;
    height: 38px;
    background-color: #282828;
    border-radius: 5px;
    margin-right: 12px;
}

img .ProseMirror-selectednode {
    outline: 3px solid #68cef8;
}

.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
}

h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 31px;
    color: #fff;
}

.menu-button__copy {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #639eff;
}
</style>
