import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '@/pages/Login.vue'

const { pushMock, loginMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  loginMock: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  })
}))

vi.mock('@/stores', () => ({
  useAuthStore: () => ({
    login: loginMock,
    authError: ''
  })
}))

const VFormStub = {
  name: 'VForm',
  emits: ['submit'],
  methods: {
    async validate() {
      return { valid: true }
    }
  },
  template: '<form @submit.prevent="$emit(\'submit\', $event)"><slot /></form>'
}

const VTextFieldStub = {
  name: 'VTextField',
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
  template:
    '<label><span>{{ label }}</span><input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" /></label>'
}

const VButtonStub = {
  name: 'VBtn',
  props: ['type'],
  template: '<button :type="type"><slot /></button>'
}

const defaultStubs = {
  'v-container': { template: '<div><slot /></div>' },
  'v-row': { template: '<div><slot /></div>' },
  'v-col': { template: '<div><slot /></div>' },
  'v-card': { template: '<div><slot /></div>' },
  'v-img': { template: '<img alt="" />' },
  'v-form': VFormStub,
  'v-text-field': VTextFieldStub,
  'v-alert': { template: '<div><slot /></div>' },
  'v-btn': VButtonStub
}

describe('login view', () => {
  it('submete credenciais e redireciona para dashboard', async () => {
    loginMock.mockResolvedValue({})
    pushMock.mockResolvedValue()

    const wrapper = mount(LoginView, {
      global: { stubs: defaultStubs }
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('admin')
    await inputs[1].setValue('senha123')
    await wrapper.find('form').trigger('submit')
    await Promise.resolve()
    await wrapper.vm.$nextTick()

    expect(loginMock).toHaveBeenCalledWith({
      username: 'admin',
      password: 'senha123'
    })
    expect(pushMock).toHaveBeenCalledWith({ name: 'dashboard' })
  })

  it('mostra erro quando login falha', async () => {
    loginMock.mockRejectedValue({ message: 'Credenciais invalidas' })
    pushMock.mockReset()

    const wrapper = mount(LoginView, {
      global: { stubs: defaultStubs }
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('admin')
    await inputs[1].setValue('errada')
    await wrapper.find('form').trigger('submit')
    await Promise.resolve()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Credenciais invalidas')
    expect(pushMock).not.toHaveBeenCalled()
  })
})
