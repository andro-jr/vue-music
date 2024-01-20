<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <MusicUpload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6" v-if="songs.length > 0">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docId"
              :song="song"
              :updateSongs="updateSongs"
              :index="index"
              :deleteSongs="deleteSongs"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
          <div class="p-6" v-else>Upload your first song!</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MusicUpload from '@/components/MusicUpload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';

export default {
  name: 'ManageView',
  data() {
    return {
      songs: [],
      unsavedFlag: false
    };
  },
  components: { MusicUpload, CompositionItem },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSongs(i, values) {
      this.songs[i].modifiedName = values.modifiedName;
      this.songs[i].genre = values.genre;
    },
    deleteSongs(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    }
  }
};
</script>

<style scoped></style>
