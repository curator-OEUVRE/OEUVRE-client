function throttle<T extends any[]>(callback: (...params: T) => void, ms = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...params: T) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...params);
        timer = null;
      }, ms);
    }
  };
}

export default throttle;
