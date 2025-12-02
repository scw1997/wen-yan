// 防抖
export const debounce = (fun: (...args: any[]) => void, delay: number) => {
    let timer: number | null;

    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = window.setTimeout(() => {
            fun.call(Object.create(null), ...args);
            timer = null;
        }, delay);
    };
};
