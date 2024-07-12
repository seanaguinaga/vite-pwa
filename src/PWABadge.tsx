import type { Component } from "solid-js";
import { Show, createSignal, onCleanup } from "solid-js";
import { useRegisterSW } from "virtual:pwa-register/solid";

const PWABadge: Component = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const [isOffline, setIsOffline] = createSignal(!navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOffline(!navigator.onLine);
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  onCleanup(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <Show when={offlineReady() || needRefresh() || isOffline()}>
      <dialog open>
        <div>
          <Show when={needRefresh()}>
            <span>
              New content available, click on reload button to update.
            </span>
          </Show>
          <Show when={offlineReady()}>
            <span>App ready to work offline</span>
          </Show>
          <Show when={isOffline()}>
            <span>You are currently offline</span>
          </Show>
        </div>
        <div>
          <Show when={needRefresh()}>
            <button onClick={() => updateServiceWorker(true)}>Reload</button>
          </Show>
          <Show when={!isOffline()}>
            <button onClick={() => close()}>Close</button>
          </Show>
        </div>
      </dialog>
    </Show>
  );
};

export default PWABadge;
