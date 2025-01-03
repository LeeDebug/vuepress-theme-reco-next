import { useRoute } from 'vuepress/client'
import { defineComponent, onMounted, toRefs, h, watch } from 'vue'

import '../styles/valine.css'

type TvalineOptions = Record<string, unknown>

type Tprops = {
  options: TvalineOptions,
}

export default defineComponent({
  name: 'Valine',

  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  setup(props: Tprops) {
    //@ts-ignore
    if (__VUEPRESS_SSR__) return

    const route = useRoute()
    const { options } = toRefs(props)

    let valineInstance = null

    onMounted(async () => {
      const Valine = (await import('valine')).default
      const initValine = async () => {
        const valineOptions = {
          el: '#valine',
          placeholder: 'just go go',
          notify: false,
          verify: false,
          avatar: 'retro',
          visitor: true,
          recordIP: false,
          path: window.location.pathname,
          ...options.value
        }
        valineInstance = new Valine(valineOptions)
      }
      initValine()
    })
  },

  render() {
    return h('div', {
      class: 'reco-valine-wrapper'
    }, h('div', {
      id: 'valine'
    }))
  },
})
