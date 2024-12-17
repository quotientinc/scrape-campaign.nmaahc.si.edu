(() => {
  class Tabs {
    activeTab = 0;

    constructor(tabgroup) {
      this.tabgroup = tabgroup;
      this.tab_items = tabgroup.querySelectorAll(".nmaa-tabs__item");
      this.tab_items.forEach((item) => {
        item.addEventListener("toggle", this.toggleTab.bind(this));
        item.addEventListener("click", this.preventClose.bind(this));
      });

      this.tabgroup.addEventListener("keyup", this.handleKeyup.bind(this));

      this.ctl_buttons = tabgroup.querySelectorAll(".nmaa-tabs__nav-ctl");
      console.log(this.ctl_buttons);
      this.ctl_buttons.forEach((btn) => {
        btn.addEventListener("click", this.nav.bind(this));
      });

      this.openTab();
    }

    preventClose(el) {
      const item = el.target.closest(".nmaa-tabs__item");
      if (item.open) {
        el.preventDefault();
      }
    }

    toggleTab({ target }) {
      if (target.open) {
        this.tab_items.forEach((item) => {
          if (target !== item) item.open = false;
        });
      }
    }

    openTab() {
      this.tab_items[this.activeTab].open = true;
    }

    advanceTab(dir) {
      this.activeTab += dir;
      if (this.activeTab < 0) {
        this.activeTab = this.tab_items.length - 1;
      } else if (this.activeTab >= this.tab_items.length) {
        this.activeTab = 0;
      }

      this.openTab();
    }

    nav(el) {
      const dir = +el.target.closest("button").dataset.dir;
      this.advanceTab(dir);
    }

    handleKeyup(el) {
      if (el.key === "ArrowRight") {
        this.advanceTab(1);
      } else if (el.key === "ArrowLeft") {
        this.advanceTab(-1);
      }
    }
  }
  const tabs = document.querySelectorAll(".nmaa-tabs");
  tabs.forEach((tabgroup) => {
    new Tabs(tabgroup);
  });
})();
