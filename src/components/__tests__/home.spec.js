import HomeView from '@/views/HomeView.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import SongItem from '@/components/SongItem.vue';

vi.mock('@/includes/firebase', () => {
  return {
    songsCollection: {
      doc: () => ({ get: () => Promise.resolve() }),
      startAfter: () => ({
        limit: () => ({
          get: () => Promise.resolve([])
        })
      })
    }
  };
});

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [{}, {}, {}];
    const component = shallowMount(HomeView, {
      data() {
        return {
          songs
        };
      },
      global: {
        mocks: {
          $t: (message) => message
        }
      }
    });
    const items = component.findAllComponents(SongItem);
    expect(items).toHaveLength(songs.length);
  });
});
