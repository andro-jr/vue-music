<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <routerLink
        :to="{ name: 'song', params: { id: song.docId } }"
        class="font-bold block text-gray-600"
        >{{ song.modifiedName }}</routerLink
      >
      <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <routerLink
        custom
        :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentCount }}
        </span></routerLink
      >
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['song']
};
</script>

<style scoped></style>
