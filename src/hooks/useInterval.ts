import React, { useEffect, useRef } from "react";

export function useInterval(callback: React.EffectCallback, delay:number):void {
    const savedCallBack = useRef(callback);

    useEffect(() => {
        savedCallBack.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallBack.current();
        }

        const interval = setInterval(tick, delay);
        return () => clearInterval(interval);
    }, [callback, delay]);
}