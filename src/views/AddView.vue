<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const isDragOver = ref(false);
const dragText = ref("Drag & Drop to Upload File");

const browseFile = () => {
  fileInput.value.click(); // Trigger file input click
};

const handleFileChange = () => {
  const file = fileInput.value.files[0];
  if (file) {
    uploadFile(file);
  }
};

const dragEnter = () => {
  isDragOver.value = true;
  dragText.value = "Release to Upload File";
};

const dragLeave = () => {
  isDragOver.value = false;
  dragText.value = "Drag & Drop to Upload File";
};

const uploadFile = (file) => {
  // Implement file upload logic here
  // For example, you can use axios or fetch to upload the file
  // You can also show the uploaded file in the preview area
  console.log("File uploaded:", file);

  // Simulate uploading process
  setTimeout(() => {
    alert("File uploaded successfully!");
  }, 1000);
};
</script>

<template>
  <main >
    <section class="add__input">
        <div 
          class="drag-area" 
          @drop.prevent="uploadFile($event)" 
          @dragover.prevent
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          :class="{ 'active': isDragOver }"
        >
          <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
          <header>{{ dragText }}</header>
          <span>OR</span>
          <button @click="browseFile">Browse File</button>
          <input ref="fileInput" type="file" name="file" id="file" @change="handleFileChange" hidden>
        </div>
        <div class="add__input_card-title">
          <h3>Judul</h3>
          <div class="input-wrapper">
            <textarea class="text-input" rows="1"></textarea>
          </div>
        </div>
      </section>
      <section class="add__preview">
        <!-- Add preview area for uploaded images if needed -->
      </section>
  </main>
</template>

<style scoped>
/* drag and drop image */
.drag-area {
  border: 2px dashed #000000;
  height: 300px;
  width: 500px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.drag-area.active {
  border: 2px dashed #000000;
  background-color: #eaeaea;
}

.drag-area .icon {
  font-size: 100px;
  color: #000000;
}

.drag-area header {
  font-size: 30px;
  font-weight: 500;
  color: #000000;
}

.drag-area span {
  font-size: 25px;
  font-weight: 500;
  color: #000000;
  margin: 10px 0 15px 0;
}

.drag-area button {
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  border: none;
  outline: none;
  background: #ffffff;
  border: 1px dotted #000000;
  color: #000000;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
}

.drag-area button:hover {
  background: rgb(228, 220, 220);
}

.drag-area img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}


.input-wrapper {
  position: relative;
  width: 531px;
  height: 118px;
  display: flex;
  align-items: flex-start; /* Align text to the top */
}

.text-input {
  width: 100%;
  height: 100%;
  resize: none; /* Disable textarea resizing */
  border: none;
  padding: 0.5rem;
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  border: 1px solid black;
  line-height: inherit;
}

</style>
