import AboutView from '@/views/AboutView.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(AboutView);

    expect(wrapper.text()).toContain('about');
  });
});
