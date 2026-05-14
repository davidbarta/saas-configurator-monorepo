<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { useConfiguratorStore, type AddonModule } from '@/stores/configurator';

const store = useConfiguratorStore();

const availableList = computed({
  get: () => store.availableModules,
  set: val => store.updateAvailableModules(val)
});

const selectedList = computed({
  get: () => store.selectedModules,
  set: val => store.updateModuleOrder(val)
});

function getCategoryClass(category: AddonModule['category']) {
  switch (category) {
    case 'resource':
      return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'feature':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'support':
      return 'bg-amber-50 text-amber-700 border-amber-100';
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="flex flex-col bg-slate-50 p-5 rounded-2xl border border-slate-200">
      <h3 class="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">
        {{ $t('addons.available') }}
      </h3>

      <draggable
        v-model="availableList"
        group="modules"
        item-key="id"
        class="flex-1 space-y-3 min-h-50"
        ghost-class="opacity-40"
      >
        <template #item="{ element }: { element: AddonModule }">
          <div
            class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing flex items-center justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              <div class="font-semibold text-slate-900">{{ $t(element.nameKey) }}</div>
              <span
                class="text-xs px-2 py-0.5 rounded-md border font-medium mt-1 inline-block"
                :class="getCategoryClass(element.category)"
              >
                {{ $t(`addons.category.${element.category}`) }}
              </span>
            </div>
            <div class="font-extrabold text-slate-900">
              +{{ element.price }}
              <span class="text-xs font-normal text-slate-500">{{ $t('common.currency') }}</span>
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <div
      class="flex flex-col bg-indigo-50/50 p-5 rounded-2xl border-2 border-dashed border-indigo-200"
    >
      <h3 class="font-bold text-sm text-indigo-900 uppercase tracking-wider mb-4">
        {{ $t('addons.selected') }}
      </h3>

      <draggable
        v-model="selectedList"
        group="modules"
        item-key="id"
        class="flex-1 space-y-3 min-h-50"
        ghost-class="opacity-40"
      >
        <template #item="{ element }: { element: AddonModule }">
          <div
            class="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm cursor-grab active:cursor-grabbing flex items-center justify-between group"
          >
            <div class="flex items-center gap-3">
              <span class="text-slate-300 group-hover:text-slate-500 transition-colors">⋮⋮</span>
              <div>
                <div class="font-semibold text-slate-900">{{ $t(element.nameKey) }}</div>
                <span
                  class="text-xs px-2 py-0.5 rounded-md border font-medium mt-1 inline-block"
                  :class="getCategoryClass(element.category)"
                >
                  {{ $t(`addons.category.${element.category}`) }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="font-extrabold text-indigo-600">
                +{{ element.price }}
                <span class="text-xs font-normal text-indigo-400">{{ $t('common.currency') }}</span>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <div
            v-if="selectedList.length === 0"
            class="h-full flex items-center justify-center text-sm text-slate-400 italic pt-8"
          >
            {{ $t('addons.empty') }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
