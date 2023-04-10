<script lang="ts">
export default {
  name: 'jwAnimation'
} 
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { background } from './const/backgroundColor'
import {
  dapAppearReversible,
  fadAppearReversible,
  overturnAppearReversible,
  quicknessAppearReversible,
  rotateAppearReversible,
  rollAppearReversible,
  zoomAppearReversible,
  slideAppearReversible,
  attention,
  rollAppear,
  rollVanish,
  dapAppear,
  dapVanish,
  fadAppear,
  fadVanish,
  overturn,
  overturnAppear,
  overturnVanish,
  quicknessAppear,
  quicknessVanish,
  rotate,
  rotateAppear,
  rotateVanish,
  special,
  zoomAppear,
  zoomVanish,
  slideAppear,
  slideVanish
} from './const/animationType'

const reversibleTypeList = ref([
  {
    titel: '弹跳效果',
    TypeList: dapAppearReversible
  },
  {
    titel: '淡入淡出效果',
    TypeList: fadAppearReversible
  },
  {
    titel: '翻转效果',
    TypeList: overturnAppearReversible
  },
  {
    titel: '急速效果',
    TypeList: quicknessAppearReversible
  },
  {
    titel: '旋转效果',
    TypeList: rotateAppearReversible
  },
  {
    titel: '滚动效果',
    TypeList: rollAppearReversible
  },
  {
    titel: '放大缩小效果',
    TypeList: zoomAppearReversible
  },
  {
    titel: '滑动效果',
    TypeList: slideAppearReversible
  },
])

const irreversibleTypeList = [
  {
    titel: '引起注意效果',
    TypeList: attention,
    fillMode: 'attention'
  },
  {
    titel: '翻转效果',
    TypeList: overturn,
    fillMode: 'attention'
  },
  {
    titel: '翻转出现效果',
    TypeList: overturnAppear,
    fillMode: 'appear'
  },
  {
    titel: '翻转消失效果',
    TypeList: overturnVanish,
    fillMode: 'vanish'
  },
  {
    titel: '旋转效果',
    TypeList: rotate,
    fillMode: 'attention'
  },
  {
    titel: '特殊效果',
    TypeList: special,
    fillMode: 'attention'
  },
  {
    titel: '滚动出现效果',
    TypeList: rollAppear,
    fillMode: 'appear'
  },
  {
    titel: '滚动消失效果',
    TypeList: rollVanish,
    fillMode: 'vanish'
  },
  {
    titel: '弹跳出现效果',
    TypeList: dapAppear,
    fillMode: 'appear'
  },
  {
    titel: '弹跳消失效果',
    TypeList: dapVanish,
    fillMode: 'vanish'
  },
  {
    titel: '淡入淡出 出现效果',
    TypeList: fadAppear,
    fillMode: 'appear'
  },
  {
    titel: '淡入淡出 消失效果',
    TypeList: fadVanish,
    fillMode: 'vanish'
  },
  {
    titel: '急速出现效果',
    TypeList: quicknessAppear,
    fillMode: 'appear'
  },
  {
    titel: '急速消失效果',
    TypeList: quicknessVanish,
    fillMode: 'vanish'
  },
  {
    titel: '旋转出现效果',
    TypeList: rotateAppear,
    fillMode: 'appear'
  },
  {
    titel: '旋转消失效果',
    TypeList: rotateVanish,
    fillMode: 'vanish'
  },

  {
    titel: '放大缩小出现效果',
    TypeList: zoomAppear,
    fillMode: 'appear'
  },
  {
    titel: '放大缩小消失效果',
    TypeList: zoomVanish,
    fillMode: 'vanish'
  },
  {
    titel: '滑动出现效果',
    TypeList: slideAppear,
    fillMode: 'appear'
  },
  {
    titel: '滑动消失效果',
    TypeList: slideVanish,
    fillMode: 'vanish'
  }
]
const setAnimation = (animationType: string, fillMode: string = 'attention') => {
  // 获取HTML元素
  const element = document.querySelector(`#${animationType}-ani`) as HTMLDivElement
  // 若动画类型为出现，则移除透明类名（让元素显示）
  if (fillMode === 'appear') element.classList.remove('lucency');

  // 添加动画类名来触发动画效果
  element.classList.add(animationType);

  // 若动画类型为出现或消失，则显示最后一帧
  if (fillMode === 'appear' || fillMode === 'vanish') return

  // 监听动画结束事件，当动画结束时执行回调函数
  element.addEventListener('animationend', function animationEndCallback() {
    // 将动画类名从元素上移除
    element.classList.remove(animationType);

    // 取消监听事件，以避免事件重复触发
    element.removeEventListener('animationend', animationEndCallback);
  });
}
const visible = ref(true)
</script>

<template>
  <div class="main">
    <p class="header">Vue transition动画（可逆）</p>
    <!-- 可逆的 -->
    <div style="margin-bottom: 100px;" v-for="(item, index) in reversibleTypeList" :key="index">
      <p class="title">{{ item.titel }}</p>
      <div class="collection">
        <div class="item-body-1" v-for="(childItem, childIndex) in item.TypeList" :key="childIndex">
          <div class="ani-item-box">
            <transition name='ani' appear>
              <div v-show="childItem.visible" :id="`${childItem.name}-ani-element`" class="animated"
                :style="`background-image: ${background[childIndex]}`">
              </div>
            </transition>
          </div>
          <span @click="childItem.visible = !childItem.visible" class="name">{{ childItem.name }}</span>
        </div>
      </div>
    </div>
    <hr>
    <!-- 不可逆的 -->
    <p class="header">单向动画</p>
    <div style="margin-bottom: 100px;" v-for="(item, index) in irreversibleTypeList" :key="index">
      <p class="title">{{ item.titel }}</p>
      <div class="collection">
        <div class="item-body-2" v-for="(childItem, childIndex) in item.TypeList" :key="childIndex">
          <div :id="`${childItem}-ani`" class="animated" :class="{ lucency: item.fillMode === 'appear' }"
            :style="`background-image: ${background[childIndex]}`" @click="setAnimation(childItem, item.fillMode)">
          </div>
          <span class="name">{{ childItem }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './css/attention.css';
@import './css/appear.css';
@import './css/vanish.css';
@import './css/reversible.scss';

.main {
  width: 1000px;
  margin: 0 auto;

  .header {
    font-size: 32px;
    font-weight: 700;
    background-image: -webkit-linear-gradient(bottom, #b224ef, #7579ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.title {
  font-size: 20px;
  font-weight: 700;
}

.collection {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 100px;

  .item-body-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    .ani-item-box {
      width: 120px;
      height: 70px;

      .animated {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .name {
      display: block;
      width: 100px;
      line-height: 20px;
      text-align: center;
      background-color: #bfc4e8;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-size: 12px;
    }
  }

  .item-body-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    .animated {
      width: 120px;
      height: 70px;
      border-radius: 8px;

      &.lucency {
        opacity: 0;
      }
    }

    .name {
      font-size: 12px;
    }
  }
}
</style>