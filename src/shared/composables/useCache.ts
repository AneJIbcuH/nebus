export const useCache = <T extends object>(initialState: T) => {
  const cache = ref<T[]>([JSON.parse(JSON.stringify(initialState))]);
  const currentIndex = ref(0);

  function save(newState: T) {
    const serializedNew = JSON.stringify(newState);
    const serializedCurrent = JSON.stringify(cache.value[currentIndex.value]);

    if (serializedNew === serializedCurrent) return;

    cache.value = cache.value.slice(0, currentIndex.value + 1);
    cache.value.push(JSON.parse(serializedNew));
    currentIndex.value++;
  }

  function undo(target: T) {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      const prevState = JSON.parse(
        JSON.stringify(cache.value[currentIndex.value]),
      );
      Object.assign(target, prevState);
    }
  }

  function redo(target: T) {
    if (currentIndex.value < cache.value.length - 1) {
      currentIndex.value++;
      const nextState = JSON.parse(
        JSON.stringify(cache.value[currentIndex.value]),
      );
      Object.assign(target, nextState);
    }
  }

  function reset(newInitialState: T) {
    cache.value = [JSON.parse(JSON.stringify(newInitialState))];
    currentIndex.value = 0;
  }

  return {
    cache: readonly(cache),
    currentIndex: readonly(currentIndex),
    save,
    undo,
    redo,
    reset,
    canUndo: computed(() => currentIndex.value > 0),
    canRedo: computed(() => currentIndex.value < cache.value.length - 1),
  };
};
