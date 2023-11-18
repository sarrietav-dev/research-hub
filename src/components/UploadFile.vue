<script setup lang="ts">
// See https://vueuse.org/core/useFileDialog
import { useFileDialog } from '@vueuse/core'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const storage = useFirebaseStorage()
const fileRef = storageRef(storage, '/Files/ExcelEstudiantes')

const {
  uploadTask,
  upload,
} = useStorageFile(fileRef)

function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    upload(data)
  }
}


const { files, open } = useFileDialog()
</script>

<template>
  <form @submit.prevent="uploadPicture">
    <!-- disable the form while uploading -->
    <fieldset :disabled="!!uploadTask" style="border-color: transparent">
      <v-btn append-icon="mdi-file-excel"
        type="button"
        @click="open({ accept: '.xls, .xlsx', multiple: false })"
      >
        <template v-if="files?.length === 1">
          Selected file: {{ files.item(0)!.name }}
        </template>
        <template v-else> Select a file </template>
      </v-btn>

      <br />
      <template v-if="files?.length === 1">
        <v-btn type="submit" append-icon="mdi-upload">Upload</v-btn>
      </template>
    </fieldset>
  </form>
</template>