import { useEffect } from "react";

const usePreventPageUnload = (shouldPrevent: boolean) => {
  useEffect(() => {
    if (!shouldPrevent) return;
    const handleUnload = (event: BeforeUnloadEvent) => {
      event?.preventDefault();
      event.returnValue = "Changes you made may not be saved.";
      return "";
    };

    window.addEventListener("beforeunload", handleUnload, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", handleUnload, {
        capture: true,
      });
    };
  }, [shouldPrevent]);
};

export default usePreventPageUnload;
