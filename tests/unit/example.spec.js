import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Nav from '@/components/nav.vue'

describe('nav.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Nav, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
