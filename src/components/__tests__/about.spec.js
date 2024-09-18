import AboutView from '@/views/AboutView.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = mount(AboutView);

    expect(wrapper.text()).toContain('about');
  });
});
