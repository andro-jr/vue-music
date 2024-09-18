import HomeView from '@/views/HomeView.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import SongItem from '../SongItem.vue';
describe('Home.vue', () => {
  test('renders song list', () => {
    const songs = [{}, {}, {}];

    const component = shallowMount(HomeView, {
      data() {
        return {
          songs
        };
      }
    });

    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);
  });
});
