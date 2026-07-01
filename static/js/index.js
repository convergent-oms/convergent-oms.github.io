// Generic toggle groups. Each group is a container with class .toggle-group.
// Tabs (.toggle-tab[data-key]) switch panels (.toggle-panel[data-key])
// within the same group, so multiple toggles on the page act independently.
document.addEventListener('DOMContentLoaded', function () {
  // Fire a named GoatCounter event (no-op if the script hasn't loaded, e.g.
  // when blocked by an ad-blocker or running locally).
  function gcEvent(name) {
    if (name && window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: name, title: name, event: true });
    }
  }

  const groups = document.querySelectorAll('.toggle-group');

  groups.forEach((group) => {
    const tabs = group.querySelectorAll('.toggle-tab');
    const panels = group.querySelectorAll('.toggle-panel');

    function activate(key) {
      tabs.forEach((t) => t.classList.toggle('is-active', t.dataset.key === key));
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.key === key));
    }

    const groupName = group.dataset.gcGroup;

    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        activate(tab.dataset.key);
        // Which toggle option a visitor switched to,
        // e.g. "toggle-manifold-oms", "toggle-rawmanifold-ns2".
        if (groupName) {
          gcEvent('toggle-' + groupName + '-' + tab.dataset.key);
        }
      });
    });
  });

  // Click events: any element with data-gc-event fires a named event
  // (e.g. the Paper / Code buttons) in addition to the pageview count.
  document.querySelectorAll('[data-gc-event]').forEach((el) => {
    el.addEventListener('click', function () {
      gcEvent(el.dataset.gcEvent);
    });
  });

  // Video engagement: fire "play-video" once on first play, and
  // "complete-video" when the visitor watches to the end.
  document.querySelectorAll('video[data-gc-video]').forEach((video) => {
    const tag = video.dataset.gcVideo;
    let played = false;
    video.addEventListener('play', function () {
      if (!played) {
        played = true;
        gcEvent('play-' + tag);
      }
    });
    video.addEventListener('ended', function () {
      gcEvent('complete-' + tag);
    });
  });
});
