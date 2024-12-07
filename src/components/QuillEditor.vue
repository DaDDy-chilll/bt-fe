<script setup>
import { onMounted } from "vue";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'], 
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean']  
];


defineProps({
    height: {
        type: String,
        required: false,
        default: '300px'
    }
});

onMounted(async () => {
    if (process.client) {
        const Quill = (await import("quill")).default;
        const quill = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Type your message here...',
            dark: true
        });
    }
});
</script>

<template>
    <div class="flex flex-col-reverse flex-1">
        <div id="editor"></div>
    </div>
</template>



<style>


#editor {
    border: none;
}

.ql-toolbar {
    border:none !important;
    width: fit-content;
    margin-left: auto;
    margin-right: 2%;
    background-color: var(--accentwhite);
}

.ql-toolbar .ql-picker-options {
    top: auto !important;
    bottom: 100% !important;
}

.ql-toolbar .ql-picker.ql-expanded .ql-picker-options {
    margin-bottom: 5px;
}



.ql-editor.ql-blank::before {
    color: rgb(148, 147, 147) !important;
}

</style>