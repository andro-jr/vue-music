<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url('../assets/img/song-header.png')"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, 'currency') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc('song.commentCount', song.commentCount, { comment: song.commentCount })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6" v-if="userLoggedIn">
          <div
            class="text-white text-center font-bold p-4 rounded mb-4"
            v-if="commentShowAlert"
            :class="commentAlertVariant"
          >
            {{ commentMessage }}
          </div>
          <VeeForm :validation-schema="validationSchema" @submit="addComment">
            <VeeField
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-2"
              placeholder="Your comment here..."
            ></VeeField>
            <ErrorMessage class="text-red-400 mb-4 block" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="commentInSubmission"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docId"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { auth, songsCollection, commentsCollection } from '@/includes/firebase';
import { ErrorMessage } from 'vee-validate';
import { mapState, mapActions } from 'pinia';
import useUserStore from '@/stores/user';
import usePlayerStore from '@/stores/player';

export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      comments: [],
      sort: 1,
      validationSchema: {
        comment: 'required|min:3|max:300'
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: 'bg-blue-400',
      commentMessage: 'Please wait your comment is being submitted!'
    };
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        if (this.sort === '2') {
          return new Date(a.datePosted) - new Date(b.datePosted);
        }
      });
    }
  },
  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!docSnapshot.exists) {
        return to.push({ name: 'home' });
      }

      const { sort } = vm.$route.query;

      vm.sort = sort === '1' || sort === '2' ? sort : '1';

      vm.song = docSnapshot.data();
      vm.getComments();
    });
  },
  components: { ErrorMessage },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    async addComment(values, { resetForm }) {
      this.commentInSubmission = true;
      this.commentShowAlert = true;
      this.commentAlertVariant = 'bg-blue-400';
      this.commentMessage = 'Please wait your comment is being submitted!';

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sId: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
      };

      await commentsCollection.add(comment);

      this.song.commentCount += 1;
      await songsCollection.doc(this.$route.params.id).update({
        commentCount: this.song.commentCount
      });

      this.getComments();

      this.commentInSubmission = false;
      this.commentShowAlert = true;
      this.commentAlertVariant = 'bg-green-500';
      this.commentMessage = 'Comment added!';

      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection.where('sId', '==', this.$route.params.id).get();

      this.comments = [];
      snapshots.forEach((doc) => {
        this.comments.push({
          docId: doc.id,
          ...doc.data()
        });
      });
    }
  },
  watch: {
    sort(newValue) {
      if (newValue === this.$route.query.sort) return;
      this.$router.push({
        query: {
          sort: newValue
        }
      });
    }
  }
};
</script>
