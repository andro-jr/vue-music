import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import SongItem from '../SongItem.vue';

describe('SongItem.vue', () => {
  test('renders song.displayName', () => {
    const song = {
      displayName: 'test'
    };

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song
      },
      global: {
        components: {
          routerLink: RouterLinkStub
        }
      }
    });

    const compositionAuthor = wrapper.find('.text-gray-500');

    expect(compositionAuthor.text()).toBe(song.displayName);
  });
});
