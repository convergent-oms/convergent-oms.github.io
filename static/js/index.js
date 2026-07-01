// Generic toggle groups. Each group is a container with class .toggle-group.
// Tabs (.toggle-tab[data-key]) switch panels (.toggle-panel[data-key])
// within the same group, so multiple toggles on the page act independently.
document.addEventListener('DOMContentLoaded', function () {
  const groups = document.querySelectorAll('.toggle-group');

  groups.forEach((group) => {
    const tabs = group.querySelectorAll('.toggle-tab');
    const panels = group.querySelectorAll('.toggle-panel');

    function activate(key) {
      tabs.forEach((t) => t.classList.toggle('is-active', t.dataset.key === key));
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.key === key));
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        activate(tab.dataset.key);
      });
    });
  });
});
